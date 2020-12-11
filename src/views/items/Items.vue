<template>
  <v-container>
    <v-card>
      <v-toolbar flat prominent>
        <v-container>
          <v-row>
            <v-col class="pt-6">
              <v-btn color="teal lighten-1" dark class="mt-3" link :to="{name: 'items-new'}">New Item</v-btn>
              &nbsp;&nbsp;
              <v-btn text class="mt-3">Import</v-btn>
              &nbsp;&nbsp;
              <v-btn text class="mt-3">Export</v-btn>
              &nbsp;&nbsp;
              <v-btn icon v-if="selected.length" color=red class="pt-2"><v-icon>mdi-delete</v-icon></v-btn>
            </v-col>
            <v-col float="right">
              <v-row>
                <v-col cols>
                  <v-select :items="categories" label="Category"></v-select>
                </v-col>
                <v-col cols>
                  <v-select :items="categories" label="Stock Alert"></v-select>
                </v-col>
              </v-row>
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
        :items="desserts"
        item-key="id" 
        :search="search"
        show-select>
          <template v-slot:item.name="props">
            <v-edit-dialog
              :return-value.sync="props.item.name"
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              {{ props.item.name }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.name"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.iron="props">
            <v-edit-dialog
              :return-value.sync="props.item.iron"
              large
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              <div>{{ props.item.iron }}</div>
              <template v-slot:input>
                <div class="mt-4 title">
                  Update Iron
                </div>
                <v-text-field
                  :value="props.item.iron"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-debugger */
export default {
  name: "Items",
  data() {
    return {
      categories: ["All Categories", "Pizza", "Burger", "Shawarma"],
      max25chars: (v) => v.length <= 25 || "Input too long!",
      selected: [],
      pagination: {},
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          id: "1",
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          id: "2",
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          id: "3",
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          id: "4",
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          id: "5",
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          id: "6",
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          id: "7",
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          id: "8",
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          id: "9",
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          id: "10",
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
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
