<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">输入您的ID</v-card-title>

      <v-card-text>
        为了区别不同的任务，您需要一个ID，它可以是您的Agent
        ID，也可以是其他的任意字符
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  computed: {
    dialog: {
      get() {
        return this.$store.state.newUserPrompt;
      },
      set(val) {
        return this.$store.commit("updateNewUserPrompt", val);
      }
    }
  }
};
</script>
