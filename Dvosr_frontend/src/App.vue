<template>
  <v-app class="home">
    <Home v-if="Logged" />
    <Login v-else />
  </v-app>
</template>

<script>
import Home from "./components/Home.vue";
import Login from "./components/utilisateurs/Login.vue";
import { mapGetters } from "vuex";
export default {
  components: { Home, Login },
  name: "App",
  computed: {
    ...mapGetters(["getAuthenticatedUser"]),
    Logged() {
      return this.getAuthenticatedUser != null;
    },
  },
};
</script>
