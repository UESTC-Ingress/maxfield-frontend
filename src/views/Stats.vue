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
            <tr v-for="node in nodearray" :key="node.endpoint">
              <td>{{ node.name }}</td>
              <td>
                {{ /.cloud.okteto.net/.test(node.endpoint) ? "2" : "未知" }}
              </td>
              <td>
                <v-chip
                  dark
                  :class="
                    results[node.name] != undefined
                      ? results[node.name]
                        ? 'success'
                        : 'red'
                      : 'grey'
                  "
                  >{{
                    results[node.name] != undefined
                      ? results[node.name]
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
      <v-tab-item>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>处理总数</v-card-title>
                <v-card-text>
                  <h1>{{ submitted }}</h1>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>完成总数</v-card-title>
                <v-card-text>
                  <h1>{{ success }}</h1>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import Vue from "vue";

export default {
  data: () => ({
    nodearray: [],
    results: {},
    submitted: 0,
    success: 0
  }),
  methods: {
    refreshData: function() {
      this.axios.get(process.env.VUE_APP_API + "/stats").then(res => {
        this.nodearray = res.data.nodes;
        this.nodearray.forEach(n => {
          this.axios
            .get("https://" + n.endpoint)
            .then(res => {
              if (res.status === 200) Vue.set(this.results, n.name, true);
              else Vue.set(this.results, n.name, false);
            })
            .catch(() => {
              Vue.set(this.results, n.name, false);
            });
        });
        this.submitted = res.data.submits;
        this.success = res.data.success;
      });
    }
  },
  mounted() {
    this.refreshData();
  }
};
</script>
