<template>
  <v-container>
    <v-app-bar clipped-left app color="teal lighten-2" dark>
      <div class="d-flex align-center">
        <div v-if="$vuetify.breakpoint.mobile">
          <v-app-bar-nav-icon
            @click.stop="
              drawer = !drawer;
              mini = false;
            "
          ></v-app-bar-nav-icon>
        </div>
        <div v-if="!$vuetify.breakpoint.mobile">
          <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
        </div>
        <v-toolbar-title>Project POKA</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      mini-variant-width="80"
      clipped
      app
    >
      <v-list nav>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          no-action
          link
        >
          <template v-slot:activator>
            <v-menu offset-x v-if="mini">
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip right>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-list-item-icon
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                    >
                      <v-icon>{{ item.action }}</v-icon>
                    </v-list-item-icon>
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item dark class="teal lighten-2">
                  <v-list-item-content
                    ><h4>{{ item.title }}</h4></v-list-item-content
                  >
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item
                  v-for="child in item.items"
                  :key="child.title"
                  link
                  :to="{ name: child.routeName }"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="child.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-list-item-icon v-if="!mini">
              <v-icon>{{ item.action }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            link
            :to="{ name: child.routeName }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
/* eslint-disable vue/no-unused-components */
export default {
  components: {},
  name: "Nav",
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Reports",
          action: "mdi-chart-bar-stacked",
          routeName: "",
          items: [
            { title: "Sales Summary", routeName: "reports-summary-sales" },
            {
              title: "Sales By Items Summary",
              routeName: "reports-summary-items",
            },
            { title: "Receipts", routeName: "reports-receipts" },
          ],
        },
        {
          title: "Items",
          action: "mdi-basket",
          routeName: "",
          items: [
            { title: "Item List", routeName: "items" },
            { title: "Categories", routeName: "categories" },
            { title: "Discounts", routeName: "discounts" },
            { title: "Menus", routeName: "menus" },
          ],
        },
        {
          title: "Employees",
          action: "mdi-card-account-details",
          routeName: "",
          items: [
            { title: "Employee List", routeName: "employees" },
            { title: "Roles", routeName: "roles" },
          ],
        },
        {
          title: "Customers",
          routeName: "customers",
          action: "mdi-account-multiple",
          items: [{ title: "Customers List", routeName: "customers" }],
        },
        {
          routeName: "settings",
          title: "Settings",
          action: "mdi-cog",
          items: [{ title: "Settings", routeName: "settings" }],
        },
      ],
      mini: true,
    };
  },
};
</script>

<style>
.v-list .v-list-item--active.theme--dark {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
