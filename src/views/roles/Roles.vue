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
              :to="{ name: 'roles-new' }"
              >Add Role</v-btn
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
        :items="roles"
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
  name: "Roles",
  data() {
    return {
      selected: [],
      pagination: {},
      search: "",
      headers: [
        {
          text: "Role Name",
          value: "name",
        },
        {
          text: "Access",
          value: "access",
        },
        {
          text: "Employees",
          value: "employees",
        },
      ],
      roles: [
        {
          id: "1",
          name: "Owner",
          posAccess: true,
          backOfcAccess: true,
          access: 'POS and Back Office',
          employees: 1
        },
        {
          id: "2",
          name: "Administrator",
          posAccess: true,
          backOfcAccess: true,
          access: 'POS and Back Office',
          employees: 1
        },
        {
          id: "3",
          name: "Cashier",
          posAccess: true,
          backOfcAccess: false,
          access: 'POS',
          employees: 3
        },
      ],
      vd: {},
    };
  },
};
</script>

<style scoped>
.color-pill {
  width: 50px;
  height: 80%;
}
</style>
