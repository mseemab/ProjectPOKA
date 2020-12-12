<template>
  <v-card max-width="500px" class="ml-5">
    <v-card-title class="justify-center">
      <v-btn v-if="discount.type == 'percent'" color="pink" fab x-large dark class="mt-4">
        <v-icon>mdi-tag</v-icon>
      </v-btn>
      <v-btn v-else color="green lighten-2" fab x-large dark class="mt-4">
        <v-icon>mdi-tag</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <container>
        <v-row class="mx-2">
          <v-text-field
            label="Discount Name"
            v-model="discount.name"
          ></v-text-field>
        </v-row>
        <br />
        <v-row class="mx-2">
          <v-radio-group v-model="discount.type" label="Type" row>
                  <v-radio label="Percentage" value="percent"></v-radio>
                  <v-radio label="Amount" value="amount"></v-radio>
                </v-radio-group>
        </v-row>
        <br />
        <v-row class="mx-2">
          <v-text-field
            label="Value"
            v-model="discount.value"
            hint="Leave the field blank to indicate the value upon sale"
            persistent-hint
          ></v-text-field>
        </v-row>
        <br>
        <v-row class="mx-2">
          <v-switch
      v-model="switch1"
      label="Restricted Access"
      hint="Only employees with appropriate access right are able to apply this discount"
      persistent-hint
    ></v-switch>
        </v-row>
        </container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal lighten-1" dark large :to="{ name: 'discounts' }"
        >Save</v-btn
      >
      <v-btn large :to="{ name: 'discounts' }">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DiscountsNew",
  data() {
    return {
      discount: {
        name: "",
        type: "percent",
        value: 0,
        restrictedAccess: false,
      },
    };
  },
};
</script>
