<template>
  <v-container>
    <v-card>
      <v-card-title>提交 MaxField 请求</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form">
          <v-subheader
            >MaxField 信息 &nbsp;&nbsp;
            <v-dialog v-model="helper_portals" max-width="560">
              <template v-slot:activator="{ on }">
                <v-icon small v-on="on">mdi-help-circle</v-icon>
              </template>
              <v-card>
                <v-card-title class="headline"
                  >如何填写 Portal 列表？</v-card-title
                >
                <v-card-text>
                  <p>
                    1. 在 Intel 中找到 Portal<br />
                    2. 点击 Portal，一个信息界面将会出现<br />
                    3. 点击 Intel 右上角的 Link 按钮<br />
                    4. 复制它的链接，将其粘贴到列表内<br />
                  </p>
                  <p>
                    格式为: <code>Portal 名; Intel 链接</code> <br />
                    亦支持:
                    <code
                      >Portal 名; Intel 链接; Key数量; SBUL(指使用SBUL)</code
                    >
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="helper_portals = false"
                    >关闭</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-subheader>

          <v-textarea
            ref="currentportal"
            outlined
            auto-grow
            hint="输入最后一行后，请换行"
            v-model="currentportal"
            append-icon="mdi-send"
            @click:append.stop="insertportal"
            @focus="
              {
                expan_open = 0;
              }
            "
            name="input-7-4"
            label="Portal 列表"
            :rules="[v => checkvalid(v) || !v || '输入内容不合法']"
          ></v-textarea>
          <v-expansion-panels class="mb-4" accordion v-model="expan_open">
            <v-expansion-panel>
              <v-expansion-panel-header
                >已选择的 Portal ({{
                  portallist.length
                }}个)</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-data-table
                  :headers="portallist_header"
                  :items-per-page="15"
                  :items="portallist"
                >
                  <template v-slot:item.keys="{ item }">
                    {{ "keys" in item ? item.keys : "无" }}
                  </template>
                  <template v-slot:item.sbul="{ item }">
                    {{ item.sbul ? "有" : "无" }}
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      icon
                      @click="
                        {
                          portallist.pop(item);
                        }
                      "
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </template>
                </v-data-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
                label="是否使用 Google Maps? "
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-subheader>通知信息</v-subheader>
          <v-text-field
            v-model="formData.email"
            outlined
            disabled
            label="邮箱（可选）(暂不可用)"
          ></v-text-field>
          <v-subheader>条款相关</v-subheader>
          <v-checkbox
            :rules="[v => !!v || '您必须同意此项！']"
            label="是否接受 MaxField NIA-CN 隐私政策和用户使用条款?"
            required
          ></v-checkbox>
          <v-checkbox
            v-model="formData['g-recaptcha-response']"
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
          :disabled="loading || portallist.length < 3"
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
    expan_open: 0,
    portallist_header: [
      {
        text: "Portal 名称",
        value: "portal"
      },
      {
        text: "Key 数量",
        value: "keys"
      },
      {
        text: "SBUL",
        value: "sbul"
      },
      {
        text: "操作",
        sortable: false,
        value: "actions"
      }
    ],
    formData: {
      agents: 1,
      "g-recaptcha-response": null
    },
    loading: false,
    portallist: [],
    currentportal: "",
    helper_portals: false,
    task: {
      taskid: null,
      submitinqueue: 0
    }
  }),
  mounted() {
    this.recaptcha();
  },
  methods: {
    checkvalid(portaldata) {
      return /^([^;]*; https:\/\/intel.ingress.com\/intel\?ll=-?[0-9]*\.[0-9]*,-?[0-9]*\.[0-9]*&z=[0-9]*&pll=-?[0-9]*\.[0-9]*,-?[0-9]*\.[0-9]*(;[0-9]{1,})?(;SBUL)?\n){1,101}$/g.test(
        portaldata
      );
    },
    insertportal() {
      if (this.checkvalid(this.currentportal)) {
        var splitted = this.currentportal.split("\n");
        splitted.forEach(line => {
          if (line != "") {
            var tmpdata = line.split(";");
            var portalobj = {
              portal: tmpdata[0],
              url: tmpdata[1]
            };
            for (let index = 2; index < tmpdata.length; index++) {
              if (tmpdata[index] == "SBUL") portalobj.sbul = true;
              else portalobj.keys = tmpdata[index];
            }
            this.portallist.push(portalobj);
            this.currentportal = "";
          }
        });
      }
    },
    async recaptcha() {
      await this.$recaptchaLoaded();
      this.formData["g-recaptcha-response"] = await this.$recaptcha("login");
    },
    initializeForm() {
      this.portallist = [];
      (this.currentportal = ""),
        (this.formData = { agents: 1, "g-recaptcha-response": null });
    },
    submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }
      var portals_string = "";
      this.portallist.forEach(portal => {
        portals_string += portal.portal + ";" + portal.url;
        if ("keys" in portal) portals_string += ";" + portal.keys;
        else if ("sbul" in portal) portal_string += ";0";
        if ("sbul" in portal) portals_string += ";SBUL";
        portals_string += "\n";
      });
      this.formData.portals = portals_string;
      this.formData.portals = this.formData.portals.replace(/,(?=.*;)/g, ".");
      this.loading = true;
      this.axios
        .post(process.env.VUE_APP_API + "/submit", this.formData)
        .then(res => {
          this.loading = false;
          if (res.data.error == true) {
            if (res.data.desc == "CAPTCHA") {
              this.formData["g-recaptcha-response"] = null;
            }
            //if (res.data.desc == "FIELD") console.log(res.data);
          } else {
            this.task.taskid = res.data.submitid;
            this.task.submitinqueue = res.data.inqueue;
            this.initializeForm();
            this.$refs.form.resetValidation();
            this.$store.commit("updateSubmitSucPrompt", true);
            idb.insert_task(res.data.submitid);
          }
        });
    }
  }
};
</script>
