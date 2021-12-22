<template>
  <v-data-table
    hide-default-footer
    :headers="headers"
    :items="delays"
    class="elevation-1"
    :items-per-page="5"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Delays</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Delay
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <div v-if="notearrival == 'false'">
                <Delay />
              </div>
              <div v-if="notearrival == 'true'">
                <AddDelay />
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import Delay from "./Delay.vue";
import AddDelay from "../../vessel daparture/add/AddDelay.vue";
import { mapGetters } from "vuex";
import CraneModule from "../../../store/craneModule";
import { mapActions } from "vuex";
import VoyageModule from "../../../store/voyageModule";
export default {
  components: {
    Delay,
    mapGetters,
    mapActions,
    CraneModule,
    VoyageModule,
    AddDelay,
  },
  name: "DelayTable",
  props: {
    notearrival: String,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "DelayId", value: "delayid" },
      { text: "Crane", value: "crane" },
      { text: "Fromdate", value: "fromdate" },
      { text: "Todate", value: "todate" },
      { text: "Reason/Comment", value: "reason_comment" },
    ],
    delays: [{}, {}, {}, {}, {}, {}],

    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(["setCranesAction"]),
    initialize() {},

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
  computed: {
    ...mapGetters(["getCranes"]),
    ...mapGetters(["getVoyages"]),
  },
  mounted: {
    mounted: function () {
      this.setCranesAction();
      this.setVoyagesAction();
      console.log("delays");
    },
  },
};
</script>
