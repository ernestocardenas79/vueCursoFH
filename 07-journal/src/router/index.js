import { createRouter, createWebHashHistory } from "vue-router";
import daybookRoutes from "@/modules/daybook/router";
const routes = [
  {
    name: "home",
    path: "/",
    component: () => import(/*webpackChunkName Home*/ "@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/*webpackChunkName About*/ import("../views/About")),
  },
  { ...daybookRoutes },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
