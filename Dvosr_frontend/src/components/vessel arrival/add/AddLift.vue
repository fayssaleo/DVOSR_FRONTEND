<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="timestamps"
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
                    New Timestamp
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <div class="crane-dropdown">
                          <v-combobox
                            outlined
                            label="Crane"
                            :items="cranechoices"
                            @change="onCraneChange"
                          >
                          </v-combobox>
                        </div>

                        <div class="lift-dropdown">
                          <v-combobox
                            outlined
                            label="Lifts"
                            :items="liftchoices"
                            @change="onLiftChange"
                          >
                          </v-combobox>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <center>
                          <h3>Time:</h3>
                          <vc-date-picker
                            v-model="addLiftDatetime"
                            mode="dateTime"
                            is-expanded
                          />
                        </center>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
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
  </v-container>
</template>
<style scoped>
.panel {
  background-color: #fff59d;
  padding: 1rem;
}
</style>
<script>
import Datepicker from "../../date&time/Datepicker.vue";
import Timepicker from "../../date&time/Timepicker.vue";

export default {
  name: "AddLift",
  components: { Datepicker, Timepicker },
  data: () => ({
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
    cranechoices: [
      "STS1",
      "STS2",
      "STS3",
      "STS4",
      "STS5",
      "STS6",
      "STS7",
      "STS8",
    ],
    headers: [
      { text: "lift", align: "start", sortable: false, value: "lift" },
      { text: "STS1", value: "STS1", sortable: false },
      { text: "STS2", value: "STS2", sortable: false },
      { text: "STS1", value: "STS1", sortable: false },

      { text: "STS3", value: "STS3", sortable: false },

      { text: "STS4", value: "STS4", sortable: false },

      { text: "STS5", value: "STS5", sortable: false },

      { text: "STS6", value: "STS6", sortable: false },

      { text: "STS7", value: "STS7", sortable: false },
      { text: "STS8", value: "STS8", sortable: false },
    ],
    timestamps: [
      {
        lift: "1st First Lift",
      },
      {
        lift: "1st Last Lift",
      },
      {
        lift: "2nd First Lift",
      },
      {
        lift: "2nd Last Lift",
      },
      {
        lift: "3rd First Lift",
      },
      {
        lift: "3rd Last Lift",
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
