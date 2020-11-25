<template>
  <v-navigation-drawer 
  v-model="drawer" 
  :mini-variant.sync="mini"  
  clipped 
  app
  dark
  color="teal lighten-2">
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-menu top :offset-x="true">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">{{ item.icon }}</v-icon>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
            </v-list-item-icon>
          </template>
          <v-list>
            <v-list-item v-for="(itemSub, index) in item.subs" :key="index">
              <v-list-item-title><router-link :to="{name: itemSub.routeName}">{{ itemSub.title}}</router-link></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
/* eslint-disable vue/no-unused-components */
export default {
  components: { },
  name: "Navigation",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Reports", icon: "mdi-home-city", subs: [
          {title: 'Daily Report',  routeName: 'report-daily'}, 
          {title: 'Weekly Report', routeName: 'report-weekly'}, 
          {title: 'Monthly Report', routeName: 'report-monthly'},
          ] },
        { title: "Items", icon: "mdi-account", subs: [
          {title: 'Items List',  routeName: 'items'}, 
          {title: 'Categories', routeName: 'categories'}, 
          {title: 'Modifiers', routeName: 'modifiers'},
          {title: 'Discounts', routeName: 'discounts'},
          ] },
        { title: "Inventory Management", icon: "mdi-account-group-outline" },
      ],
      mini: true,
    };
  },
};
</script>
