<template>
  <v-card max-width="600px" class="ml-5">
    <v-toolbar flat prominent>
      <v-container>
        <v-row>
          <v-col class="pt-6">
            <v-btn
              color="teal lighten-1"
              dark
              class="mt-3"
              link
              :to="{ name: 'discounts-new' }"
              >New Discount</v-btn
            >
            <v-btn icon v-if="selected.length" color="red" class="pt-2 mx-3">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
          <v-col float="right"> </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
    <v-card flat>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="categories"
        item-key="id"
        show-select
      >
        <template v-slot:item.name="{ item }">
          
            <v-btn v-if="(item.type == 'percent')" color="pink" fab medium dark class="my-1">
              <v-icon>mdi-tag</v-icon>
            </v-btn>
            <v-btn v-else color="green lighten-2" fab medium dark class="my-1">
              <v-icon>mdi-tag</v-icon>
            </v-btn>
            <span class="ml-4">{{ item.name }}</span>
          
        </template>
        <template v-slot:item.restrictedAccess="{ item }">
          <span v-if="item.restrictedAccess">Yes</span>
          <span v-else>No</span>
        </template>
        <template v-slot:item.value="{ item }">
          <span v-if="item.type=='amount'">$</span> {{item.value}} <span v-if="item.type=='percent'">%</span>
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script>
/* eslint-disable no-debugger */
export default {
  name: "Items",
  data() {
    return {
      selected: [],
      pagination: {},
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Value",
          value: "value",
        },
        {
          text: "Restricted access",
          value: "restrictedAccess",
        },
      ],
      categories: [
        {
          id: "1",
          name: "Eid Discount",
          type: "percent",
          value: 10,
          restrictedAccess: true,
        },
        {
          id: "2",
          name: "Year End Discount",
          type: "percent",
          value: 10,
          restrictedAccess: true,
        },
        {
          id: "3",
          name: "Promo Discount",
          type: "amount",
          value: 50,
          restrictedAccess: false,
        },
      ],
      vd: {},
    };
  },
  methods: {
    save() {},
    cancel() {},
    open() {},
    close() {},
  },
};
</script>

<style scoped>
.color-pill {
  width: 50px;
  height: 80%;
}
</style>
