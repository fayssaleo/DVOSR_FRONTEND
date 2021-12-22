<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-combobox
          outlined
          label="Crane"
          :items="cranechoices"
          @change="onChange"
        >
        </v-combobox>

        <vc-date-picker v-model="datepickerfromdelay" mode="dateTime" is24hr>
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              label="From(Date)"
              outlined
              :value="inputValue"
              v-on="inputEvents"
            >
            </v-text-field>
          </template>
        </vc-date-picker>

        <vc-date-picker v-model="datepickertodelay" mode="dateTime" is24hr>
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              label="To(Date)"
              outlined
              :value="inputValue"
              v-on="inputEvents"
            >
            </v-text-field>
          </template>
        </vc-date-picker>

        <v-textarea
          outlined
          name="input-7-4"
          label="Reason/Comments"
        ></v-textarea>
      </v-col>
      <v-col cols="6">
        <v-card elevation="2">
          <v-card-title
            >Please note the <br />
            following:</v-card-title
          >
          <v-card-text>
            NB:Delays to be recorded should exclude the normal operations
            stipulated above:
            <br />(Agent - Safety net + Gangway - Pilot - Tugs - Unmooring...)
            <br />
            For example:Maneuvring Sequence / Waiting for ship's crane to be put
            in position / Malfunction reefer / Stowaway / search / Vessel engine
            breakdown / Weather / Restows requested by vessel / Fresh water
            supply / etc...
          </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
* {
  color: black;
}
</style>
<script>
import Datepicker from "../../date&time/Datepicker.vue";

export default {
  name: "AddDelay",
  components: { Datepicker },

  data() {
    return {
      datepickerfromdelay: new Date(),
      datepickertodelay: new Date(),
      value: "",
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
    };
  },
  methods: {
    change(value) {
      this.value = value;
    },
  },
};
</script>
