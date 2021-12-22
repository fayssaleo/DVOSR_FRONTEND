<template>
  <v-app>
    <v-container fluid>
      <v-row class="mb-2"><Header v-model="drawer" /></v-row>
      <router-view />
    </v-container>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list nav dense class="mx-0 px-0">
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-row>
            <v-col>
              <div class="logo"></div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <router-link to="/users" class="sideBarLink">
            <v-list-item class="mx-0 px-0 listItem" color="blue">
              <v-list-item-title class="mx-2 px-0 title"
                >Users</v-list-item-title
              >
            </v-list-item>
          </router-link>
          <router-link to="/voyages" class="sideBarLink">
            <v-list-item class="mx-0 px-0 listItem" color="blue">
              <v-list-item-title class="mx-2 px-0 title"
                >Voyage</v-list-item-title
              >
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<style scoped></style>

<script>
// import CrudButtons from "./crudbuttons.vue"
import Header from "../layout/Header.vue";

export default {
  components: { Header },
  name: "Home",
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: 117px;
  background-color: black;
  background-image: url("../assets/logo-white.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.sideBarLink {
  text-decoration: none;
  color: inherit;
  cursor: auto;
  div {
    height: 30px;
  }
  .listItem {
    height: 30px;
  }
  .listItem:hover {
    background-color: rgba(0, 0, 0, 0.185);
  }
  .title {
    padding-top: 4px;
  }
}
.router-link-exact-active {
  .listItem {
    color: #2962ff !important;
    background-color: #2962ff !important;
  }
  .title {
    color: white !important;
  }
}
</style>
