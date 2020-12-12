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
      dark
      color="teal lighten-2"
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
            <v-menu offset-x>
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
                  :to="{name: child.routeName}"
                >
                
                  <v-list-item-content>
                    <v-list-item-title v-text="child.title"></v-list-item-title>
                  </v-list-item-content>
                  
                </v-list-item>
              </v-list>
            </v-menu>
            <v-list-item-content >
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="child in item.items" :key="child.title" link :to="{name: child.routeName}">
            <v-list-item-content >
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- <div v-if="!mini">
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
            link
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="child in item.items" :key="child.title" link>
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div> -->
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
          action: "mdi-basket",
          items: [
            { title: "Item List", routeName: "items" },
            { title: "Categories", routeName: "categories" },
            { title: "Discounts", routeName: "discounts" },
          ],
          title: "Items",
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
