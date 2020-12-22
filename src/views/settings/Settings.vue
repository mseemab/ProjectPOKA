<template>
  <div class="ml-5">
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-title class="d-flex">
            <v-avatar size="60" color="blue-grey darken-1" class="mr-3">
              <v-icon dark size="35">mdi-cog</v-icon>
            </v-avatar>
            <div class="d-flex flex-column">
              <span>Settings</span>
              <span class="subtitle-1">System settings</span>
            </div>
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text class="mt-n4">
            <v-list class="mb-n3">
              <v-list-item-group v-model="menuSelected">
                <v-list-item v-for="item in settingsMenu" :value="item" :key="item.name">
                  {{ item.label }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="d-flex">
            <v-avatar size="60" color="blue-grey darken-1" class="mr-3">
              <v-icon dark size="35">mdi-store</v-icon>
            </v-avatar>
            <div class="d-flex flex-column">
              <span>Stores</span>
              <span class="subtitle-1">Store & POS settings</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-n4">
            <v-list>
              <v-list-item-group v-model="menuSelected">
                <v-list-item v-for="item in storeMenu" :value="item" :key="item.name">
                  {{ item.label }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>{{ menuSelected.label }}</v-card-title>
          <template v-if="menuSelected.name==='features'">
            <v-list>
              <v-list-item v-for="(item, index) in features" :key="index">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.label }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.hint }} <a href="#">Learn more.</a></v-list-item-subtitle>
                </v-list-item-content>
                <v-switch v-model="item.value"></v-switch>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions class="d-flex flex-row-reverse">
              <v-btn text color="success">SAVE</v-btn>
              <v-btn text>CANCEL</v-btn>
            </v-card-actions>
          </template>
          <template v-if="menuSelected.name==='paymentTypes'">

            <v-row class="ma-5">
              <v-dialog max-width="500" v-model="paymentAddDialog">
                <template v-slot:activator="{on, attrs}">
                  <v-btn color="teal lighten-2" dark small v-on="on" v-bind="attrs">
                    <v-icon>mdi-plus</v-icon>
                    Add payment type
                  </v-btn>
                </template>
                <v-card>

                  <v-card-title class="d-flex flex-column mb-5">
                    <v-avatar color="blue-grey darken-1" size="80" dark class="my-5">
                      <v-icon size="50" dark>mdi-credit-card-outline</v-icon>
                    </v-avatar>
                    Add payment type
                  </v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-select label="Payment Type" :items="paymentTypeOptions"
                                v-model="paymentTypeNew.value"></v-select>
                      <v-text-field label="Name" v-model="paymentTypeNew.name"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="d-flex flex-row-reverse">
                    <v-btn color="green" text @click="savePaymentType()">Save</v-btn>
                    <v-btn color="grey darken-2" text @click="paymentAddDialog=false">Cancel</v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>
              <v-btn small text color="grey darken-2" v-if="selectedPaymentTypes.length">
                <v-icon>mdi-delete</v-icon>
                Delete
              </v-btn>
            </v-row>
            <v-data-table show-select :headers="paymentTypeHeaders" :items="paymentTypes"
                          item-key="name" v-model="selectedPaymentTypes"></v-data-table>

          </template>
          <template v-if="menuSelected.name==='loyalty'">
            <v-card-text>
              <v-text-field readonly label="Loyalty type" v-model="loyalty.type"></v-text-field>
              <v-text-field v-model="loyalty.percent"
                            label="A percentage of the purchase amount to be credited to the points account of the customer"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-flex flex-row-reverse">
              <v-btn text color="success">SAVE</v-btn>
              <v-btn text>CANCEL</v-btn>
            </v-card-actions>
          </template>
          <template v-if="menuSelected.name==='taxes'">
            <v-row class="mx-2">
              <v-col cols="8">
                <v-dialog max-width="500" v-model="taxAddDialog">
                  <template v-slot:activator="{on, attrs}">
                    <v-btn color="teal lighten-2" dark small v-on="on" v-bind="attrs">
                      <v-icon>mdi-plus</v-icon>
                      Add tax
                    </v-btn>
                  </template>
                  <v-card>

                    <v-card-title class="d-flex flex-column mb-5">
                      <v-avatar color="blue-grey darken-1" size="80" dark class="my-5">
                        <v-icon size="50" dark>mdi-bank</v-icon>
                      </v-avatar>
                      Add tax
                    </v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-row>
                          <v-col cols="8" class="mx-0 pl-0">
                            <v-text-field label="Name" v-model="taxAddNew.name"></v-text-field>
                          </v-col>
                          <v-col cols="4" class="mx-0 pr-0 ">
                            <v-text-field label="Tax rate %" v-model="taxAddNew.taxRate"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-select label="Type" :items="taxTypes" item-text="label" item-value="value"
                                    v-model="taxAddNew.type"></v-select>
                        </v-row>
                        <v-row>
                          <v-select label="Option" :items="taxOptions" item-text="label" item-value="value"
                                    v-model="taxAddNew.option"></v-select>
                        </v-row>

                      </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex flex-row-reverse">
                      <v-btn color="green" text @click="saveTax()">Save</v-btn>
                      <v-btn color="grey darken-2" text @click="taxAddDialog=false">Cancel</v-btn>
                    </v-card-actions>

                  </v-card>
                </v-dialog>
                <v-btn small text color="grey darken-2" v-if="selectedTaxes.length">
                  <v-icon>mdi-delete</v-icon>
                  Delete
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-select v-model="taxStore" :items="stores" class="pa-0 ma-0" item-value="name"
                          item-text="name"></v-select>
              </v-col>
            </v-row>
            <v-data-table show-select :headers="taxHeaders" :items="taxes"
                          item-key="name" v-model="selectedTaxes"></v-data-table>
          </template>
          <template v-if="menuSelected.name==='receipts'">
            <v-card-text>
              <v-row>
                <v-col cols="8"></v-col>
                <v-col cols="4">
                  <v-select :items="stores" v-model="receiptStore" item-value="name" item-text="name"></v-select>
                </v-col>
              </v-row>
              <h3 class="ml-1">Logo</h3>
              <v-row>
                <v-col cols="3" class="d-flex flex-column align-center">
                  <span>Printed Receipt</span>
                  <v-img :src="selectedFile" max-width="100" max-height="100"></v-img>
                  <v-btn small @click="imageUploaderClick()">Upload</v-btn>
                </v-col>
                <v-col cols="3" class="d-flex flex-column align-center">
                  <span>Emailed Receipt</span>
                  <v-img :src="selectedFile" max-width="100" max-height="100"></v-img>
                  <v-btn small @click="imageUploaderClick()">Upload</v-btn>
                  <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      accept="image/*"
                      @change="onFileChanged"
                  >
                </v-col>
              </v-row>
              <v-text-field label="Header"></v-text-field>
              <v-text-field label="Footer"></v-text-field>
              <v-row>
                <v-col>Show customer info</v-col>
                <v-col>
                  <v-switch class="float-right ma-0 "></v-switch>
                </v-col>
              </v-row>
              <v-row>
                <v-col>Show comments</v-col>
                <v-col>
                  <v-switch class="float-right ma-0 "></v-switch>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-flex flex-row-reverse">
              <v-btn text color="success">SAVE</v-btn>
              <v-btn text>CANCEL</v-btn>
            </v-card-actions>
          </template>
          <template v-if="menuSelected.name==='diningOptions'">
            <v-row class="mx-2">
              <v-col cols="8">
                <v-dialog max-width="500" v-model="dineAddDialog">
                  <template v-slot:activator="{on, attrs}">
                    <v-btn color="teal lighten-2" dark small v-on="on" v-bind="attrs">
                      <v-icon>mdi-plus</v-icon>
                      Add dining option
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="d-flex flex-column mb-5">
                      <v-avatar color="blue-grey darken-1" size="80" dark class="my-5">
                        <v-icon size="50" dark>mdi-silverware</v-icon>
                      </v-avatar>
                      Add tax
                    </v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-row>
                          <v-text-field label="Name" v-model="diningOptionsNew.name"></v-text-field>
                        </v-row>
                        <v-row>
                          <v-select multiple label="Stores" v-model="diningOptionsNew.stores"
                                    :items="stores" item-value="name" item-text="name"></v-select>
                        </v-row>
                        <v-row>
                          <v-checkbox label="Default dining option" persistent-hint
                                      hint="This will reset current default option"
                                      v-model="diningOptionsNew.default"></v-checkbox>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex flex-row-reverse">
                      <v-btn color="green" text @click="saveDineOption()">Save</v-btn>
                      <v-btn color="grey darken-2" text @click="dineAddDialog=false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn small text color="grey darken-2" v-if="selectedDiningOptions.length">
                  <v-icon>mdi-delete</v-icon>
                  Delete
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-select v-model="taxStore" :items="stores" class="pa-0 ma-0" item-value="name"
                          item-text="name"></v-select>
              </v-col>
            </v-row>
            <v-data-table show-select :headers="diningHeaders" :items="diningOptions"
                          item-key="name" v-model="selectedDiningOptions"></v-data-table>
          </template>
          <template v-if="menuSelected.name==='stores'">
            <v-row class="mx-2">
              <v-col cols="8">
                <v-dialog max-width="500" v-model="storeAddDialog">
                  <template v-slot:activator="{on, attrs}">
                    <v-btn color="teal lighten-2" dark small v-on="on" v-bind="attrs">
                      <v-icon>mdi-plus</v-icon>
                      Add store
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="d-flex flex-column mb-5">
                      <v-avatar color="blue-grey darken-1" size="80" dark class="my-5">
                        <v-icon size="50" dark>mdi-store</v-icon>
                      </v-avatar>
                      Add store
                    </v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-row>
                          <v-text-field label="Name" v-model="storeNew.name"></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field label="Address" v-model="storeNew.address"></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field label="Phone" v-model="storeNew.phone"></v-text-field>
                        </v-row>
                        <v-row>
                          <v-text-field label="Description" v-model="storeNew.description"></v-text-field>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex flex-row-reverse">
                      <v-btn color="green" text @click="saveStore()">Save</v-btn>
                      <v-btn color="grey darken-2" text @click="storeAddDialog=false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn small text color="grey darken-2" v-if="selectedStores.length">
                  <v-icon>mdi-delete</v-icon>
                  Delete
                </v-btn>
              </v-col>
              <v-col cols="4">
              </v-col>
            </v-row>
            <v-data-table show-select :headers="storeHeaders" :items="stores"
                          item-key="name" v-model="selectedStores"></v-data-table>
          </template>
          <template v-if="menuSelected.name==='POSDevices'">
            <v-row class="mx-2">
              <v-col cols="8">
                <v-dialog max-width="500" v-model="POSAddDialog">
                  <template v-slot:activator="{on, attrs}">
                    <v-btn color="teal lighten-2" dark small v-on="on" v-bind="attrs">
                      <v-icon>mdi-plus</v-icon>
                      Add POS device
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="d-flex flex-column mb-5">
                      <v-avatar color="blue-grey darken-1" size="80" dark class="my-5">
                        <v-icon size="50" dark>mdi-tablet-cellphone</v-icon>
                      </v-avatar>
                      Add POS device
                    </v-card-title>
                    <v-card-text>
                      <v-form>
                        <v-row>
                          <v-text-field label="Name" v-model="POSNew.name"></v-text-field>
                        </v-row>
                        <v-row>
                          <v-select label="Store" v-model="POSNew.store" :items="stores" item-text="name" return-object></v-select>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex flex-row-reverse">
                      <v-btn color="green" text @click="savePOS()">Save</v-btn>
                      <v-btn color="grey darken-2" text @click="POSAddDialog=false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn small text color="grey darken-2" v-if="selectedPOSDevices.length">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-select :items="stores" item-text="name" class="pa-0 ma-0"></v-select>
              </v-col>
            </v-row>
            <v-data-table show-select :headers="POSHeaders" :items="POSDevices"
                          item-key="name" v-model="selectedPOSDevices"></v-data-table>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "settings",
  data: function () {
    return {
      menuSelected: {name: 'features', label: 'Features'},
      settingsMenu: [
        {name: 'features', label: 'Features'},
        {name: 'paymentTypes', label: 'Payment types'},
        {name: 'loyalty', label: 'Loyalty'},
        {name: 'taxes', label: 'Taxes'},
        {name: 'receipts', label: 'Receipts'},
        {name: 'diningOptions', label: 'Dining options'},
      ],
      storeMenu: [
        {name: 'stores', label: 'Stores'},
        {name: 'POSDevices', label: 'POS devices'}
      ],
      features: {
        shifts: {
          value: false,
          label: 'Shifts',
          hint: 'Track cash that goes in and out of your drawer.',
          icon: 'mdi-clock-outline'
        },
        timeClock: {
          value: false,
          label: 'Time clock',
          hint: 'Track employees’ clock in/out time and calculate their total work hours.',
          icon: 'mdi-timer-outline'
        },
        openTickets: {
          value: false,
          label: 'Open tickets',
          hint: 'Allow to save and edit orders before completing a payment.',
          icon: 'mdi-receipt'
        },
        kitchenPrinters: {
          value: false,
          label: 'Kitchen printers',
          hint: 'Send orders to kitchen printer or display.',
          icon: 'mdi-printer'
        },
        customerDisplays: {
          value: false,
          label: 'Customer displays',
          hint: 'Display order information to customers at the time of purchase.',
          icon: 'mdi-monitor-screenshot'
        },
        diningOptions: {
          value: false,
          label: 'Dining options',
          hint: 'Mark orders as dine in, takeout or for delivery.',
          icon: 'mdi-silverware'
        },
        lowStockNotify: {
          value: false,
          label: 'Low stock notifications',
          hint: 'Get daily email on items that are low or out of stock.',
          icon: 'mdi-email-alert-outline'
        },
        negativeStockAlerts: {
          value: false,
          label: 'Negative stock alerts',
          hint: 'Warn cashiers attempting to sell more inventory than available in stock.',
          icon: 'mdi-message-alert-outline'
        },
        weightEmbedBarcodes: {
          value: false,
          label: 'Weight embedded barcodes',
          hint: 'Allow to scan barcodes with embedded weight.',
          icon: 'mdi-barcode'
        },
      },
      selectedPaymentTypes: [],
      paymentTypeHeaders: [{text: 'Name', value: 'name'}],
      paymentTypeOptions: ['card', 'cash', 'check'],
      paymentTypes: [{
        name: 'Cash',
        type: 'cash'
      },
        {
          name: 'Card',
          value: 'card'
        },
      ],
      paymentTypeNew: {
        name: '',
        value: '',
      },
      paymentAddDialog: false,
      taxAddDialog: false,
      taxHeaders: [
        {text: 'Name', value: 'name'},
        {text: 'Apply to new items', value: 'applyToNew'},
        {text: 'Tax rate', value: 'taxRate'},
      ],
      taxes: [
        {name: 'some tax', applyToNew: 'Yes', taxRate: '10%'},
        {name: 'some other tax', applyToNew: 'No', taxRate: '15%'},
      ],
      selectedTaxes: [],
      stores: [
        {name: 'Store 1', address: '', phone: '', description: '', POSCount: 0},
        {name: 'Store 2', address: '', phone: '', description: '', POSCount: 0},
        {name: 'Store 3', address: '', phone: '', description: '', POSCount: 0},

      ],
      taxStore: 'All stores',
      taxTypes: [{value: 'addToPrice', label: 'Added to the price'}, {
        value: 'includeInPrice',
        label: 'Included in the price'
      }],
      taxOptions: [{value: "applyToNew", label: 'Apply the tax to new items'},
        {value: 'applyToExisting', label: 'Apply the tax to existing items'},
        {value: 'applyToAll', label: 'Apply the tax to all new and existing items'}],
      taxAddNew: {
        name: "",
        taxRate: "",
        applyToNew: "",
        option: "applyToNew",
        type: "addToPrice",
      },
      loyalty: {
        type: "Bonus system",
        percent: "0.00"
      },
      receiptStore: 'first store',
      selectedFile: "https://i.pinimg.com/originals/44/9a/0f/449a0f2657382bfd81230602b60ea372.jpg",
      diningOptionsNew: {name: "", stores: [], default: false},
      diningHeaders: [
        {text: 'Name', value: 'name'},
        {text: 'Stores', value: 'stores'},
        {text: 'Default Option', value: 'default'},
      ],
      diningOptions: [
        {name: "Dine In", stores: ['All stores', 'first store', 'second store'], default: true},
        {name: "Delivery", stores: ['All stores', 'first store', 'second store'], default: false},
        {name: "Take Away", stores: ['All stores', 'first store', 'second store'], default: false},
      ],
      selectedDiningOptions: [],
      dineAddDialog: false,
      storeAddDialog: false,
      storeNew: {name: '', address: '', phone: '', description: '', POSCount: 0},
      storeHeaders: [
          {text: 'Name', value: 'name'},
          {text: 'Address', value: 'address'},
          {text: 'Number of POS', value: 'POSCount'},
      ],
      selectedStores: [],
      POSHeaders: [
          {text: 'Name', value: 'name'},
          {text: 'Store', value: 'store.name'},
          {text: 'Status', value: 'status'},
      ],
      POSDevices: [
          {name: "POS 1", store: {name: 'Store 1', address: '', phone: '', description: '', POSCount: 0}, status: "Activated"},
          {name: "POS 2", store: {name: 'Store 2', address: '', phone: '', description: '', POSCount: 0}, status: "Activated"}
          ],
      selectedPOSDevices: [],
      POSNew: {name: "", store: {}, status: "Not activated"},
      POSAddDialog: false,

    }
  },
  methods: {
    savePaymentType() {
      this.paymentTypes.push(this.paymentTypeNew)
      this.paymentTypeNew = {
        name: '',
        value: '',
      }
      this.paymentAddDialog = false
    },
    saveTax() {
      if (this.taxAddNew.option == 'applyToNew' || this.taxAddNew.option == 'applyToAll') {
        this.taxAddNew.applyToNew = 'Yes'
      } else {
        this.taxAddNew.applyToNew = 'No'
      }
      this.taxAddNew.taxRate = this.taxAddNew.taxRate + "%"
      this.taxes.push(this.taxAddNew)
      this.taxAddNew = {
        name: "",
        taxRate: "",
        applyToNew: "",
        option: "applyToNew",
        type: "addToPrice",
      }
      this.taxAddDialog = false

    },
    imageUploaderClick: function () {
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      let reader = new FileReader()
      let self = this
      reader.onload = function (event) {
        self.selectedFile = event.target.result
      }
      reader.readAsDataURL(e.target.files[0])
    },
    saveDineOption() {
      if (this.diningOptionsNew.default) {
        this.diningOptions.forEach((item) => {
          item.default = false
        })
      }
      this.diningOptions.push(this.diningOptionsNew)
      this.diningOptionsNew = {name: "", stores: [], default: false}
      this.dineAddDialog = false
    },
    saveStore() {
      this.stores.push(this.storeNew)
      this.storeNew = {name: '', address: '', phone: '', description: '', POSCount: 0}
      this.storeAddDialog = false
    },
    savePOS() {
      this.POSDevices.push(this.POSNew)
      this.POSNew = {name: "", store: {}, status: "Not activated"}
      this.POSAddDialog = false
    }
  }
}

</script>