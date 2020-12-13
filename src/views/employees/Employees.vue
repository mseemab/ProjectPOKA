<template>
    <v-card max-width="700px" class="ml-5">
      <v-toolbar flat prominent>
        <v-container>
          <v-row>
            <v-col class="pt-6">
              <v-btn
                color="teal lighten-1"
                dark
                class="mt-3"
                link
                :to="{ name: 'employees-new' }"
                >Add Employee</v-btn
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
          :items="employees"
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
  name: "Employees",
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
          text: "Email",
          value: "email",
        },
        {
          text: "Phone",
          value: "phone",
        },
        {
          text: "Role",
          value: "role",
        },
      ],
      employees: [
        {
          id: "1",
          name: "John Doe",
          email: "john@doe.com",
          phone: "123344444",
          role: "Owner"
        },
        {
          id: "1",
          name: "John Doda",
          email: "john@doda.com",
          phone: "123344444",
          role: "POS Operator"
        },
        {
          id: "1",
          name: "John Boba",
          email: "john@boba.com",
          phone: "123344444",
          role: "Manager"
        },
      ],
    };
  },
};
</script>

