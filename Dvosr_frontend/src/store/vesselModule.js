import CustomizedAxios from "../plugins/axios.js";

const vesselModule = {
  state: {
    vessels: [],
    actualVoyages: [],
  },
  mutations: {
    SET_VESSEL(state, vessels) {
      state.vessels = vessels;
    },
    SET_ACTUAL_VOYAGE(state, actualVoyages) {
      state.actualVoyages = actualVoyages;
    },
    ADD_VESSEL(state, vessel) {
      state.vessels.push(vessel);
    },
    EDIT_VESSEL(state, vessel) {
      state.vessels = state.vessels.map((s) => {
        if (s.id == vessel.id) return vessel;
        return s;
      });
    },
    DELETE_VESSEL(state, vessel) {
      state.vessels = state.vessels.filter((c) => c.id != vessel.id);
    },
  },
  actions: {
    setVesselsAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/vessels")
          .then((response) => {
            commit("SET_VESSEL", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addVesselAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/vessels/create", payload)
          .then((response) => {
            commit("ADD_VESSEL", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editVesselsAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/vessels/update", payload)
          .then((response) => {
            commit("EDIT_VESSEL", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteVesselAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/vessels/delete", payload)
          .then((response) => {
            commit("DELETE_VESSEL", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setActualVoyagesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/voyages/allVoyages")
          .then((response) => {
            commit("SET_ACTUAL_VOYAGE", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getVessels: (state) => {
      return state.vessels;
    },
    getActualVoyages: (state) => {
      return state.actualVoyages;
    },
  },
};
export default vesselModule;
