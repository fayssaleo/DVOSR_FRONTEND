import Vue from "vue";
import Vuex from "vuex";
import voyageModule from "./voyageModule";
import utilisateurModule from "./utilisateurModule";
import craneModule from "./craneModule";
import vesselModule from "./vesselModule";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "cache", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
  reducer: (state) => ({
    utilisateurModule: state.utilisateurModule,
    // getRidOfThisModule: state.getRidOfThisModule (No one likes it.)
  }),
});
let store = null;
export default function () {
  store = new Vuex.Store({
    modules: {
      voyageModule,
      utilisateurModule,
      craneModule,
      vesselModule,
    },
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    plugins: [vuexLocalStorage.plugin],
  });
  return store;
}
export { store };
