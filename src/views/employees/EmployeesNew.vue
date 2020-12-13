<template>
  <v-card max-width="500px" class="ml-5">
    <v-card-title class="justify-center">
      <v-btn color="green lighten-1" fab x-large dark class="mt-4">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <container>
        <v-row class="mx-2">
          <v-text-field
            label="Employee Name"
            v-model="employee.name"
          ></v-text-field>
        </v-row>
        <br />
        <v-row class="mx-2">
          <v-text-field
            label="Email"
            prepend-inner-icon="mdi-at"
            v-model="employee.email"
          ></v-text-field>
        </v-row>
        <br />
        <v-row class="mx-2">
          <v-text-field
            label="Phone"
            prepend-inner-icon="mdi-phone"
            v-model="employee.phone"
          ></v-text-field>
        </v-row>
        <br />
        <v-row class="mx-2">
          <v-select
          v-model="employee.role"
          :items="roles"
          label="Role"
          prepend-inner-icon="mdi-account-multiple"
        ></v-select>
        </v-row>
        <br />
        <v-row class="mx-2" v-if="employee.role">
          <v-text-field
            label="POS Pin"
            prepend-inner-icon="mdi-lock"
            v-model="employee.posPin"
          ></v-text-field>
        </v-row>
        <br v-if="employee.role"/>
        <v-row class="mx-2">
          <v-checkbox
          v-model="employee.backOfcInvite"
          label="Invite to the back office"
          ></v-checkbox>
        </v-row>
        </container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal lighten-1" dark large :to="{ name: 'employees' }"
        >Save</v-btn
      >
      <v-btn large :to="{ name: 'employees' }">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "EmployeesNew",
  data() {
    return {
      employee: {
        name: "",
        email: "",
        phone: "",
        role: "",
        posPin: "",
        backOfcInvite: true
      },
      roles: ['Manager', 'Administrator', 'Cashier']
    };
  },
};
</script>
