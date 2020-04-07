<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-card-title class="headline lighten-2" primary-title>
          Max Field
        </v-card-title>
        <v-card-subtitle>
          Niantic CN Version Frontend v0.65
        </v-card-subtitle>

        本前端程序由 NIACNET 高性能实验室维护，使用 GPLv3 方式授权。
      </v-card-text>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>用户使用条款</v-expansion-panel-header>
            <v-expansion-panel-content>
              1. 想好再提交，乱提交 ban IP<br />
              2. 对实际操作中出现的状况不负责<br />
              3. 本站开源，欢迎 PR
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>隐私权政策</v-expansion-panel-header>
            <v-expansion-panel-content>
              1. 维护者懒得去看您提交了啥<br />
              2. 任务 ID 存在浏览器本地<br />
              3. 运行结果一天之后自动删库
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>鸣谢</v-expansion-panel-header>
            <v-expansion-panel-content>
              1. <b>Niantic. Inc.</b>，因为本站给他们家的产品服务的<br />
              2. <b>Maxfield 原维护者</b>，因为本站直接调了他们的库来用<br />
              3. <b>NIACNET</b>，因为它给本站白嫖了计算资源
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click.stop="
                open_link('https://gitlab.com/UESTC-Ingress/maxfield-frontend')
              "
            >
              <v-icon>mdi-xml</v-icon>
            </v-btn>
          </template>
          <span>前端代码</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click.stop="
                open_link('https://gitlab.com/UESTC-Ingress/maxfield-api')
              "
            >
              <v-icon>mdi-code-braces</v-icon>
            </v-btn>
          </template>
          <span>API 代码</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click.stop="
                open_link('https://gitlab.com/UESTC-Ingress/maxfield-worker')
              "
            >
              <v-icon>mdi-code-brackets</v-icon>
            </v-btn>
          </template>
          <span>worker 代码</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click.stop="
                open_link(
                  'https://hub.docker.com/repository/docker/yukarichiba/maxfield-worker'
                )
              "
            >
              <v-icon>mdi-docker</v-icon>
            </v-btn>
          </template>
          <span>Docker worker 代码</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          关闭
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
        return this.$store.state.aboutShow;
      },
      set(val) {
        return this.$store.commit("updateAbout", val);
      }
    }
  },
  methods: {
    open_link: function(url) {
      window.location = url;
    }
  }
};
</script>
