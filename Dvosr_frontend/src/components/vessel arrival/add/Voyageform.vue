<template>
  <v-app>
    <v-container>
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <div class="crane-dropdown">
              <v-select
                outlined
                label="Crane"
                :items="cranechoices"
                @change="onChange"
                filled
              >
              </v-select>
            </div>

            <div class="pb-4">
              <center>
                <h3>Disch of Gear Boxes and/or Hatch Covers before 1st Lift</h3>
              </center>
            </div>

            <vc-date-picker
              v-model="datepickerfromgearbox"
              mode="dateTime"
              is24hr
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="From(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                >
                </v-text-field>
              </template>
            </vc-date-picker>

            <vc-date-picker
              v-model="datepickertogearbox"
              mode="dateTime"
              is24hr
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="To(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                >
                </v-text-field>
              </template>
            </vc-date-picker>

            <v-text-field label="Number of gear boxes:"></v-text-field>

            <v-text-field label="Number of Hatch covers:"></v-text-field>

            <center>
              <Dialog />
            </center>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Crane Boom Down"></v-text-field>
            <div class="pt-9 pb-4">
              <center>
                <h3>Disch of ship's Spreaders before 1st Lift</h3>
              </center>
            </div>
            <vc-date-picker
              v-model="datepickerfromspreader"
              mode="dateTime"
              is24hr
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="From(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                >
                </v-text-field>
              </template>
            </vc-date-picker>

            <vc-date-picker
              v-model="datepickertospreader"
              mode="dateTime"
              is24hr
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="To(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                >
                </v-text-field>
              </template>
            </vc-date-picker>

            <v-text-field label="Number of spreaders: "></v-text-field>

            <v-text-field
              label="From Bay / Disch by NS or Wires?: "
            ></v-text-field>

            <center><Dialog /></center>

            <center class="pt-10">
              If spreaders discharged by the ship itself specify number,
              position and duration of handling spreaders by the ship.
            </center>
          </v-col>
        </v-row>
      </form>
    </v-container>
  </v-app>
</template>
<style scoped>
/* bordures gris */

.v-text-field {
  margin: 0;
  padding: 0;
}

/* .title {
  border: 1px solid black;
  padding: 10px;
} */
</style>
<script>
import Datepicker from "../../date&time/Datepicker";
import Dialog from "../../dialog/Dialog";
export default {
  name: "Voyageform",
  components: { Datepicker, Dialog },
  data: () => ({
    //elements for the combobox
    datepickertogearbox: new Date(),
    datepickerfromgearbox: new Date(),
    datepickertospreader: new Date(),
    datepickerfromspreader: new Date(),
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
  }),
};
</script>
