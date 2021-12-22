<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <DelayTable notearrival="true" />
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

import DelayTable from "../../vessel arrival/add/DelayTable.vue";
export default {
  name: "Delay",
  components: { DelayTable, Datepicker },
  data() {
    return {
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
