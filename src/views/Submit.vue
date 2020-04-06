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
            :rules="[(v) => !!v || '您必须输入内容！']"
          ></v-textarea>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                v-model="formData.agents"
                type="number"
                label="参与的Agent数量"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-radio-group
                v-model="formData.faction"
                :rules="[(v) => !!v || '您必须选择一项！']"
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
            :rules="[(v) => !!v || '您必须同意此项！']"
            label="是否接受MaxField NIA-CN隐私政策和用户使用条款?"
            required
          ></v-checkbox>
          <v-checkbox
            v-model="formData['g-recaptcha-response']"
            :rules="[(v) => !!v || '验证未通过！']"
            label="人机交互验证"
            required
            style="pointer-events: none;"
          ></v-checkbox>
          <v-btn
            v-if="!formData['g-recaptcha-response']"
            @click.stop="recaptcha"
            >请求人机交互验证</v-btn
          >
        </v-form>
      </v-card-text>
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
    </v-card>
    <SubmitSucPrompt :task="task" />
  </v-container>
</template>
<script>
import SubmitSucPrompt from "@/components/modal/SubmitSucPrompt";
import idb from "@/utils/idb";

export default {
  components: { SubmitSucPrompt },
  data: () => ({
    formData: {
      agents: 1,
      "g-recaptcha-response": null,
    },
    loading: false,
    task: {
      taskid: null,
      submitinqueue: 0,
    },
  }),
  mounted() {
    this.recaptcha();
  },
  methods: {
    async recaptcha() {
      await this.$recaptchaLoaded();
      this.formData["g-recaptcha-response"] = await this.$recaptcha("login");
    },
    initializeForm() {
      this.formData = { agents: 1, "g-recaptcha-response": null };
    },
    submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;
      this.axios
        .post(
          "https://maxfield-api-dev-stevecharlesyang.cloud.okteto.net/submit",
          this.formData
        )
        .then((res) => {
          this.loading = false;
          if (res.data.error == true) {
            if (res.data.desc == "CAPTCHA") {
              this.formData["g-recaptcha-response"] = null;
            }
            if (res.data.desc == "FIELD") console.log(res.data);
          } else {
            this.task.taskid = res.data.submitid;
            this.task.submitinqueue = res.data.inqueue;
            this.initializeForm();
            this.$refs.form.resetValidation();
            this.$store.commit("updateSubmitSucPrompt", true);
            idb.insert_task(res.data.submitid);
          }
        });
    },
  },
};
</script>
