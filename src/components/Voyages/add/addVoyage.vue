<template>
  <v-container style="max-width: 80rem">
    <Voyagevessel />
    <v-card class="border my-0 py-0 vesselContainer">
      <v-tabs v-model="tab" background-color="normal">
        <v-tab>
          <h3 style="color: #303f9f">VESSEL ARRIVAL</h3>
        </v-tab>
        <v-tab>
          <h3 style="color: #303f9f">VESSEL DEPARTURE</h3>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-container fluid>
          <v-tab-item>
            <v-card flat>
              <Vesselarrival :voyageToEditOrSave="voyageToEditOrSave" />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <VesselDeparture :voyageToEditOrSave="voyageToEditOrSave" />
            </v-card>
          </v-tab-item>
        </v-container>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<style scoped>
.border {
  border: 2px solid black;
}
.screen {
  max-height: 100vh;
}
.v-tabs-items {
  margin: 0;
  padding: 0;
}
</style>
<script>
import Vesselarrival from "../../vessel arrival/add/vessel_arrival.vue";
import Voyagevessel from "./voyagevessel.vue";
import VesselDeparture from "../../vessel daparture/add/vessel_departure.vue";
import { mapGetters } from "vuex";
export default {
  name: "addVoyage",
  components: { Vesselarrival, Voyagevessel, VesselDeparture },
  data() {
    return {
      tab: null,
      items: [
        { tab: "1" },
        { tab: "2" },
        { tab: "3" },
        { tab: "4" },
        { tab: "5" },
        { tab: "6" },
      ],
      voyageToEditOrSave: {
        vawgd: 0,
        vawsnrog: 0,
        dm_y: 0,
        dm_g: 0,
        hatch_covers_num: 0,
        hatch_covers_moves: 0,
        gear_boxes_num: 0,
        gear_boxes_moves: 0,
        first_line_datetime: "",
        vessel_all_fast: "",
        gangway_secured: "",
        lashers_onboard: "",
        num_mooring_r_fore: 0,
        num_mooring_r_aft: 0,
        dwuscfb: 0,
        imo_class: 0,
        imo_class_ps_onb: "",
        last_lift_from: "",
        last_lift_to: "",
        lf_from: "",
        lf_to: "",
        agent_onboard_from: "",
        agent_onboard_to: "",
        safety_net_gangway_from: "",
        safety_net_gangway_to: "",
        pilot_onboard_from: "",
        pilot_onboard_to: "",
        tugs_arrived_from: "",
        tugs_arrived_to: "",
        unmooring_forward_from: "",
        unmooring_forward_to: "",
        unmooring_aft_from: "",
        unmooring_aft_to: "",
        last_line_from: "",
        last_line_to: "",
        vessel_id: 14,
        id: "",
        crane_voyages: [],
        other_delays: [],
        vessel: {
          vessel_name: "",
          service: "",
          eta: "",
          etd: "",
          voy_no: "",

          id: "",
        },
      },
    };
  },
  methods: {},
  mounted() {
    if (this.getVoyageToEditOrSave.id != "") {
      this.voyageToEditOrSave = { ...this.getVoyageToEditOrSave };
    }
  },
  computed: {
    ...mapGetters(["getVoyageToEditOrSave"]),
  },
};
</script>
