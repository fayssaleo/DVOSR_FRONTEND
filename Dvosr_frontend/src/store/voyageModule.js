import CustomizedAxios from "../plugins/axios.js";
const voyageModule = {
  state: {
    voyages: [
      {
        vawgd: 1,
        vawsnrog: 1,
        dm_y: 1,
        dm_g: 1,
        hatch_covers_num: 2,
        hatch_covers_moves: 3,
        gear_boxes_num: 5,
        gear_boxes_moves: 6,
        first_line_datetime: "2021-10-27 12:03:26",
        vessel_all_fast: "2021-10-27 12:03:26",
        gangway_secured: "2021-10-27 12:03:26",
        lashers_onboard: "2021-10-27 12:03:26",
        num_mooring_r_fore: 6,
        num_mooring_r_aft: 5,
        dwuscfb: 1,
        imo_class: 1,
        imo_class_ps_onb: "okeeey",
        last_lift_from: "2021-10-27 12:03:26",
        last_lift_to: "2021-10-27 12:03:26",
        lf_from: "2021-10-27 12:03:26",
        lf_to: "2021-10-27 12:03:26",
        agent_onboard_from: "2021-10-27 12:03:26",
        agent_onboard_to: "2021-10-27 12:03:26",
        safety_net_gangway_from: "2021-10-27 12:03:26",
        safety_net_gangway_to: "2021-10-27 12:03:26",
        pilot_onboard_from: "2021-10-27 12:03:26",
        pilot_onboard_to: "2021-10-27 12:03:26",
        tugs_arrived_from: "2021-10-27 12:03:26",
        tugs_arrived_to: "2021-10-27 12:03:26",
        unmooring_forward_from: "2021-10-27 12:03:26",
        unmooring_forward_to: "2021-10-27 12:03:26",
        unmooring_aft_from: "2021-10-27 12:03:26",
        unmooring_aft_to: "2021-10-27 12:03:26",
        last_line_from: "2021-10-27 12:03:26",
        last_line_to: "2021-10-27 12:03:26",
        vessel_id: 1,
        updated_at: "2021-11-13T17:44:25.000000Z",
        created_at: "2021-11-13T17:44:25.000000Z",
        id: 1,
        crane_voyages: [
          {
            id: 1,
            cbd: "2021-10-27 12:03:26",
            dgbohc_bfl_from: "2021-10-27 12:03:26",
            dgbohc_bfl_to: "2021-10-27 12:03:26",
            dgbohc_bfl_num_gb: 5,
            dgbohc_bfl_num_hc: 5,
            dss_bfl_from: "2021-10-27 12:03:26",
            dss_bfl_to: "2021-10-27 12:03:26",
            dss_bfl_num_sp: 5,
            dss_bfl_fb_dnw: "tttttttt",
            ffl: "2021-10-27 12:03:26",
            fll: "2021-10-27 12:03:26",
            sfl: "2021-10-27 12:03:26",
            sll: "2021-10-27 12:03:26",
            tfl: "2021-10-27 12:03:26",
            tll: "2021-10-27 12:03:26",
            lgbohc_all_from: "2021-10-27 12:03:26",
            lgbohc_all_to: "2021-10-27 12:03:26",
            lgbohc_all_num_gb: 5,
            lgbohc_all_hc: 5,
            lgbohc_all_inbay: 5,
            pgb_r_co: 1,
            pgb_r_co_reason: "tttttttt",
            lss_all_from: "2021-10-27 12:03:26",
            lss_all_to: "2021-10-27 12:03:26",
            lss_all_num_ss: 5,
            lss_all_ib_lnw: "tttttttt",
            cbu: "2021-10-27 12:03:26",
            voyage_id: 1,
            crane_id: 1,
            created_at: "2021-11-13T17:44:25.000000Z",
            updated_at: "2021-11-13T17:44:25.000000Z",
          },
          {
            id: 2,
            cbd: "2021-10-27 12:03:26",
            dgbohc_bfl_from: "2021-10-27 12:03:26",
            dgbohc_bfl_to: "2021-10-27 12:03:26",
            dgbohc_bfl_num_gb: 5,
            dgbohc_bfl_num_hc: 5,
            dss_bfl_from: "2021-10-27 12:03:26",
            dss_bfl_to: "2021-10-27 12:03:26",
            dss_bfl_num_sp: 5,
            dss_bfl_fb_dnw: "tttttttt",
            ffl: "2021-10-27 12:03:26",
            fll: "2021-10-27 12:03:26",
            sfl: "2021-10-27 12:03:26",
            sll: "2021-10-27 12:03:26",
            tfl: "2021-10-27 12:03:26",
            tll: "2021-10-27 12:03:26",
            lgbohc_all_from: "2021-10-27 12:03:26",
            lgbohc_all_to: "2021-10-27 12:03:26",
            lgbohc_all_num_gb: 5,
            lgbohc_all_hc: 5,
            lgbohc_all_inbay: 5,
            pgb_r_co: 1,
            pgb_r_co_reason: "tttttttt",
            lss_all_from: "2021-10-27 12:03:26",
            lss_all_to: "2021-10-27 12:03:26",
            lss_all_num_ss: 5,
            lss_all_ib_lnw: "tttttttt",
            cbu: "2021-10-27 12:03:26",
            voyage_id: 1,
            crane_id: 2,
            created_at: "2021-11-13T17:44:25.000000Z",
            updated_at: "2021-11-13T17:44:25.000000Z",
          },
        ],
      },
    ],
  },
  mutations: {
    SET_VOYAGES(state, voyages) {
      state.voyages = voyages;
    },
    ADD_VOYAGE(state, voyage) {
      state.voyages.push(voyage);
    },
    EDIT_VOYAGE(state, voyage) {
      state.voyages = state.voyages.map((e) => {
        if (e.id == voyage.id) return voyage;
        return e;
      });
    },
    DELETE_VOYAGE(state, voyage) {
      state.voyages = state.voyages.filter((e) => e.id != voyage.id);
    },
  },
  actions: {
    setVoyagesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/voyages")
          .then((response) => {
            commit("SET_VOYAGES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyage/create", payload)
          .then((response) => {
            commit("ADD_VOYAGE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/update", payload)
          .then((response) => {
            commit("EDIT_VOYAGE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteVoyageAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/delete", payload)
          .then((response) => {
            commit("DELETE_VOYAGE", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getVoyages: (state) => {
      return state.voyages;
    },
  },
};
export default voyageModule;
