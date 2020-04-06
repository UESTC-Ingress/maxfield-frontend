<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">输入您的ID</v-card-title>

      <v-card-text>
        为了区别不同的任务，您需要一个ID，它可以是您的Agent
        ID，也可以是其他的任意字符
        <v-text-field v-model="input_id" label="ID"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="randID">
          随机ID
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="primary" text @click="saveAndClose">
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    input_id: ""
  }),
  methods: {
    randID() {
      this.input_id = Math.random()
        .toString(36)
        .substring(7);
    },
    saveAndClose() {
      localStorage.userID = this.input_id;
      this.$store.commit("updateUserID", this.input_id);
      this.dialog = false;
    }
  },
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
