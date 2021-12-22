<template>
  <v-data-table
    :headers="headers"
    :items="vessels"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          ><h2 style="color: #1976d2">Voyages :</h2></v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn
          @click="$router.push('add/voyage')"
          color="primary"
          dark
          class="mb-2"
        >
          Add Voyage
        </v-btn>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { VoyageModule } from "../../../store/voyageModule";
import { CraneModule } from "../../../store/craneModule";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Vessel Name", value: "vessel_name" },
      { text: "Service", value: "service" },
      { text: "ETA", value: "eta" },
      { text: "ETD", value: "etd" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    vessels: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      vessel_name: "",
      service: "",
      eta: "",
      etd: "",
    },
    defaultItem: {
      id: "",
      vessel_name: "",
      service: "",
      eta: "",
      etd: "",
    },
  }),

  computed: {
    ...mapGetters(["getVessels"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapActions(["setVesselsAction", "logoutAction"]),
    initialize() {
      this.vessels = this.getVessels;
    },

    editItem(item) {
      this.editedIndex = this.vessels.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.vessels.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.vessels.splice(this.editedIndex, 1);
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
  },
  mounted() {
    this.setVesselsAction()
      .then(() => {
        this.initialize();
      })
      .catch((error) => {
        this.logoutAction();
      });
  },
};
</script>
