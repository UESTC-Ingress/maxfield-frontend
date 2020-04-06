<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline lighten-2" primary-title>
        提交成功
      </v-card-title>
      <v-card-subtitle>
        您的提交已经被放置在队列中。
      </v-card-subtitle>

      <v-card-text>
        您的任务编号为: <code>{{ task.taskid }}</code
        ><br />
        它将保存在您的浏览器缓存中，您可以随时<router-link to="/list"
          >查看进度</router-link
        >。
        <br />
        队列前方有<b>{{ task.submitinqueue }}</b
        >个任务。
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" text @click="dialog = false">
          关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["task"],
  computed: {
    dialog: {
      get() {
        return this.$store.state.submitSucPrompt;
      },
      set(val) {
        return this.$store.commit("updateSubmitSucPrompt", val);
      },
    },
  },
};
</script>
