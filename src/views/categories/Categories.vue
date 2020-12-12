<template>
    <v-card max-width="600px" class="ml-5">
      <v-toolbar flat prominent>
        <v-container>
          <v-row>
            <v-col class="pt-6">
              <v-btn
                color="teal lighten-1"
                dark
                class="mt-3"
                link
                :to="{ name: 'categories-new' }"
                >New Category</v-btn
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
          :items="categories"
          item-key="id"
          show-select
        >
          <template v-slot:item.name="{ item }">
            <v-chip :color="item.color" label large class="color-pill mr-4">
            </v-chip>
            {{ item.name }}
          </template>
        </v-data-table>
      </v-card>
    </v-card>
</template>

<script>
/* eslint-disable no-debugger */
export default {
  name: "Items",
  data() {
    return {
      stockAlerts: ["All items", "Low stock", "Out of stock"],
      selectedCategory: "All categories",
      stockAlert: "All items",
      max25chars: (v) => v.length <= 25 || "Input too long!",
      selected: [],
      pagination: {},
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Item Count",
          value: "itemCount",
        },
      ],
      categories: [
        {
          id: "1",
          name: "Pizza",
          color: "orange",
          itemCount: 3,
        },
        {
          id: "2",
          name: "Burger",
          color: "purple",
          itemCount: 4,
        },
        {
          id: "3",
          name: "Wraps",
          color: "pink",
          itemCount: 1,
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

<style scoped>
.color-pill{
  width: 50px;
  height: 80%;
}
</style>