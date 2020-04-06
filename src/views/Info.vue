<template>
  <v-container>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>任务 ID {{ $route.params.taskid }}</v-toolbar-title>
        <v-subheader v-if="taskinfo">Agents: {{ taskinfo.agents }}</v-subheader>
      </v-toolbar>
      <v-tabs :vertical="vert" background-color="primary">
        <v-tab>
          <v-icon left>mdi-key</v-icon>
          Key
        </v-tab>
        <v-tab>
          <v-icon left>mdi-clipboard-text</v-icon>
          分配
        </v-tab>
        <v-tab>
          <v-icon left>mdi-map</v-icon>
          地图
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <Key :taskinfo="this.taskinfo" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat> </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <Map :taskinfo="this.taskinfo" />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<script>
import Key from "@/components/Info/Key.vue";
import Map from "@/components/Info/Map.vue";
import nodelist from "@/assets/nodelist.json";

export default {
  components: {
    Key,
    Map,
  },
  data: () => ({
    taskinfo: null,
  }),
  computed: {
    vert: function() {
      return window.innerWidth > 600;
    },
  },
  methods: {
    getInfo: function() {
      this.axios
        .get(
          nodelist[this.$route.params.workerid].endpoint +
            "/" +
            this.$route.params.taskid +
            "/info.json"
        )
        .then((res) => {
          this.taskinfo = res.data;
          this.taskinfo.endpoint =
            nodelist[this.$route.params.workerid].endpoint +
            "/" +
            this.$route.params.taskid;
        });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>
