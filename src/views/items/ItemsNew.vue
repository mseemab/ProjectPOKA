<template>
  <v-container>
    <v-card max-width="800">
      <v-card-text>
        <v-container>
          <v-form>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.name"
                  counter="25"
                  label="Item Name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select :items="categories" label="Category"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="item.forSale"
                  label="The item is available for sale"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-radio-group v-model="item.soldBy" label="Sold by" row>
                  <v-radio label="Each" value="each"></v-radio>
                  <v-radio label="Weight/Volume" value="weight"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.price"
                  label="Price"
                  hint="Leave the field blank to indicate the price upon sale"
                  persistent-hint
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="item.cost" label="Cost"> </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.sku"
                  label="SKU Code"
                  hint="This is auto-generated"
                  persistent-hint
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="item.barcode" label="Barcode">
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card max-width="800" class="mt-5">
      <v-card-title>
        Inventory
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row
            ><v-col>
              <v-switch
                v-model="item.composite"
                label="Composite Item"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row
            ><v-col>
              <v-switch
                v-model="item.trackInventory"
                label="Track Inventory"
              ></v-switch>
            </v-col>
          </v-row>
          <div v-if="item.composite">
            <v-row>
              <v-col>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Component
                        </th>
                        <th class="text-left">
                          Quantity
                        </th>
                        <th class="text-left">
                          Cost
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ingr in ingredients" :key="ingr.id">
                        <td>
                          <v-autocomplete
                            v-model="ingr.item"
                            :items="items"
                            dense
                            @change="ingrTableUpdate(ingr)"
                          ></v-autocomplete>
                        </td>
                        <td>
                          <v-text-field dense flat>{{
                            ingr.quantity
                          }}</v-text-field>
                        </td>
                        <td>{{ ingr.cost }}</td>
                        <td><v-icon>mdi-delete</v-icon></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </div>
          <div v-if="item.trackInventory">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.inStock"
                  label="Current Stock"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="item.lowStock"
                  label="Low Stock"
                  hint="Item quantity at which you will be notified about low stock"
                  persistent-hint
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.optimalStock"
                  label="Optimum Stock"
                  hint="Use this field to autofill purchase orders"
                  persistent-hint
                >
                </v-text-field>
              </v-col>
              <v-col> </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="item.price"
                  label="Price"
                  hint="Leave the field blank to indicate the price upon sale"
                  persistent-hint
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="item.cost" label="Cost"> </v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ItemsNew",
  data() {
    return {
      categories: ["All Categories", "Pizza", "Burger", "Shawarma"],
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      item: {
        name: "",
        forSale: true,
        soldBy: "each",
        price: 0,
        cost: 0,
        composite: false,
        trackInventory: true,
      },
      ingredients: [
        {
          item: "",
          quantity: 0,
          cost: 0,
        },
      ],
    };
  },
  methods: {
    ingrTableUpdate(ingr) {
      if (this.ingredients.indexOf(ingr) == this.ingredients.length - 1) {
        this.ingredients.push({
          item: "",
          quantity: 0,
          cost: 0,
        });
      }
    },
  },
};
</script>
