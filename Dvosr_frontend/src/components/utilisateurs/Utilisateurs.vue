<template>
  <v-app style="min-height: 100%">
    <v-snackbar
      v-model="snackbar"
      :timeout="-1"
      :value="true"
      absolute
      bottom
      :color="success"
      outlined
      right
      :multi-line="true"
    >
      {{ sbackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title
                ><h2 style="color: #1976d2">Users :</h2>
              </v-toolbar-title>
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
                    Add user
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.username"
                            label="Username"
                            :rules="[rules.required]"
                            ref="Username"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.firstname"
                            label="Firstname"
                            :rules="[rules.required]"
                            ref="Firstname"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.lastname"
                            label="Lastname"
                            :rules="[rules.required]"
                            ref="Lastname"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            :items="['admin', 'user']"
                            v-model="editedItem.role"
                            label="Role"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
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
              <v-dialog v-model="dialogPassword" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Change Password</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show1 = !show1"
                            ref="paaswordFirstInput"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password.password_confirmation"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[
                              rules.required,
                              rules.min,
                              passwordConfirmationRule,
                            ]"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Confirm Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show2 = !show2"
                            ref="paaswordSecondInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeChangePassword"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="changePasswordMethod"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
            <v-icon small @click="changePassword(item)"> mdi-lock</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import rules from "../mixins/rules.js";

export default {
  name: "Utilisateurs",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogPassword: false,
    show1: false,
    show2: false,
    snackbar: false,
    sbackbarText: "yes",
    success: "",
    headers: [
      { text: "Id", value: "id" },
      { text: "Username", value: "username" },
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    password: {
      password: "",
      password_confirmation: "",
      id: "",
    },
    defaultPassword: {
      password: "",
      password_confirmation: "",
      id: "",
    },
    editedIndex: -1,
    editedItem: {
      id: "",
      username: "",
      firstname: "",
      lastname: "",
      shift: "",
      role: "",
    },
    defaultItem: {
      id: "",
      username: "",
      firstname: "",
      lastname: "",
      shift: "",
      role: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),

  computed: {
    ...mapGetters(["getUsers"]),
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    passwordConfirmationRule() {
      return () =>
        this.password.password === this.password.password_confirmation ||
        "Password must match";
    },
  },
  mixins: [rules],
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
    ...mapActions([
      "setUsersAction",
      "updateUserAction",
      "addUserAction",
      "deleteUersAction",
      "changeUserPasswordAction",
      "logoutAction",
    ]),
    initialize() {
      this.users = this.getUsers;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    changePassword(item) {
      this.password.id = item.id;
      this.dialogPassword = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteUersAction({ id: this.editedItem.id })
        .then(() => {
          this.users.splice(this.editedIndex, 1);
          this.closeDelete();
        })
        .catch(() => {
          this.logoutAction();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeChangePassword() {
      this.dialogPassword = false;
      this.$nextTick(() => {
        this.password = Object.assign({}, this.defaultPassword);
        this.editedIndex = -1;
      });
    },

    changePasswordMethod() {
      if (
        !this.$refs.paaswordFirstInput.hasError &&
        !this.$refs.paaswordSecondInput.hasError
      )
        this.changeUserPasswordAction(this.password)
          .then(() => {
            this.closeChangePassword();
          })
          .catch(() => {
            this.logoutAction();
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
      if (
        !this.$refs.Username.hasError &&
        !this.$refs.Firstname.hasError &&
        !this.$refs.Lastname.hasError
      )
        if (this.editedIndex > -1) {
          const index = this.editedIndex;
          this.updateUserAction(this.editedItem)
            .then((item) => {
              Object.assign(this.users[index], item);
              this.snackbar = false;
              this.sbackbarText = "yes";
              this.success = "";
              this.close();
            })
            .catch(() => {
              this.logoutAction();
            });
        } else {
          this.addUserAction(this.editedItem)
            .then(() => {
              this.close();
            })
            .catch(() => {
              this.logoutAction();
            });
        }
    },
  },
  mounted: function () {
    this.setUsersAction()
      .then(() => {
        this.users = this.getUsers;
      })
      .catch(() => {
        this.logoutAction();
      });
  },
};
</script>
