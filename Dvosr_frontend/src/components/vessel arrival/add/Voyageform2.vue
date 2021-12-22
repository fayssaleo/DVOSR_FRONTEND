<template>
  <v-container>
    <v-row>
      <v-col col="12" md="6">
        <v-card elevation="2">
          <div class="pl-4 pt-1">
            <v-switch
              v-model="switch1"
              label="Vessel arrived with gangway down?"
            ></v-switch>
            <v-switch
              v-model="switch1"
              label="Vessel arrived with safety net ready on gangway?"
            ></v-switch>
          </div>
          <v-card-actions>
            <v-btn color="primary" text>
              <div class="fontsize">
                <Dialog />
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <div class="pl-4 pt-1">
            <h3 class="pb-3">Damaged containers ?</h3>

            <v-text-field label="Yard:"></v-text-field>
            <v-text-field label="Gangway:"></v-text-field>
          </div>
          <v-card-actions>
            <v-btn color="primary" text
              ><div class="fontsize">
                <Dialog />
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-row>
            <v-col class="pl-8" cols="6">
              <h3 class="pb-2 mb-2">Hatch covers</h3>

              <v-text-field label="Number:"></v-text-field>
              <v-text-field label="Moves:"></v-text-field>
              <div class="pb-2">Paperwork received at:</div>

           <vc-date-picker
          v-model="datepickerpaperwork"
          mode="dateTime"
          is24hr
         
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              label="Date"
              outlined
              :value="inputValue"
              v-on="inputEvents"
            >
            </v-text-field>
          </template>
        </vc-date-picker>
            </v-col>
            <v-col cols="6">
              <h3 class="pb-2 mb-2">Gear boxes</h3>

              <v-text-field label="Number:"></v-text-field>
              <v-text-field label="Moves:"></v-text-field>
              <v-text-field label="Length:"></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn color="primary" text>
              <div class="fontsize">
                <Dialog />
              </div>
            </v-btn>
          </v-card-actions>
          <br />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-row>
            <v-col cols="6">
              <div class="pl-4">
                <div class="pb-2">First Line</div>

                  <vc-date-picker
          v-model="datepickerfirstline"
          mode="dateTime"
          is24hr
         
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              label="Date"
              outlined
              :value="inputValue"
              v-on="inputEvents"
            >
            </v-text-field>
          </template>
        </vc-date-picker>

                <v-text-field
                  label="Number of Mooring ropes(Before) :"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="pb-2">Vessel All Fast</div>

                 <vc-date-picker
          v-model="datepickervessel"
          mode="dateTime"
          is24hr
        
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              label="Date"
              outlined
              :value="inputValue"
              v-on="inputEvents"
            >
            </v-text-field>
          </template>
        </vc-date-picker>

              <v-text-field
                label="Number of Mooring ropes(After) :"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="pl-4 pb-0 mb-0">
            <v-text-field label="Gangway secured"></v-text-field>
            <v-text-field label="Lashers onboard"></v-text-field>
            <v-switch
              class="pb-0 mb-0"
              v-model="switch1"
              label="Did we Use Safety cage for Boarding?"
            ></v-switch>
          </div>
          <v-card-actions class="pt-0 mt-0">
            <v-btn color="primary" text>
              <div class="fontsize">
                <Dialog />
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.fontsize {
  font-size: 1.25rem;
}
.v-text-field {
  margin: 0;
  padding: 0;
}
</style>
<script>
import Datepicker from "../../date&time/Datepicker.vue";
import Dialog from "../../dialog/Dialog";
export default {
  name: "Voyageform2",
  components: { Datepicker, Dialog },
  data() {
    return {
        datepickervessel:new Date(),
        datepickerfirstline:new Date(),
        datepickerpaperwork:new Date()


    };
  },
  methods:{
    
  }
};
</script>
