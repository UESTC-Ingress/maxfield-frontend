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
          Niantic CN Version Frontend v0.3
        </v-card-subtitle>

        本前端程序由 NIACNET 高性能实验室维护，使用 GPLv3 方式授权。
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
          <span>API代码</span>
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
          <span>worker代码</span>
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
  data() {
    return {
      dialog: false
    };
  }
};
</script>
