<template>
  <div class="ml-5">
    <v-row class="filter-card-row">
      <v-col cols="5" class="ml-1">
        <v-btn tile color="white" class="px-2 grey--text text--darken-1" min-width="45px">
          <v-icon size="20">mdi-less-than</v-icon>
        </v-btn>
        <v-menu
            ref="dateMenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn tile color="white" class="grey--text text--darken-1 body-2 text-lowercase" min-width="200" v-bind="attrs"
                   v-on="on">
              <v-icon class="mr-1">mdi-calendar</v-icon>
              {{ dateRange }}
            </v-btn>
          </template>
          <v-date-picker v-model="dates" no-title scrollable range>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateMenu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.dateMenu.save(dates)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-btn tile color="white" class="px-2 grey--text text--darken-1" min-width="45px">
          <v-icon size="20">mdi-greater-than</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2" class="ml-n10">
        <v-select :items="stores" item-text="name" item-value="name" dense solo multiple class="rounded-0"
                  height="30" label="Stores"
                  :menu-props="{offsetY: true }"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select :items="employees" dense solo multiple class="rounded-0" height="30" label="Employees"
                  :menu-props="{offsetY: true }"></v-select>
      </v-col>
    </v-row>
    <v-item-group mandatory active-class="teal lighten-5" v-model="statGroup">
      <v-row class="stat-card-row ml-0">
        <v-col cols="12" md="4" v-for="stat in stats" :key="stat.name" class="ma-0 pa-1">
          <v-item v-slot="{ active, toggle }" :value="stat.name">
            <v-card height="100" @click="toggle">
              <div class="d-flex flex-no-wrap justify-center">
                <v-avatar class="" size="100" tile>
                  <v-icon size="80" :color="stat.color">{{ stat.icon }}</v-icon>
                </v-avatar>
                <div class="d-flex flex-column justify-center mt-5">
                  <p class="subtitle-1 font-weight-light mb-1">
                    {{ stat.name }}
                  </p>
                  <p class="headline">{{ stat.value }}</p>
                </div>
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <v-card class="my-10" max-width="80%">
      <v-card flat>
        <v-row class="mx-2">
          <v-col>
            <v-btn text class="mt-2">Export</v-btn>
          </v-col>
          <v-col>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="ma-0"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
            class="mx-3"
            :headers="headers"
            :items="receipts"
            item-key="id"
            :search="search"
        >
        </v-data-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      dates: [],
      search: "",
      statGroup: "",
      dateMenu: false,
      employeeSelected: ["Owner"],
      employees: ["Owner"],
      storeSelected: ['Store 1'],
      stores: [
        {name: 'Store 1', address: '', phone: '', description: '', POSCount: 0},
        {name: 'Store 2', address: '', phone: '', description: '', POSCount: 0},
        {name: 'Store 3', address: '', phone: '', description: '', POSCount: 0},

      ],
      stats: [
        {
          name: "All Receipts",
          value: "50",
          icon: "mdi-receipt",
          color: "gray",
        },
        {
          name: "Sales",
          value: "50",
          icon: "mdi-receipt",
          color: "green",
        },
        {
          name: "Refunds",
          value: "50",
          icon: "mdi-receipt",
          color: "pink",
        },
      ],
      headers: [
        {
          text: "Receipt No.",
          align: "start",
          value: "receiptNo",
        },
        {
          text: "Date",
          value: "dateCreated",
        },
        {text: "Employee", value: "employee"},
        {text: "Customer", value: "customer"},
        {text: "Type", value: "type"},
        {
          text: "Total",
          value: "total",
        },
      ],
      receipts: [
        {
          id: "1",
          receiptNo: "10001",
          dateCreated: "19-Dec-2020",
          employee: "Owner",
          customer: "Hassan",
          type: "Sale",
          total: 2000,
        },
        {
          id: "2",
          receiptNo: "10002",
          dateCreated: "19-Dec-2020",
          employee: "Owner",
          customer: "Hassan",
          type: "Sale",
          total: 3000,
        },
        {
          id: "3",
          receiptNo: "10003",
          dateCreated: "19-Dec-2020",
          employee: "Owner",
          customer: "Hassan",
          type: "Sale",
          total: 4000,
        },
        {
          id: "4",
          receiptNo: "10004",
          dateCreated: "19-Dec-2020",
          employee: "Owner",
          customer: "Hassan",
          type: "Sale",
          total: 5000,
        },
        {
          id: "5",
          receiptNo: "10005",
          dateCreated: "19-Dec-2020",
          employee: "Owner",
          customer: "Hassan",
          type: "Sale",
          total: 6000,
        },
      ],
    };
  },
  computed: {
    dateRange: function () {
      if (this.dates.length == 2) {
        return this.dates[0] + " to " + this.dates[1];
      }
      return "Please select a date";
    },
  },
};
</script>

<style scoped>
.stat-card-row {
  width: 80%;
}

.filter-card-row {
  width: 70%;
}
</style>
