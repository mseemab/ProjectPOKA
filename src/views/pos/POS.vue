<template>
  <div>
    <v-row class="mx-4">
      <v-col cols="9">
        <v-card class="d-flex justify-space-between flex-column justify-space-between fill-height" min-height="600">
          <v-card-text>
            <v-row>
              <v-col class="py-0" cols="7">
                <v-text-field prepend-inner-icon="mdi-magnify" class="my-0" v-model="search"></v-text-field>
              </v-col>
              <v-col class="py-0" cols="5">
                <v-select class="my-0 elevation-0" v-model="menuSelect" label="Menus" :items="menus" item-text="name"
                          item-value="name"></v-select>
              </v-col>
            </v-row>
            <div class="d-flex justify-space-between">
            <v-col cols="9" class="pa-0 ma-0">
              <v-slide-group
                  show-arrows
                  v-model="catSelect"

              >
                <v-slide-item
                    v-for="category in categories"
                    :key="category.name"
                    v-slot="{ active, toggle }"
                    :value="category.name"
                >
                  <v-btn
                      class="mx-2"
                      :input-value="active"
                      active-class="teal lighten-1 white--text"
                      depressed
                      rounded
                      @click="toggle"
                  >
                    {{ category.name }}
                  </v-btn>
                </v-slide-item>
              </v-slide-group>
            </v-col>
            <v-divider vertical class="mr-10"></v-divider>
            <v-col cols="3" class="pa-0 ma-0 d-flex justify-end mt-n3 mb-2">
              <span class="mr-4 grey--text mt-4">
            Page {{ page }} / {{ numberOfPages }}
          </span>
              <v-btn fab color="teal lighten-1" dark class="mr-2" @click="formerPage">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn fab color="teal lighten-1" dark class="mr-2" @click="nextPage">
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn depressed icon></v-btn>
            </v-col>
            </div>
            <v-data-iterator
                :items="categoryFilteredItems"
                :search="search"
                :items-per-page="itemsPerPage"
                hide-default-footer
                :footer-props="{
            itemsPerPageOptions: itemsPerPageOptions,
            disableItemsPerPage: true,
          }"
                :page="page"
            >
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
                          <v-card height="118">
                            <v-img
                                :src="item.imageURL"
                                class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                max-height="118"
                                min-height="118"
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
              <template v-slot:footer></template>
            </v-data-iterator>

          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">

          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card min-height="600" class="d-flex flex-column justify-space-between">
          <div>
            <v-toolbar dense elevation="1">
              <span>Ticket</span>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
              <v-menu offset-y close-on-content-click>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-on="on" v-bind="attrs"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn
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
                      >Are you sure you want to clear the ticket?
                      </v-card-text
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
            <v-list dense>
              <v-virtual-scroll height="300" :items="receipt.items" item-height="50">
                <template v-slot:default="{ item }">
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.item.name }} x {{ item.count }}
                        <span class="float-right">
                  {{ item.priceTotal }}
                </span>
                      </v-list-item-title>
                      <v-list-item-subtitle v-if="item.variant != null">
                        {{ item.variant.name }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-if="item.variant == null">
                        standard
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                </template>
              </v-virtual-scroll>
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
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                  >Total
                    <span class="float-right">
                  {{ receipt.total }}
                </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list
            >
          </div>
          <v-card-actions class="card-actions">
            <v-row>
              <v-col class="mx-0">
                <v-btn color="teal lighten-1" block dark>SAVE</v-btn>
              </v-col>
              <v-col class="mx-0">
                <v-btn color="teal lighten-1" block dark>CHARGE</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SalesSummary',
  data: function () {
    return {
      clearTicketDialog: false,
      btnToggle: "",
      catSelect: "All",
      search: "",
      page: 1,
      itemsPerPage: 18,
      itemsPerPageOptions: [18, 36, 50, 100],
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
        {
          id: "17",
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
          id: "18",
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
          id: "19",
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
          id: "20",
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
          id: "21",
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
      menus: [
        {
          id: "1",
          name: "Standard",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: true
        },
        {
          id: "2",
          name: "Foodpanda",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: false
        },
        {
          id: "3",
          name: "Careem",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: false
        },
        {
          id: "4",
          name: "Uber",
          itemCount: 0,
          modifiedCount: 0,
          isDefault: false
        },
      ],
      menuSelect: {
        id: "2",
        name: "Foodpanda",
        itemCount: 0,
        modifiedCount: 0,
        isDefault: false
      }
    };
  },
  computed: {
    categoryFilteredItems: function () {
      return this.items.filter(
          (item) => this.catSelect == "All" || item.category == this.catSelect
      );
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  methods: {
    addToCart: function (addItem, addVariant = null) {
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
    clearTicket: function () {
      this.receipt = {
        items: [],
        discount: 0,
        tax: 0,
        total: 0,
      };
      this.clearTicketDialog = false;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
  },
}
</script>

<style scoped>
.item-card-footer {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>