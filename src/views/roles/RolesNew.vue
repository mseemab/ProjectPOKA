<template>
  <v-card max-width="550" class="ml-5 mb-5">
    <v-card-title></v-card-title>
    <v-card-text>
      <v-container>
        <v-row class="mx-2">
          <v-text-field label="Roll Name" v-model="role.name"></v-text-field>
        </v-row>
        <br />
        <v-row class="mx-2">
          <v-switch
            label="POS"
            v-model="role.posAccess"
            hint="Employees can log in to the app using personal PIN code"
            persistent-hint
          ></v-switch>
          <br />
        </v-row>

        <v-row v-if="role.posAccess" class="mx-2">
          <v-list flat dense>
            <v-list-item-group v-model="role.posRights" multiple>
              <template v-for="posRight in posRights">
                <v-list-item :key="posRight.name" :value="posRight.name">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{
                        posRight.label
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        posRight.hint
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
          <br />
        </v-row>

        <v-row class="mx-2">
          <v-switch
            label="Back Office"
            v-model="role.backOfcAccess"
            hint="Employees can log in to the back office using their email and password"
            persistent-hint
          ></v-switch>
          <br />
        </v-row>

        <v-row v-if="role.backOfcAccess" class="mx-2">
          <v-list flat dense>
            <v-list-item-group v-model="role.backOfcRights" multiple>
              <template v-for="backOfcRight in backOfcRights">
                <v-list-item :key="backOfcRight.name" :value="backOfcRight.name">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{
                        backOfcRight.label
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        backOfcRight.hint
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="teal lighten-1" dark large :to="{ name: 'roles' }"
        >Save</v-btn
      >
      <v-btn large :to="{ name: 'roles' }">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RolesNew",
  data() {
    return {
      settings: [],
      selected: [2],
      role: {
        id: "1",
        name: "Owner",
        posAccess: true,
        backOfcAccess: true,
        access: "POS and Back Office",
        employees: 1,
        posRights: [],
        backOfcRights: [],
      },
      posRights: [
        {
          name: "ACCESS_VIEW_RECEIPTS",
          label: "View all receipts",
          hint:
            "When this option is disabled, a cashier can view the last 5 receipts",
          
        },
        {
          name: "ACCESS_APPLY_DISCOUNTS",
          label: "Apply discounts with restricted access",
          hint: "",
          
        },
        {
          name: "ACCESS_CHANGE_TAXES",
          label: "Change taxes in a sale",
          hint: "",
          
        },
        {
          name: "ACCESS_PERFORM_REFUNDS",
          label: "Perform refunds",
          hint: "",
          
        },
        {
          name: "ACCESS_MANAGE_OPEN_TICKETS",
          label: "Manage all open tickets",
          hint: "",
          
        },
        {
          name: "ACCESS_VOID_OPEN_TICKET",
          label: "Void saved items in open tickets",
          hint: "",
          
        },
        {
          name: "ACCESS_VIEW_SHIFT_REPORT",
          label: "View shift report",
          hint: "",
          
        },
        {
          name: "ACCESS_CASH_DRAWER_NOSALE",
          label: "Open cash drawer without making a sale",
          hint: "",
          
        },
        {
          name: "ACCESS_REPRINT_RECEIPTS",
          label: "Reprint and resend receipts",
          hint: "",
          
        },
        {
          name: "ACCESS_MANAGE_ITEMS",
          label: "Manage items",
          hint: "",
          
        },
        {
          name: "ACCESS_CHANGE_SETTINGS",
          label: "Change settings",
          hint: "",
          
        },
        {
          name: "ACCESS_LIVE_CHAT_SUPPORT",
          label: "Access to live chat support",
          hint: "",
          
        },
      ],
      backOfcRights: [
        {
          name: "ACCESS_VIEW_SALES_REPORTS",
          label: "View sales reports",
          hint: "",
        },
        {
          name: "ACCESS_CANCEL_RECEIPTS",
          label: "Cancel receipts",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_ITEMS_INVENTORY",
          label: "Manage items and inventory",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_EMPLOYEES",
          label: "Manage employees",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_CUSTOMERS",
          label: "Manage customers",
          hint: "",
        },
        {
          name: "ACCESS_EDIT_GENERAL_SETTINGS",
          label: "Edit general settings",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_BILLING",
          label: "Manage billing",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_PAYMENT_TYPES",
          label: "Manage payment types",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_LOYALTY_PROGRAM",
          label: "Manage loyalty program",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_TAXES",
          label: "Manage taxes",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_KITCHEN_PRINTERS",
          label: "Manage kitchen printers",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_DINING_OPTIONS",
          label: "Manage dining options",
          hint: "",
        },
        {
          name: "ACCESS_MANAGE_POS_DEVICES",
          label: "Manage POS devices",
          hint: "This permission also allows to sign into POS using email and password",
        },
        {
          name: "ACCESS_LIVE_CHAT_SUPPORT",
          label: "Access to live chat support",
          hint: "",
        },
      ],
    };
  },
};
</script>
