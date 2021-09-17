import { createRouter, createWebHashHistory } from "vue-router";
import daybookRoutes from "@/modules/daybook/router";
import authRouter from "../modules/auth/router";
import isAuthenticatedGuard from "../modules/auth/router/auth-guard";

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
  { path: "/daybook", beforeEnter: [isAuthenticatedGuard], ...daybookRoutes },
  { path: "/auth", ...authRouter },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
