<template>
  <v-app>
    <v-row>
      <v-col cols="12" class="mb-0 pb-0">
        <template>
          <v-data-table
            :headers="headers2"
            :items="timestamps2"
            hide-default-footer
            item-key="name"
            class="elevation-1 tableheader"
          >
            <template v-slot:item="{ item }">
              <tr class="rowSelect" @click="rowClicked(item)">
                <td style="width: 50%">{{ item.operation }}</td>
                <td style="width: 50%">{{ item.date }}</td>
              </tr>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title style="font-size: 25px; font-weight: bold"
                  >Vessel departure</v-toolbar-title
                >
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog">
                  <template v-slot:activator="{ on, attrs }"> </template>
                  <v-card>
                    <AddDelay
                      v-if="dialog"
                      v-model="dialog"
                      @reloadTable="reloadTable"
                      :selectedDepartureChoice="selectedDepartureChoice2"
                    />
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog3" width="500px">
                  <template v-slot:activator="{ on, attrs }"> </template>
                  <v-card>
                    <AddDelay2
                      v-if="dialog3"
                      v-model="dialog3"
                      @reloadTable="reloadTable"
                      :selectedDepartureChoice="selectedDepartureChoice"
                    />
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-col cols="12" class="mt-1 pt-1 mb-1 pb-1">
        <v-data-table
          :headers="headers"
          :items="timestamps"
          hide-default-footer
          hide-default-header
          class="elevation-1 tableheader"
        >
          <template v-slot:item="{ item }">
            <tr class="rowSelect" @click="rowClicked2(item)">
              <td style="width: 33%">{{ item.operation }}</td>
              <td style="width: 33%">FROM : {{ item.from }}</td>
              <td style="width: 33%">TO : {{ item.to }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" class="mt-0 pt-0 mb-0 pb-0">
        <template>
          <v-data-table
            :headers="headers2"
            :items="timestamps3"
            hide-default-footer
            hide-default-header
            item-key="name"
            class="elevation-1 tableheader mt-0 pt-0 mb-0 pb-0"
          >
            <template v-slot:item="{ item }">
              <tr class="rowSelect" @click="rowClicked(item)">
                <td style="width: 50%">{{ item.operation }}</td>
                <td style="width: 50%">{{ item.date }}</td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-app>
</template>
<style scoped>
.panel {
  background-color: #fff59d;
  padding: 1rem;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import AddDelay from "./AddDelay.vue";
import AddDelay2 from "./AddDelay2.vue";
export default {
  name: "AddLift",
  components: { AddDelay, AddDelay2 },
  data: () => ({
    selectedDepartureChoice: {
      id: "",
      to: "",
      operation: "",
    },
    selectedDepartureChoice2: {
      id: "",
      operation: "",
      name: "",
      from: "",
      to: "",
      comment: "",
      commentValue: "",
    },
    cranevalue: "",
    liftvalue: "",
    timevalue: "",
    dialog: false,
    dialog2: false,
    dialog3: false,
    comments: "",
    headers: [
      {
        text: "operation",
        align: "start",
        sortable: false,
        value: "operation",
        class: "title ",
      },
      {
        text: "From(Date/Time)",
        value: "from",
        sortable: false,
        class: "title ",
      },
      { text: "To(Date/Time)", value: "to", sortable: false, class: "title " },
    ],
    headers2: [
      {
        text: "operation",
        align: "start",
        sortable: false,
        value: "operation",
        class: "title ",
        style: { "background-color": "black" },
      },
      {
        text: "(Date/Time)",
        value: "date",
        sortable: false,
        class: " title header",
      },
    ],
    timestamps: [],
    timestamps2: [],
    timestamps3: [],
  }),
  methods: {
    ...mapActions([
      "saveOrUpdateVoyageAction",
      "commentsSetterAction",
      "setSnackBarTosSuccess",
      "setSnackBarTosFailed",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    initialize() {
      this.comments = this.getVoyageToEditOrSave.comments;

      this.timestamps = [
        {
          operation: "Unmooring Aft",
          from: this.getVoyageToEditOrSave.unmooring_aft_from,
          fromName: "unmooring_aft_from",
          to: this.getVoyageToEditOrSave.unmooring_aft_to,
          toName: "unmooring_aft_to",
          comment: "unmooring_aft_comment",
          commentValue: this.getVoyageToEditOrSave.unmooring_aft_comment,
        },
        {
          operation: "Unmooring Forward",
          from: this.getVoyageToEditOrSave.unmooring_forward_from,
          fromName: "unmooring_forward_from",
          to: this.getVoyageToEditOrSave.unmooring_forward_to,
          toName: "unmooring_forward_to",
          comment: "unmooring_forward_comment",
          commentValue: this.getVoyageToEditOrSave.unmooring_forward_comment,
        },
      ];
      this.timestamps2 = [
        {
          operation: "Last Lift",
          date: this.getVoyageToEditOrSave.last_lift_to,
          to: "last_lift_to",
          comment: "last_lift_comment",
          commentValue: this.getVoyageToEditOrSave.last_lift_comment,
        },
        {
          operation: "Lashing Finished",
          date: this.getVoyageToEditOrSave.lf_to,
          to: "lf_to",
          comment: "lf_comment",
          commentValue: this.getVoyageToEditOrSave.lf_comment,
        },
        {
          operation: "Agent Onboard",
          date: this.getVoyageToEditOrSave.agent_onboard_to,
          to: "agent_onboard_to",
          comment: "agent_onboard_comment",
          commentValue: this.getVoyageToEditOrSave.agent_onboard_comment,
        },
        {
          operation: "Safety Net Off + Gangway up",
          date: this.getVoyageToEditOrSave.safety_net_gangway_to,
          to: "safety_net_gangway_to",
          comment: "safety_net_gangway_comment",
          commentValue: this.getVoyageToEditOrSave.safety_net_gangway_comment,
        },
        {
          operation: "Pilot Onboard",
          date: this.getVoyageToEditOrSave.pilot_onboard_to,
          to: "pilot_onboard_to",
          comment: "pilot_onboard_comment",
          commentValue: this.getVoyageToEditOrSave.pilot_onboard_comment,
        },
        {
          operation: "Tugs arrived ",
          date: this.getVoyageToEditOrSave.tugs_arrived_to,
          to: "tugs_arrived_to",
          comment: "tugs_arrived_comment",
          commentValue: this.getVoyageToEditOrSave.tugs_arrived_comment,
        },
      ];
      this.timestamps3 = [
        {
          operation: "Last Line",
          date: this.getVoyageToEditOrSave.last_line_to,
          to: "last_line_to",
          comment: "last_line_comment",
          commentValue: this.getVoyageToEditOrSave.last_line_comment,
        },
      ];
    },
    close() {
      this.dialog = false;
    },
    reloadTable() {
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction()
        .then((response) => {
          if (response.status == "200") {
            this.initialize();
            this.setSnackBarTosSuccess();
            this.setModuleShowToFalseAction();
            this.dialog = false;
            this.dialog3 = false;
          } else if (response.status == "406_2") {
            this.setSnackBarTosFailed("Please chose the voyage first !");
            this.setModuleShowToFalseAction();
            this.dialog = false;
            this.dialog3 = false;
          }
        })
        .catch((error) => {
          this.logoutAction();
        });

      return false;
    },
    OpenPositionDialog() {
      this.dialog2 = true;
    },
    closeAndSavePositionDialog() {
      this.commentsSetterAction({ comments: this.comments });
      this.saveOrUpdateVoyageAction().then((response) => {
        if (response.status == "200") {
          this.setSnackBarTosSuccess();
        } else if (response.status == "406_2") {
          this.setSnackBarTosFailed("Please chose the voyage first !");
        }
      });
      this.dialog2 = false;
    },
    closePositionDialog() {
      this.dialog2 = false;
    },
    rowClicked(item) {
      this.selectedDepartureChoice.to = item.to;
      this.selectedDepartureChoice.operation = item.operation;
      this.selectedDepartureChoice.commentValue = item.commentValue;
      this.selectedDepartureChoice.comment = item.comment;
      this.dialog3 = true;
    },
    rowClicked2(item) {
      this.selectedDepartureChoice2.from = item.fromName;
      this.selectedDepartureChoice2.to = item.toName;
      this.selectedDepartureChoice2.operation = item.operation;
      this.selectedDepartureChoice2.commentValue = item.commentValue;
      this.selectedDepartureChoice2.comment = item.comment;
      this.dialog = true;
    },
  },
  computed: {
    ...mapGetters(["getVoyageToEditOrSave"]),
  },
  mounted() {
    this.initialize();
  },
};
</script>
<style scoped>
.rowSelect {
  cursor: pointer;
}
</style>
