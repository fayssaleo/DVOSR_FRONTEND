<template>
  <v-row>
    <v-col cols="12">
      <br />
      <v-data-table
        :headers="headers"
        :items="timestamps"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Vessel departure</v-toolbar-title>
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
                  New Timestamp
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <br />
                  <v-combobox
                    outlined
                    label="Lift/Lashing/Agent..."
                    :items="departurechoices"
                    @change="onCraneChange"
                  >
                  </v-combobox>

                  <center>
                    <h3>From(Date/Time):</h3>
                    <vc-date-picker
                      v-model="addLiftDatetime"
                      mode="dateTime"
                      is-expanded
                    />
                  </center>

                  <center>
                    <h3>To(Date/Time):</h3>
                    <vc-date-picker
                      v-model="addLiftDatetime"
                      mode="dateTime"
                      is-expanded
                    />
                  </center>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
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
</template>
<style scoped>
.panel {
  background-color: #fff59d;
  padding: 1rem;
}
</style>
<script>
import Datepicker from "../../date&time/Datepicker.vue";
export default {
  name: "AddLift",
  components: { Datepicker },
  data: () => ({
    cranevalue: "",
    liftvalue: "",
    timevalue: "",
    departurechoices: [
      "Last Lift",
      "Lashing Finished",
      "Agent Onboard",
      "Safety Net Off + Gangway up(see notes)",
      "Pilot Onboard",
      "Tugs arrived",
      "Unmooring Forward",
      "Unmooring Aft",
      "Last Line",
    ],
    headers: [
      {
        text: "operation",
        align: "start",
        sortable: false,
        value: "operation",
      },
      { text: "From(Date/Time)", value: "fromdatetime", sortable: false },
      { text: "To(Date/Time)", value: "todatetime", sortable: false },
    ],
    timestamps: [
      {
        operation: "Last Lift",
      },
      {
        operation: "Lashing Finished",
      },
      {
        operation: "Agent Onboard",
      },
      {
        operation: "Safety Net Off + Gangway up",
      },
      {
        operation: "Pilot Onboard",
      },
      {
        operation: "Tugs arrived",
      },
      {
        operation: "Unmooring Forward",
      },
      {
        operation: "Unmooring Aft",
      },
      {
        operation: "Last Line",
      },
    ],
    newTask: null,
  }),

  methods: {
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
  },
};
</script>
