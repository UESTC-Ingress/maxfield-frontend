<template>
  <v-container>
    <v-card>
      <v-card-title>提交MaxField请求</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form">
          <v-subheader>MaxField信息</v-subheader>
          <v-textarea
            outlined
            v-model="formData.portals"
            name="input-7-4"
            label="Portal列表"
            :rules="[v => !!v || '您必须输入内容！']"
          ></v-textarea>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                v-model="formData.agents"
                type="number"
                value="1"
                label="参与的Agent数量"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-radio-group
                v-model="formData.faction"
                :rules="[v => !!v || '您必须选择一项！']"
                row
              >
                <v-radio label="启蒙军/ENL" color="green" value="enl"></v-radio>
                <v-radio label="反抗军/RES" color="blue" value="res"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="4">
              <v-checkbox
                v-model="formData.googlemap"
                label="是否使用Google Maps?"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-subheader>通知信息</v-subheader>
          <v-text-field
            v-model="formData.email"
            outlined
            label="邮箱（可选）"
          ></v-text-field>
          <v-subheader>条款相关</v-subheader>
          <v-checkbox
            :rules="[v => !!v || '您必须同意此项！']"
            label="是否接受MaxField NIA-CN隐私政策和用户使用条款?"
            required
          ></v-checkbox>
          <v-divider />
          <v-card-actions>
            <v-btn
              large
              @click.stop="submitForm"
              :disabled="loading"
              color="primary"
            >
              <v-icon>mdi-application</v-icon>
              提交计算
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <SubmitSucPrompt :task="task" />
  </v-container>
</template>
<script>
import SubmitSucPrompt from "@/components/modal/SubmitSucPrompt";

export default {
  components: { SubmitSucPrompt },
  data: () => ({
    formData: {
      agents: 1
    },
    loading: false,
    task: {
      taskid: null,
      submitinqueue: 0
    }
  }),
  methods: {
    initializeForm() {
      this.formData = {};
    },
    submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;
      this.axios
        .post("http://maxfield-api-dev.nia.ac.cn:8081/submit", this.formData)
        .then(res => {
          this.loading = false;
          if (res.data.error == true) {
            console.log(res.data);
          } else {
            this.task.taskid = res.data.submitid;
            this.task.submitinqueue = res.data.inqueue;
            this.initializeForm();
            this.$refs.form.resetValidation();
            this.$store.commit("updateSubmitSucPrompt", true);
          }
        });
    }
  }
};
</script>
