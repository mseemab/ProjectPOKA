<template>
  <v-container>
    <!-- Item General Info Card -->
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
    <!-- Item Variants Card -->
    <v-card max-width="800" class="mt-5">
      <v-card-title>
        Item variants
      </v-card-title>
      <v-card-text>
        <v-container>
          <p>
            Use variants if an item has different sizes, colors or other options
          </p>
          <v-row>
            <v-col>
              <v-switch
                v-model="item.hasVariants"
                label="Item has variants"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row v-if="item.hasVariants">
            <v-col>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Available
                      </th>
                      <th class="text-left">
                        Name
                      </th>
                      <th class="text-left">
                        Price
                      </th>
                      <th class="text-left">
                        Cost
                      </th>
                      <th class="text-left">
                        SKU
                      </th>
                      <th class="text-left">
                        Barcode
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="variant in item.variants" :key="variant.id">
                      <td>
                        <v-simple-checkbox
                          v-model="variant.available"
                          :ripple="false"
                        ></v-simple-checkbox>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.name"
                          dense
                          flat
                          @change="variantTableUpdate(variant)"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.price"
                          dense
                          flat
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.cost"
                          dense
                          flat
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.sku"
                          dense
                          flat
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.barcode"
                          dense
                          flat
                        ></v-text-field>
                      </td>
                      <td>
                        <v-btn
                          icon
                          color="red"
                          @click.stop="delVariant(variant)"
                          ><v-icon>mdi-delete</v-icon></v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <!-- Inventory Card -->
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
          <v-row v-if="!item.composite"
            ><v-col>
              <v-switch
                v-model="item.trackInventory"
                label="Track Inventory"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row v-if="item.composite">
            <v-col>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Component
                      </th>
                      <template v-if="!item.hasVariants">
                        <th class="text-left">
                          Quantity
                        </th>
                      </template>
                      <template v-else>
                        <th
                          class="text-left"
                          v-for="variant in item.variants"
                          :key="variant.id"
                        >
                          Quantity ({{ variant.name }})
                        </th>
                      </template>
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
                      <td v-for="variant in item.variants" :key="variant.id">
                        <v-text-field dense flat>{{
                          ingr.quantity
                        }}</v-text-field>
                      </td>

                      <td><v-icon>mdi-delete</v-icon></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <template
            v-if="item.trackInventory && !item.composite && !item.hasVariants"
          >
            <v-row>
              <v-col>
                <v-text-field v-model="item.inStock" label="Current Stock">
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
          </template>
          <template v-else-if="!item.composite && item.trackInventory">
            <v-row>
              <v-col>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Name
                        </th>
                        <th class="text-left">
                          Current Stock
                        </th>
                        <th class="text-left">
                          Low Stock
                        </th>
                        <th class="text-left">
                          Optimum Stock
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="variant in item.variants" :key="variant.id">
                        <td>
                          {{ variant.name }}
                        </td>

                        <td>
                          <v-text-field
                            v-model="variant.currentStock"
                            dense
                            flat
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            v-model="variant.lowStock"
                            dense
                            flat
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            v-model="variant.optimumStock"
                            dense
                            flat
                          ></v-text-field>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </template>
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
        hasVariants: false,
        variants: [
          {
            id: 111,
            available: true,
            name: "",
            price: 0,
            cost: 0,
            sku: "",
            barcode: "",
            currentStock: 0,
            optimumStock: 0,
            lowStock: 0,
          },
        ],
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
    variantTableUpdate(variant) {
      if (
        this.item.variants.indexOf(variant) ==
        this.item.variants.length - 1
      ) {
        this.item.variants.push({
          id: this.item.variants.indexOf(variant),
          available: true,
          name: "",
          price: 0,
          cost: 0,
          sku: "",
          barcode: "",
          currentStock: 0,
          optimumStock: 0,
          lowStock: 0,
        });
      }
      if (
        variant.cost == 0 &&
        variant.price == 0 &&
        variant.sku == "" &&
        variant.barcode == ""
      ) {
        variant.cost = this.item.cost;
        variant.price = this.item.price;
        variant.sku = this.item.sku;
        variant.barcode = this.item.barcode;
      }
    },
    delVariant(variant) {
      console.log(this.item.variants.indexOf(variant));
      console.log(variant);
      console.log(this.item.variants);
      this.item.variants.splice(this.item.variants.indexOf(variant), 1);
      console.log(this.item.variants.indexOf(variant));
      console.log(variant);
      console.log(this.item.variants);
    },
  },
  computed: {},
};
</script>
