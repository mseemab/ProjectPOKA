<template>

    <v-card class="mx-5" max-width="80%">
      <v-toolbar flat prominent>
        <v-container>
          <v-row>
            <v-col class="pt-6">
              <v-btn
                color="teal lighten-1"
                dark
                class="mt-3"
                link
                :to="{ name: 'items-new' }"
                >New Item</v-btn
              >
              &nbsp;&nbsp;
              <v-btn text class="mt-3">Import</v-btn>
              &nbsp;&nbsp;
              <v-btn text class="mt-3">Export</v-btn>
              &nbsp;&nbsp;
              <v-btn icon v-if="selected.length" color="red" class="pt-2"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </v-col>
            <v-col float="right">
              <v-row>
                <v-col cols>
                  <v-select
                    :items="categories"
                    label="Category"
                    v-model="selectedCategory"
                  ></v-select>
                </v-col>
                <v-col cols>
                  <v-select
                    :items="stockAlerts"
                    label="Stock Alert"
                    v-model="stockAlert"
                  ></v-select>
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
          show-select
        >
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
          <template v-slot:item.category="props">
            <v-edit-dialog
              :return-value.sync="props.item.category"
              large
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              {{ props.item.category }}
              <template v-slot:input>
                <div class="mt-4">
                  Update Category
                </div>
                <v-select
                  v-model="props.item.category"
                  :items="categories"

                  dense
                ></v-select>
              </template>
            </v-edit-dialog>
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
      categories: ["All categories", "Pizza", "Burger", "Wraps"],
      stockAlerts: ["All items", "Low stock", "Out of stock"],
      selectedCategory: "All categories",
      stockAlert: "All items",
      max25chars: (v) => v.length <= 25 || "Input too long!",
      selected: [],
      pagination: {},
      search: "",
      headers: [
        {
          text: "Item name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Category",
          value: "category",
          filter: (value) => {
            if (this.selectedCategory == "All categories") {
              return true;
            }
            return value == this.selectedCategory;
          },
        },
        { text: "Price", value: "price" },
        { text: "Cost", value: "cost" },
        { text: "Margin", value: "margin" },
        {
          text: "In stock",
          value: "inStock",
          filter: (value) => {
            if (
              this.stockAlert == "All items" ||
              this.stockAlert == "Low stock"
            ) {
              return true;
            } else if (this.stockAlert == "Out of stock") {
              return value == 0;
            }
          },
        },
      ],
      desserts: [
        {
          id: "1",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
        },
        {
          id: "2",
          name: "Bar B Que Pizza",
          category: "Pizza",
          price: 210,
          cost: 60,
          margin: "300%",
          inStock: 0,
        },
        {
          id: "3",
          name: "Yummilicious Shawarma",
          category: "Wraps",
          price: 100,
          cost: 50,
          margin: "100%",
          inStock: 3,
        },
        {
          id: "4",
          name: "Zinger Burger",
          category: "Burger",
          price: 150,
          cost: 100,
          margin: "50%",
          inStock: 5,
        },
        {
          id: "5",
          name: "Grilled Beef Burger",
          category: "Burger",
          price: 200,
          cost: 100,
          margin: "100%",
          inStock: 2,
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
