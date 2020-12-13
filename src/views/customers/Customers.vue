<template>

    <v-card class="mx-5" max-width="80%">
      <v-toolbar flat prominent>
        <v-container>
          <v-row>
            <v-col class="pt-6">
              <v-btn
                color="teal lighten-1"
                dark
                class="mt-3"
                link
                :to="{ name: 'customers-new' }"
                >Add customer</v-btn
              >
              &nbsp;&nbsp;
              <v-btn text class="mt-3">Import</v-btn>
              &nbsp;&nbsp;
              <v-btn text class="mt-3">Export</v-btn>
              &nbsp;&nbsp;
              <v-btn icon v-if="selected.length" color="red" class="pt-2"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </v-col>
            <v-col float="right">
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
      <v-card flat>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="customers"
          item-key="id"
          :search="search"
          show-select
        >
        </v-data-table>
      </v-card>
    </v-card>
</template>

<script>
/* eslint-disable no-debugger */
export default {
  name: "Customers",
  data() {
    return {
      selected: [],
      pagination: {},
      search: "",
      headers: [
        { text: "Customer", value: "name" },
        { text: "Contacts", value: "contacts" },
        { text: "First visit", value: "firstVisit" },
        { text: "Last visit", value: "lastVisit" },
        { text: "Total visits", value: "totalVisits" },
        { text: "Total spent", value: "totalSpent" },
        { text: "Points balance", value: "pointsBalance" },
      ],
      customers: [
        {
          id: "1",
          name: "Shakoor",
          contacts: "090078601",
          phone: "xyz",
          email: "abc@xyz.com",
          firstVisit: "1-Jan-2020",
          lastVisit: "1-Dec-2020",
          totalVisits: "5",
          totalSpent: "5000",
          pointsBalance: "60"
        },
        {
          id: "2",
          name: "Kafoor",
          contacts: "090078602",
          firstVisit: "1-Jan-2020",
          lastVisit: "1-Dec-2020",
          totalVisits: "5",
          totalSpent: "5000",
          pointsBalance: "60"
        },
        {
          id: "3",
          name: "Fakoor",
          contacts: "090078603",
          firstVisit: "1-Jan-2020",
          lastVisit: "1-Dec-2020",
          totalVisits: "5",
          totalSpent: "5000",
          pointsBalance: "60"
        },
        {
          id: "4",
          name: "Zahoor",
          contacts: "090078604",
          firstVisit: "1-Jan-2020",
          lastVisit: "1-Dec-2020",
          totalVisits: "5",
          totalSpent: "5000",
          pointsBalance: "60"
        },
        {
          id: "5",
          name: "Majboor",
          contacts: "090078605",
          firstVisit: "1-Jan-2020",
          lastVisit: "1-Dec-2020",
          totalVisits: "5",
          totalSpent: "5000",
          pointsBalance: "60"
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
