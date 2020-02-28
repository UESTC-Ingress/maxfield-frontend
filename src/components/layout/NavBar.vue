<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title>MaxField NIA-CN</v-toolbar-title>
    <v-spacer />
    <v-btn @click="toggleDark" icon>
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.dark = this.$vuetify.theme.dark;
    }
  }
};
</script>
