<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="crane_voyages"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Lifts</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      EDIT TIMESTAMPTS
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">EDIT TIMESTAMPTS</span>
                    </v-card-title>
                    <LiftDelay
                      v-if="dialog"
                      v-model="dialog"
                      @refreshTable="refreshTable"
                    />
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
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
import LiftDelay from "./LiftDelay.vue";
export default {
  name: "AddLift",
  components: { LiftDelay },
  data: () => ({
    dialog: false,
    cranevalue: "",
    liftvalue: "",
    timevalue: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    addLiftDatetime: new Date(),
    liftchoices: [
      "1st First Lift",
      "1st Last Lift",
      "2nd First Lift",
      "2nd Last Lift",
      "3rd First Lift",
      "3rd Last Lift",
    ],
    cranes: [],
    headers: [
      {
        text: "Crane ID",
        align: "start",
        sortable: false,
        value: "craneId",
      },
      { text: "1st FIRST LIFT", value: "ffl", sortable: false },
      { text: "1st LAST LIFT", value: "fll", sortable: false },
      { text: "2nd FIRST LIFT", value: "sfl", sortable: false },
      { text: "2nd LAST LIFT", value: "sll", sortable: false },
      { text: "3rd FIRST LIFT", value: "tfl", sortable: false },
      { text: "3rd LAST LIFT", value: "tll", sortable: false },
    ],

    newTask: null,
    crane_voyages: [],
  }),

  methods: {
    ...mapActions([
      "setCranesAction",
      "saveOrUpdateVoyageAction",
      "setSnackBarTosSuccess",
      "setSnackBarTosFailed",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    initialize() {
      if (this.cranes.length == 0) {
        this.setModuleShowToTrueAction();
        this.setCranesAction()
          .then(() => {
            this.cranes = this.getCranes;
            this.reloadTable();
            this.setModuleShowToFalseAction();
          })
          .catch(() => {
            this.setModuleShowToFalseAction();
          });
      } else {
        this.reloadTable();
      }
    },
    addToMenu() {
      this.lifts.push({
        crane: this.cranevalue,
        lift: this.liftvalue,
        date: this.timevalue,
      });
    },
    onCraneChange(value) {
      this.cranevalue = value;
    },
    onLiftChange(value) {
      this.liftvalue = value;
    },
    gettime(value) {
      this.timevalue = value;
    },
    close() {
      this.dialog = false;
    },
    refreshTable() {
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction()
        .then((response) => {
          if (response.status == "200") {
            this.setSnackBarTosSuccess();
            this.setModuleShowToFalseAction();
            this.dialog = false;
            this.initialize();
          } else if (response.status == "406_2") {
            this.setSnackBarTosFailed("Please chose the voyage first !");
            this.setModuleShowToFalseAction();
            this.dialog = false;
          }
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
        });

      return false;
    },
    reloadTable() {
      this.crane_voyages = this.getVoyageToEditOrSave.crane_voyages.map((e) => {
        const craneId = this.cranes.filter((c) => c.id == e.crane_id);
        return {
          crane_id: e.crane_id,
          voyage_id: this.getVoyageToEditOrSave.id,
          craneId: craneId[0].craneId,
          ffl: e.ffl,
          fll: e.fll,
          sfl: e.sfl,
          sll: e.sll,
          tfl: e.tfl,
          tll: e.tll,
        };
      });
      this.crane_voyages = this.cranes.map((c) => {
        const crane_voyage = this.crane_voyages.filter(
          (e) => c.id == e.crane_id
        )[0];
        if (crane_voyage != null) return crane_voyage;
        else
          return {
            crane_id: c.id,
            voyage_id: this.getVoyageToEditOrSave.id,
            craneId: c.craneId,
            ffl: "",
            fll: "",
            sfl: "",
            sll: "",
            tfl: "",
            tll: "",
          };
      });
    },
  },
  computed: {
    ...mapGetters(["getCranes", "getVoyageToEditOrSave"]),
  },
  mounted() {
    this.initialize();
  },
};
</script>
