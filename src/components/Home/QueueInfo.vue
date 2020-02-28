<template>
  <v-card>
    <v-card-title>队列信息</v-card-title>
    <v-card-subtitle>队列中任务</v-card-subtitle>
    <v-card-title>{{ queued }}</v-card-title>
    <v-divider />
    <v-card-actions>
      <v-btn @click.stop="refreshData" text>刷新</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    queued: 0
  }),
  methods: {
    refreshData() {
      this.axios
        .get("http://maxfield-api-dev.nia.ac.cn:8081/queue")
        .then(res => {
          if (res.data.error == true) {
            console.log(res.data);
          } else {
            this.queued = res.data.inqueue;
          }
        });
    }
  },
  mounted() {
    this.refreshData();
  }
};
</script>
