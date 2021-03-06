import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Submit from "../views/Submit.vue";
import List from "../views/List.vue";
import Info from "../views/Info.vue";
import Stats from "../views/Stats.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/submit",
    name: "Submit",
    component: Submit
  },
  {
    path: "/list",
    name: "List",
    component: List
  },
  {
    path: "/info/:taskid",
    name: "Info",
    component: Info
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
