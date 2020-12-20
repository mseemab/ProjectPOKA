<template>
  <v-card class="card-outter mx-6" height="95%">
    <v-row class="mx-5">
      <v-col col="12" sm="12" md="12" lg="9">
        <v-data-iterator
          :items="categoryFilteredItems"
          :search="search"
          :items-per-page="itemsPerPage"
          :footer-props="{
            itemsPerPageOptions: itemsPerPageOptions,
            disableItemsPerPage: true,
          }"
          :page="page"
        >
          <template v-slot:header>
            <v-text-field label="Search" v-model="search"></v-text-field>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.id"
                cols="12"
                sm="4"
                md="2"
                lg="2"
              >
                <v-menu offset-x v-if="item.variants.length > 0">
                  <template v-slot:activator="{ on, attrs }">
                    <a v-on="on" v-bind="attrs" link>
                      <v-card>
                        <v-img
                          :src="item.imageURL"
                          class="white--text align-end"
                          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          height="100px"
                        >
                          <v-card-actions class="item-card-footer">
                            <h5 dark>{{ item.name }}</h5>
                          </v-card-actions>
                        </v-img>
                      </v-card>
                    </a>
                  </template>
                  <v-list dense>
                    <v-list-item
                      link
                      v-for="variant in item.variants"
                      :key="variant.name"
                      @click="addToCart(item, variant)"
                    >
                      {{ variant.name }} --- {{ variant.price }}
                    </v-list-item>
                  </v-list>
                </v-menu>
                <a
                  link
                  v-if="item.variants.length == 0"
                  @click="addToCart(item)"
                >
                  <v-card>
                    <v-img
                      :src="item.imageURL"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="100px"
                    >
                      <v-card-actions class="item-card-footer">
                        <h5 dark>{{ item.name }}</h5>
                      </v-card-actions>
                    </v-img>
                  </v-card>
                </a>
              </v-col>
            </v-row>
          </template>
          <template v-slot:footer> </template>
        </v-data-iterator>
        <v-spacer></v-spacer>
        <v-card-actions class="card-actions">
          <v-slide-group
            mandatory
            show-arrows
            center-active
            v-model="catSelect"
          >
            <v-slide-item
              v-for="category in categories"
              :key="category.name"
              v-slot="{ active, toggle }"
              :value="category.name"
            >
              <v-btn text :input-value="active" depressed @click="toggle">
                {{ category.name }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
          <!-- <v-spacer></v-spacer>
          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn> -->
        </v-card-actions>
      </v-col>
      <v-col class="col-3">
        <v-toolbar dense>
          <span>Ticket</span>
          <v-spacer></v-spacer>
          <v-btn icon><v-icon>mdi-account-plus</v-icon></v-btn>
          <v-menu offset-y close-on-content-click>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs"
                ><v-icon>mdi-dots-vertical</v-icon></v-btn
              >
            </template>
            <v-list dense>
              <v-dialog max-width="290" v-model="clearTicketDialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item link v-on="on" v-bind="attrs">
                    <v-list-item-icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-list-item-icon>
                    Clear Ticket
                  </v-list-item>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Clear Ticket?
                  </v-card-title>
                  <v-card-text
                    >Are you sure you want to clear the ticket?</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="clearTicketDialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn color="green darken-1" text @click="clearTicket()">
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-list class="mt-5" dense>
          <v-list-item v-for="item in receipt.items" :key="item.name">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.item.name }} x {{ item.count }}
                <span class="float-right">
                  {{ item.priceTotal }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle v-if="item.variant != null">{{
                item.variant.name
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Discount
                <span class="float-right">
                  {{ receipt.discount }}
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Tax
                <span class="float-right">
                  {{ receipt.discount }}
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense
          ><v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Total
                <span class="float-right">
                  {{ receipt.total }}
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item></v-list
        >
        <v-card-actions class="card-actions">
          <v-btn color="teal lighten-1" block dark>SAVE</v-btn>
          <v-btn color="teal lighten-1" block dark>CHARGE</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "POS",
  data: function() {
    return {
      clearTicketDialog: false,
      btnToggle: "",
      catSelect: "All",
      search: "",
      page: 1,
      itemsPerPage: 18,
      itemsPerPageOptions: [12, 16, 20, -1],
      items: [
        {
          id: "1",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "2",
          name: "Bar B Que Pizza",
          category: "Pizza",
          price: 210,
          cost: 60,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "3",
          name: "Yummilicious Shawarma",
          category: "Wraps",
          price: 100,
          cost: 50,
          margin: "100%",
          inStock: 3,
          imageURL:
            "https://www.lemonblossoms.com/wp-content/uploads/2018/07/Chicken-Shawarma-Recipe-S5.jpg",
          variants: [],
        },
        {
          id: "4",
          name: "Zinger Burger",
          category: "Burger",
          price: 150,
          cost: 100,
          margin: "50%",
          inStock: 5,
          imageURL:
            "https://toptaste.pk/wp-content/uploads/2019/03/Zinegr-Burger.png",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "5",
          name: "Grilled Beef Burger",
          category: "Burger",
          price: 200,
          cost: 100,
          margin: "100%",
          inStock: 2,
          imageURL:
            "https://www.foxvalleyfoodie.com/wp-content/uploads/2018/04/grilled-burger-recipe.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "6",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "7",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "8",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "9",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "10",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "11",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "12",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "13",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "14",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "15",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
        {
          id: "16",
          name: "Fajita Pizza",
          category: "Pizza",
          price: 200,
          cost: 50,
          margin: "300%",
          inStock: 0,
          imageURL:
            "https://www.pakistanichefrecipes.com/wp-content/uploads/2018/04/Chicken-Fajita-Pizza-500x500.jpg",
          variants: [
            {
              name: "Small",
              price: 250,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Medium",
              price: 400,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
            {
              name: "Large",
              price: 600,
              cost: 0,
              sku: "123456",
              barcode: "7891011",
              forSale: true,
            },
          ],
        },
      ],
      categories: [
        {
          name: "All",
          color: "red",
        },
        {
          name: "Pizza",
          color: "red",
        },
        {
          name: "Burger",
          color: "red",
        },
        {
          name: "Wraps",
          color: "red",
        },
        {
          name: "Chips",
          color: "red",
        },
      ],
      receipt: {
        items: [],
        discount: 0,
        tax: 0,
        total: 0,
      },
    };
  },
  computed: {
    categoryFilteredItems: function() {
      return this.items.filter(
        (item) => this.catSelect == "All" || item.category == this.catSelect
      );
    },
  },
  methods: {
    addToCart: function(addItem, addVariant = null) {
      if (addVariant != null) {
        if (!this.receipt.items.find((item) => item.variant == addVariant)) {
          this.receipt.items.push({
            item: addItem,
            variant: addVariant,
            count: 1,
            priceTotal: addVariant.price,
          });
        } else {
          let item = this.receipt.items.find(
            (item) => item.variant == addVariant
          );
          item.count += 1;
          item.priceTotal = item.count * addVariant.price;
        }
      } else {
        if (!this.receipt.items.find((item) => item.item == addItem)) {
          this.receipt.items.push({
            item: addItem,
            variant: addVariant,
            count: 1,
            priceTotal: addItem.price,
          });
        } else {
          let item = this.receipt.items.find(
            (item) => item.variant == addVariant
          );
          item.count += 1;
          item.priceTotal = item.count * addItem.price;
        }
      }
      this.receipt.total = 0;
      this.receipt.items.forEach(
        (item) => (this.receipt.total += item.priceTotal)
      );
    },
    clearTicket: function() {
      this.receipt = {
        items: [],
        discount: 0,
        tax: 0,
        total: 0,
      };
      this.clearTicketDialog = false;
    },
  },
};
</script>

<style scoped>
.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
.item-card {
  font-size: 0.75em;
}
.item-card-footer {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
