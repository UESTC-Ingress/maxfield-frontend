<template>
  <v-app>
    <NavDrawer />
    <NavBar />
    <v-content>
      <router-view />
      <NewUserPrompt />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import NavDrawer from "@/components/layout/NavDrawer";

import NewUserPrompt from "@/components/modal/NewUserPrompt";

export default {
  name: "App",

  components: { NavDrawer, NavBar, NewUserPrompt },

  data: () => ({
    //
  }),
  mounted() {
    if (localStorage.userID) {
      this.$store.commit("updateUserID", localStorage.userID);
    } else {
      this.$store.commit("updateNewUserPrompt", true);
    }
    if (localStorage.colortheme) {
      this.$vuetify.theme.themes.light.primary = localStorage.colortheme;
      this.$vuetify.theme.themes.dark.primary = localStorage.colortheme;
    }
    if (typeof localStorage.dark != "undefined") {
      this.$vuetify.theme.dark = localStorage.dark;
    }
  }
};
</script>
