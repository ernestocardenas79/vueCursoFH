import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/counter",
    name: "counter",
    component: () =>
      import(/* webpackChunkName: "counter" */ "../views/Counter.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
  },
  {
    path: "/pokemon-search",
    name: "pokemon-search",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/SearchPokemon.vue"),
  },
  {
    path: "/pokemon/:id",
    name: "pokemon-id",
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/Pokemon.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
