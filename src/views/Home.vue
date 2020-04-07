<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-title>Max Field by NIA-CN</v-card-title>
          <v-card-subtitle>Insider Preview</v-card-subtitle>
          <v-card-text>
            <h3>什么是 MaxField</h3>
            <p>
              Ingress MaxField 是一个 Ingress 链接和部署策略生成器。 给定 Portal
              列表，MaxField 将确定链接 Portal 以创建最多 Field 的同时获得最多
              AP 的最佳顺序。 该网站的后端是由 J.Peter Baker 编写的 Python
              程序，tvwenger完全重写了该程序，NIA-CN
              高性能实验室采用了后者的程序。
            </p>
            <p>
              Ingress Maxfield 不违反 Ingress / Niantic
              服务条款。该应用程序仅使用从用户从 Intel 网站复制的 Portal URL
              中提取的 Portal 位置来生成链接和部署计划。
            </p>
            <p>
              注意: 每次提交相同的 Portal 列表时，您可能都会获得不同的计划。
            </p>
            <p>
              本站全部代码均使用GPLv3协议授权。
            </p>
          </v-card-text>
        </v-card> </v-col
      ><v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-actions>
            <v-row class="ml-4 mr-4">
              <v-col>
                <v-btn large outlined to="/submit"
                  ><v-icon>mdi-file-document-edit-outline</v-icon
                  >提交请求</v-btn
                >
              </v-col>
              <v-col>
                <v-btn large outlined to="/list"
                  ><v-icon>mdi-clipboard-list-outline</v-icon>查看列表</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  large
                  outlined
                  @click="$store.commit('updateAbout', true)"
                  ><v-icon>mdi-information</v-icon>关于本站</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <QueueInfo />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import QueueInfo from "@/components/Home/QueueInfo.vue";

export default {
  components: {
    QueueInfo
  }
};
</script>
