<template>
  <v-card class="mb-6" :loading="loading">
    <v-card-title>队列信息</v-card-title>
    <v-row class="ml-4 mr-4">
      <v-col>
        <v-card-subtitle>队列中任务</v-card-subtitle>
        <v-card-text v-if="loading">
          <v-progress-circular color="primary" indeterminate />
        </v-card-text>
        <v-card-title v-else>{{ queued }}</v-card-title>
      </v-col>
      <v-col>
        <v-card-subtitle>计算节点</v-card-subtitle>
        <v-card-text v-if="loading">
          <v-progress-circular color="primary" indeterminate />
        </v-card-text>
        <v-card-title v-else>{{ workers }}</v-card-title>
      </v-col>
    </v-row>
    <v-divider />
    <v-card-actions>
      <v-btn @click.stop="refreshData" text>刷新</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    queued: 0,
    workers: 0,
    loading: false,
  }),
  methods: {
    refreshData() {
      this.loading = true;
      this.axios
        .get("https://maxfield-api-dev-stevecharlesyang.cloud.okteto.net/queue")
        .then((res) => {
          if (res.data.error == true) {
            console.log(res.data);
          } else {
            this.queued = res.data.inqueue;
            this.workers = res.data.worker;
          }
          this.loading = false;
        });
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>
