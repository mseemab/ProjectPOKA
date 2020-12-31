<template>
  <v-card class="mx-5" max-width="80%">
    <v-card-title flat prominent>
      <v-row>
        <v-col class="pt-6">
          <v-btn
              color="teal lighten-1"
              dark
              link
              :to="{ name: 'menus-new' }"
          >
            <v-icon>mdi-plus</v-icon>
            Add Menu
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
        :headers="menuHeaders"
        :items="menus"
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
      max25chars: (v) => v.length <= 25 || "Input too long!",
      selected: [],
      pagination: {},
      search: "",
      menuHeaders: [
        {text: "Menu name",value: "name"},
        {text: "Menu items", value: "itemCount"},
        {text: "Modified items", value: "modifiedCount"},
        {text: "Default menu", value: "isDefault"},
      ],
      menus: [
        {
          id: "1",
          name: "Standard",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: true
        },
        {
          id: "2",
          name: "Foodpanda",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: false
        },
        {
          id: "3",
          name: "Careem",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: false
        },
        {
          id: "4",
          name: "Uber",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: false
        },
      ],
      vd: {},
    };
  },
  methods: {},
};
</script>
