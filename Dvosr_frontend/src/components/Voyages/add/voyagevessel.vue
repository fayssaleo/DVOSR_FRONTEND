<template>
  <v-app>
    <v-row>
      <v-col cols="12" class="my-0 py-0">
        <h2 style="color: #1565c0">VOYAGE : 30000000179674</h2>
      </v-col>
      <v-col cols="3" class="my-0 py-0">
        <v-select
          outlined
          label="Vessel Name"
          :items="actualVoyages"
          @change="onChange"
          filled
          item-text="ves_name"
          item-value="voy_no"
          v-model="selectedVoyage.voy_no"
        >
        </v-select>
      </v-col>
      <v-col cols="3" class="my-0 py-0">
        <v-text-field
          label="Service"
          outlined
          v-model="selectedVoyage.service_name"
        ></v-text-field>
      </v-col>
      <v-col cols="3" class="my-0 py-0">
        <vc-date-picker
          v-model="datepickerEta"
          mode="dateTime"
          is24hr
          @input="etaChange"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              label="ETA"
              outlined
              :value="inputValue"
              v-on="inputEvents"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
      <v-col cols="3" class="my-0 py-0">
        <vc-date-picker
          v-model="datepickerEtd"
          mode="dateTime"
          is24hr
          @input="etdChange"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              label="ETD"
              outlined
              :value="inputValue"
              v-on="inputEvents"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
    </v-row>
  </v-app>
</template>
<style scoped></style>
<script>
import { mapGetters, mapActions } from "vuex";
import { FormatDateStringToISOSimpleEnglishDate } from "../../../helpers/helpers.js";
import { formatToSimpleFormatDD_MM_YYYY_H_M_S } from "../../../helpers/helpers.js";
export default {
  name: "voyagevessel",
  data: () => ({
    value: "",
    datepickerEta: new Date(),
    datepickerEtd: new Date(),
    actualVoyages: [],
    selectedVoyage: {
      voy_no: "",
      ves_name: "",
      service_name: "",
      voy_eta_ts: "",
      voy_etd_ts: "",
    },
  }),
  mounted() {
    this.setActualVoyagesAction().then(() => {
      this.actualVoyages = this.getActualVoyages;
    });
  },
  methods: {
    ...mapActions(["setActualVoyagesAction"]),
    onChange() {
      console.log("hhhhh", this.selectedVoyage.voy_no);

      if (this.selectedVoyage.voy_no != "") {
        this.actualVoyages.filter((e) => {
          if (e.voy_no == this.selectedVoyage.voy_no) {
            this.selectedVoyage.ves_name = e.ves_name;
            this.selectedVoyage.service_name = e.ves_name;
            this.selectedVoyage.voy_eta_ts =
              FormatDateStringToISOSimpleEnglishDate(e.voy_eta_ts);
            this.datepickerEta = new Date(e.voy_eta_ts);
            this.selectedVoyage.voy_etd_ts =
              FormatDateStringToISOSimpleEnglishDate(e.voy_etd_ts);
            this.datepickerEtd = new Date(e.voy_etd_ts);
            return true;
          }
          return false;
        })[0];
      }
    },
    etaChange(input) {
      this.selectedVoyage.voy_eta_ts =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(input);
    },
    etdChange(input) {
      this.selectedVoyage.voy_etd_ts =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(input);
    },
  },
  computed: {
    ...mapGetters(["getActualVoyages"]),
  },
};
</script>
