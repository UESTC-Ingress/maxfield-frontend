<template>
  <v-navigation-drawer v-model="drawerState" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          MaxField 计算系统
        </v-list-item-title>
        <v-list-item-subtitle>
          Powered by NIACNET
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>主页</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/submit">
        <v-list-item-icon>
          <v-icon>mdi-application</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>提交计算</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/list">
        <v-list-item-icon>
          <v-icon>mdi-clipboard-list-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>查询</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/stats">
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>统计 (未完工)</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-footer>
        <span class="font-weight-light">NIACNET 高性能计算中心</span>
        <v-spacer />
        <AboutView />
      </v-footer>
    </template>
  </v-navigation-drawer>
</template>
<script>
import AboutView from "@/components/modal/AboutView";

export default {
  components: { AboutView },
  computed: {
    drawerState: {
      get() {
        return this.$store.state.drawerShow;
      },
      set(val) {
        return this.$store.commit("updateDrawer", val);
      }
    }
  }
};
</script>
