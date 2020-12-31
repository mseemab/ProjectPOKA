<template>
  <v-card class="mx-5" max-width="70%">
    <v-card-title flat prominent>
      <v-row>
        <v-col class="pt-6">
          <v-btn
              color="teal lighten-1"
              dark
              link
              :to="{ name: 'deals-new' }"
          >
            <v-icon>mdi-plus</v-icon>
            Add Deal
          </v-btn>
          <v-btn v-if="selected.length" text color="grey darken-2">
            <v-icon>mdi-delete</v-icon>
            Delete
          </v-btn
          >
        </v-col>
        <v-col float="right">
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-text>
    <v-data-table
        v-model="selected"
        :headers="dealHeaders"
        :items="deals"
        item-key="id"
        :search="search"
        show-select
    >
    </v-data-table>
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
      dealHeaders: [
        {text: "Deal name",value: "name"},
        {text: "Deal items", value: "itemCount"},
        {text: "Items price", value: "itemsPrice"},
        {text: "Deal price", value: "dealPrice"},
        {text: "Is active", value: "isActive"},
      ],
      deals: [
        {
          id: "1",
          name: "Deal 1",
          itemCount: 6,
          itemsPrice: 500,
          dealPrice: 430,
          isActive: true
        },
        {
          id: "2",
          name: "Deal 2",
          itemCount: 5,
          itemsPrice: 500,
          dealPrice: 450,
          isActive: true
        },
        {
          id: "3",
          name: "Deal 3",
          itemCount: 3,
          itemsPrice: 300,
          dealPrice: 270,
          isActive: true
        },
        {
          id: "4",
          name: "Deal 1",
          itemCount: 4,
          itemsPrice: 450,
          dealPrice: 400,
          isActive: true
        },
      ],
      vd: {},
    };
  },
  methods: {},
};
</script>
