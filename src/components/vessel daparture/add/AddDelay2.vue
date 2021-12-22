<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <h1>{{ selectedDepartureChoice.operation }} Date/Time :</h1>
              <br />
              <br />
              <vc-date-picker
                v-model="to"
                mode="dateTime"
                is-expanded
                is24hr
                @input="dateChange()"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                name="input-7-4"
                label="Comment ..."
                v-model="comment"
                clearable
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="" @click="close"> Cancel </v-btn>
          <v-btn
            depressed
            :color="to == '' || to == null ? 'grey' : 'primary'"
            @click="openSave"
          >
            Save
          </v-btn>
        </v-card-actions></v-col
      >
    </v-row>
    <v-dialog v-model="dialog4" width="500">
      <v-card v-if="to != '' && to != null">
        <v-card-title class="text-h5 grey lighten-2">
          Confirm action
        </v-card-title>

        <v-card-text>
          <h3>Are you sure you want to proceed?</h3>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="" @click="dialog4 = false">Cancel</v-btn>
          <v-btn depressed color="primary" @click="saveDelay">OK</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="to == '' || to == null">
        <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

        <v-card-text class="mt-4">
          <h2>Select Date/time !</h2>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
* {
  color: black;
}
</style>
<script>
import {
  FormatDateStringToISO,
  formatToSimpleFormatDD_MM_YYYY_H_M_S,
} from "../../../helpers/helpers.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddDelay",
  props: ["selectedDepartureChoice"],
  data() {
    return {
      to: Date.now(),
      comment: "",
      last_lift_to: "",
      last_lift_comment: "",
      lf_to: "",
      lf_comment: "",
      agent_onboard_to: "",
      agent_onboard_comment: "",
      safety_net_gangway_to: "",
      safety_net_gangway_comment: "",
      pilot_onboard_to: "",
      pilot_onboard_comment: "",
      tugs_arrived_to: "",
      tugs_arrived_comment: "",
      last_line_to: "",
      last_line_comment: "",
      dialog4: false,
    };
  },
  methods: {
    ...mapActions(["vesselDepartureSetter2Action"]),
    dateChange() {
      this[this.selectedDepartureChoice.to] =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(this.to);
    },
    close() {
      this.dialog = false;
    },
    openSave() {
      this.dialog4 = true;
    },
    saveDelay() {
      this.vesselDepartureSetter2Action({
        to: this.selectedDepartureChoice.to,
        comment: this.selectedDepartureChoice.comment,
        commentValue: this.comment,
        toValue: this[this.selectedDepartureChoice.to],
      });
      this.dialog4 = false;
      this.dialog = this.$emit("reloadTable");
    },
  },
  computed: {
    ...mapGetters(["getVoyageToEditOrSave"]),
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    this.last_lift_to = this.getVoyageToEditOrSave.last_lift_to;
    this.last_lift_comment = this.getVoyageToEditOrSave.last_lift_comment;
    this.lf_to = this.getVoyageToEditOrSave.lf_to;
    this.lf_comment = this.getVoyageToEditOrSave.lf_comment;
    this.agent_onboard_to = this.getVoyageToEditOrSave.agent_onboard_to;
    this.agent_onboard_comment =
      this.getVoyageToEditOrSave.agent_onboard_comment;
    this.safety_net_gangway_to =
      this.getVoyageToEditOrSave.safety_net_gangway_to;
    this.safety_net_gangway_comment =
      this.getVoyageToEditOrSave.safety_net_gangway_comment;
    this.pilot_onboard_to = this.getVoyageToEditOrSave.pilot_onboard_to;
    this.pilot_onboard_comment =
      this.getVoyageToEditOrSave.pilot_onboard_comment;
    this.tugs_arrived_to = this.getVoyageToEditOrSave.tugs_arrived_to;
    this.tugs_arrived_comment = this.getVoyageToEditOrSave.tugs_arrived_comment;
    this.last_line_to = this.getVoyageToEditOrSave.last_line_to;
    this.last_line_comment = this.getVoyageToEditOrSave.last_line_comment;
    this[this.selectedDepartureChoice.comment] =
      this.selectedDepartureChoice.commentValue;
    this.comment = this[this.selectedDepartureChoice.comment];
    if (
      this[this.selectedDepartureChoice.to] != "" &&
      this[this.selectedDepartureChoice.to] != null
    ) {
      this.to = new Date(
        FormatDateStringToISO(this[this.selectedDepartureChoice.to])
      );
    } else {
      this.to = Date.now();
      this[this.selectedDepartureChoice.to] =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(this.to);
    }
  },
};
</script>
