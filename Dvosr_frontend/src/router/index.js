import Vue from "vue";
import VueRouter from "vue-router";
import Showvoyages from "../components/Voyages/show/showvoyages";
import Addvoyage from "../components/Voyages/add/addVoyage";
import Utilisateurs from "../components/utilisateurs/Utilisateurs";
import PasswordChange from "../components/utilisateurs/PasswordChange";
Vue.use(VueRouter);

const routes = [
  {
    path: "/voyages",
    name: "showvoyages",
    component: Showvoyages,
  },
  {
    path: "/add/voyage",
    name: "addvoyage",
    component: Addvoyage,
  },
  {
    path: "/users",
    name: "Users",
    component: Utilisateurs,
  },
  {
    path: "/changePassword",
    name: "Security",
    component: PasswordChange,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
