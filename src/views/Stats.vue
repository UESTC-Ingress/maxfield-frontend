<template>
  <v-container>
    <v-tabs grow :show-arrows="false" centered>
      <v-tab>
        <v-icon>mdi-graph</v-icon>
        计算节点
      </v-tab>
      <v-tab>
        <v-icon>mdi-post-outline</v-icon>
        统计信息
      </v-tab>
      <v-tab-item>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">节点名称</th>
              <th class="text-left">核心数量</th>
              <th class="text-left">节点状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="node in nodearray" :key="node[0]">
              <td>{{ node[1].name }}</td>
              <td>{{ node[1].cores }}</td>
              <td>
                <v-chip
                  :class="
                    node[1].status != undefined
                      ? node[1].status
                        ? 'success'
                        : 'red'
                      : 'grey'
                  "
                  >{{
                    node[1].status != undefined
                      ? node[1].status
                        ? "正常"
                        : "丢失"
                      : "测试中"
                  }}</v-chip
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item> </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import nodelist from "@/assets/nodelist.json";

export default {
  data: () => ({
    nodelist: nodelist,
    nodearray: []
  }),
  methods: {
    refreshData: function() {
      Object.entries(this.nodelist).forEach(nodeitem => {
        this.axios
          .get(nodeitem[1].endpoint)
          .then(res => {
            if (res.status === 200) this.nodelist[nodeitem[0]].status = true;
            else this.nodelist[nodeitem[0]].status = false;
          })
          .catch(() => {
            this.nodelist[nodeitem[0]].status = false;
          })
          .finally(() => {
            this.nodearray = Object.entries(this.nodelist);
          });
      });
    }
  },
  mounted() {
    this.refreshData();
  }
};
</script>
