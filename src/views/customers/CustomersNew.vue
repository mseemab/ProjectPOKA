<template>
  <v-card max-width="500px" class="ml-5 mb-5">
    <v-card-title class="justify-center">
      <v-btn color="green lighten-1" fab x-large dark class="mt-4">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <container>
        <v-row class="mx-2">
          <v-text-field label="Name" v-model="customer.name"></v-text-field>
        </v-row>
        <v-row class="mx-2">
          <v-text-field
            label="Email"
            prepend-inner-icon="mdi-at"
            v-model="customer.email"
          ></v-text-field>
        </v-row>
        <v-row class="mx-2">
          <v-text-field
            label="Phone"
            prepend-inner-icon="mdi-phone"
            v-model="customer.phone"
          ></v-text-field>
        </v-row>
        <v-row class="mx-2">
          <v-text-field
            label="Address"
            prepend-inner-icon="mdi-map-marker"
            v-model="customer.address"
          ></v-text-field>
        </v-row>
        <v-row class="mx-2">
          <v-col>
            <v-text-field label="City" v-model="customer.city"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Region"
              v-model="customer.region"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mx-2">
          <v-col>
            <v-text-field
              label="Postal Code"
              v-model="customer.postalCode"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              label="Country"
              v-model="customer.country"
              :items="countries"
            ></v-select>
          </v-col>
        </v-row>
      </container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal lighten-1" dark large :to="{ name: 'customers' }"
        >Save</v-btn
      >
      <v-btn large :to="{ name: 'customers' }">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CustomersNew",
  data() {
    return {
      customer: {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
        country: ""
      },
      countries: ["Pakistan", "USA", "India"],
    };
  },
};
</script>
