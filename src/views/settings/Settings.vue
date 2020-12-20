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
              <v-btn color="teal lighten-2" dark small v-on="on" v-bind="attrs"><v-icon>mdi-plus</v-icon> Add payment type</v-btn>
                </template>
                <v-card>

                  <v-card-title class="d-flex flex-column mb-5">
                    <v-avatar color="blue-grey darken-1" size="80" dark class="my-5"><v-icon size="50" dark>mdi-credit-card-outline</v-icon></v-avatar>
                    Add payment type</v-card-title>
                  <v-card-text>
                  <v-form>
                    <v-select label="Payment Type" :items="paymentTypeOptions" v-model="paymentTypeNew.value"></v-select>
                    <v-text-field label="Name" v-model="paymentTypeNew.name"></v-text-field>
                  </v-form>
                  </v-card-text>
                  <v-card-actions class="d-flex flex-row-reverse">
                    <v-btn color="green" text @click="savePaymentType()">Save</v-btn>
                    <v-btn color="grey darken-2" text @click="paymentAddDialog=false">Cancel</v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>
              <v-btn small text color="grey darken-2" v-if="selectedPaymentTypes.length"><v-icon>mdi-delete</v-icon> Delete</v-btn>
            </v-row>
            <v-data-table show-select :headers="paymentTypeHeaders" :items="paymentTypes"
                          item-key="name" v-model="selectedPaymentTypes"></v-data-table>

          </template>
          <template v-if="menuSelected.name==='loyalty'">
            <v-card-text>
            <v-text-field readonly label="Loyalty type" v-model="loyalty.type"></v-text-field>
            <v-text-field v-model="loyalty.percent" label="A percentage of the purchase amount to be credited to the points account of the customer"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-flex flex-row-reverse">
              <v-btn text color="success">SAVE</v-btn>
              <v-btn text>CANCEL</v-btn>
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data: function () {
    return {
      menuSelected: {name: 'paymentTypes', label: 'Payment types'},
      settingsMenu: [
        {name: 'features', label: 'Features'},
        {name: 'billings', label: 'Billing & subscriptions'},
        {name: 'paymentTypes', label: 'Payment types'},
        {name: 'loyalty', label: 'Loyalty'},
        {name: 'taxes', label: 'Taxes'},
        {name: 'receipt', label: 'Receipt'},
        {name: 'openTickets', label: 'Open tickets'},
        {name: 'kitchenPrinters', label: 'Kitchen Printers'},
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
      loyalty: {
        type: "Bonus system",
        percent: "0.00"
      }
    }
  },
  methods: {
    savePaymentType: function (){
      this.paymentTypes.push(this.paymentTypeNew)
      this.paymentTypeNew = {
        name: '',
        value: '',
      }
      this.paymentAddDialog = false
    }
  }
}

</script>