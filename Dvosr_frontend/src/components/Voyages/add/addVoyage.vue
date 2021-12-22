<template>
  <v-container style="max-width: 80rem">
    <Voyagevessel />
    <v-card class="border my-0 py-0">
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
              <Vesselarrival />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <VesselDeparture />
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
export default {
  name: "addVoyage",
  components: { Vesselarrival, Voyagevessel, VesselDeparture },
  data() {
    return {
      firstchoice: ["Item 1", "Item 2", "Item 3", "Item 4"],

      tab: null,
      items: [
        { tab: "1" },
        { tab: "2" },
        { tab: "3" },
        { tab: "4" },
        { tab: "5" },
        { tab: "6" },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
