<template>
  <v-card max-width="900" class="ml-5">
    <v-card-text>
      <v-form class="mx-3">
        <v-row>
          <v-text-field label="Name"></v-text-field>
        </v-row>
        <v-row>
          <v-checkbox label="Set as default" hint="This will reset the defaults on other menus"
                      persistent-hint></v-checkbox>
        </v-row>
      </v-form>
      <v-divider class="mt-5"></v-divider>
      <div class="mt-8">
        <h4>Menu items</h4>
        <p class="caption">All the current items are added by default. You can delete or modify the selling price/ name
          of these items</p>
        <v-row>
          <v-col cols="6">
            <v-text-field prepend-inner-icon="mdi-magnify" label="Search" v-model="search"></v-text-field>
          </v-col>
          <v-col>
            <v-select label="Name" :items="nameFilter" v-model="nameSelected"></v-select>
          </v-col>
          <v-col>
            <v-select label="Price" :items="priceFilter" v-model="priceSelected"></v-select>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table
            :items="menu.items"
            item-key="id"
            show-select
            :search="search"
            :headers="headers"
        >
          <template v-slot:item.modName="props">
            <v-edit-dialog
                :return-value.sync="props.item.modName"
            >
              {{ props.item.modName }}
              <template v-slot:input>
                <v-text-field
                    v-model="props.item.modName"
                    label="Edit"
                    single-line
                    counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.modPrice="props">
            <v-edit-dialog
                :return-value.sync="props.item.modPrice"
            >
              {{ props.item.modPrice }}
              <template v-slot:input>
                <v-text-field
                    v-model="props.item.modPrice"
                    label="Edit"
                    single-line
                    counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
                size="20"
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">

      <v-btn text color="grey darken-2" link :to="{ name: 'menus' }">Cancel</v-btn>
      <v-btn text color="green" link :to="{ name: 'menus' }">Save</v-btn>
    </v-card-actions>


  </v-card>
</template>

<script>
export default {
  name: 'MenusNew',
  data: function () {
    return {
      nameFilter: ['Show all', 'Show modified names', 'Show original names'],
      priceFilter: ['Show all', 'Show modified price', 'Show original price'],
      nameSelected: 'Show all',
      priceSelected: 'Show all',
      items: [
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
      menu: {
        name: "",
        isDefault: false,
        items: []
      },
      headers: [
        {text: 'Item name', value: 'item.name'},
        {text: 'Price', value: 'item.price'},
        {text: 'Item category', value: 'item.category'},
        {text: 'Name in menu', value: 'modName', filter: (val, search, item) => {
            if (this.nameSelected === "Show modified names") {
              return item.modName !== item.item.name
            } else if (this.nameSelected === "Show original names") {
              return item.modName === item.item.name
            }
            return true
          }},
        {text: 'Price in menu', value: 'modPrice', filter: (val, search, item) => {
            if (this.priceSelected === "Show modified price") {
              return item.modPrice !== item.item.price
            } else if (this.priceSelected === "Show original price") {
              return item.modPrice === item.item.price
            }
            return true
          }},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      search: "",
      dialogDelete: false,
      editIndex: null
    }
  },
  methods: {
    deleteItem (item) {
      console.log('button clicked')
      this.editIndex = this.menu.items.indexOf(item)
      this.dialogDelete = true
    },
    deleteItemConfirm (){
      this.menu.items.splice(this.editIndex, 1)
      this.dialogDelete = false
    }
  },
  created() {
    this.menu.items = [
      {id: '1', item: this.items[0], modName: this.items[0].name, modPrice: this.items[0].price},
      {id: '2', item: this.items[1], modName: this.items[1].name, modPrice: this.items[1].price},
      {id: '3', item: this.items[2], modName: this.items[2].name, modPrice: this.items[2].price},
      {id: '4', item: this.items[3], modName: this.items[3].name, modPrice: this.items[3].price},
      {id: '5', item: this.items[4], modName: this.items[4].name, modPrice: this.items[4].price},
    ]
  }
}
</script>