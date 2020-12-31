<template>
  <v-card max-width="700" class="ml-5">
    <v-card-text>
      <v-form class="mx-3">
        <v-row>
          <v-text-field label="Name" v-model="deal.name"></v-text-field>
        </v-row>
        <v-row>
          <v-checkbox label="Deal is active" hint="Inactive deals don't show up in menu" v-model="deal.isActive"
                      persistent-hint></v-checkbox>
        </v-row>

      <v-divider class="mt-5"></v-divider>
      <div class="mt-8">
        <h4>Deal items</h4>
        <v-data-table
            :items="deal.items"
            item-key="id"
            :search="search"
            :headers="headers"
            hide-default-footer
        >
          <template v-slot:item.itemCount="props">
            <v-text-field
                v-model="props.item.itemCount"
                single-line></v-text-field>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
                size="20"
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:footer>
            <v-autocomplete :items="items" v-model="selectedItem" clearable :key="selectedItem" item-text="name"
                            return-object @change="addItem()" label="Select Item"></v-autocomplete>
          </template>
        </v-data-table>
      </div>
      <v-row>
        <v-col>
        <v-text-field v-model="selectedItemsPrice" label="Selected items price in menu" disabled></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="deal.dealPrice" label="Deal price"></v-text-field>
        </v-col>
      </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-end">

      <v-btn text color="grey darken-2" :to="{ name: 'deals' }">Cancel</v-btn>
      <v-btn text color="green" :to="{ name: 'deals' }">Save</v-btn>
    </v-card-actions>


  </v-card>
</template>

<script>
export default {
  name: 'DealsNew',
  data: function () {
    return {

      selectedItem: null,
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
      deal: {
        name: "",
        isActive: false,
        items: [],
        dealPrice: 0,
        itemsPrice: 0,
      },
      headers: [
        {text: 'Item name', value: 'item.name'},
        {text: 'Price', value: 'item.price'},
        {text: 'Item category', value: 'item.category'},
        {text: 'Qty', value: 'itemCount'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      search: "",
      dialogDelete: false,
      editIndex: null
    }
  },
  methods: {
    deleteItem(item) {
      this.editIndex = this.deal.items.indexOf(item)
      this.deal.items.splice(this.editIndex, 1)
    },
    addItem() {
      if (this.selectedItem) {
        this.deal.items.push({
          item: this.selectedItem,
          itemCount: 1,
          price: this.selectedItem.price
        })
        this.selectedItem = null
      }
    }
  },
  computed: {
    selectedItemsPrice (){
      let selectedItemsPrices = 0
      this.deal.items.forEach((item) => {
        selectedItemsPrices += item.item.price * item.itemCount
        item.itemsPrice = item.item.price * item.itemCount
      })
      return selectedItemsPrices
    },
  },
  created() {
  }
}
</script>