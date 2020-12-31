<template>
    <div class="col-lg-10 col-sm-12 body-font">
        <div class="box ma-2">
            <v-row class="border-bottom-stats" no-gutters>
                <v-col cols="col-auto" class="text-center">
                    <v-card class="mx-auto bg-custom" data-type="gross-sales" v-on:click="updateChartData" v-bind:class="{ 'active-box' : activeBox === 'gross-sales'}">
                        <v-card-text class="justify-center">
                            <div>Gross sales</div>
                            <p class="display-1 text--primary mb-0">
                                0
                            </p>
                            <p class="mb-0">0 (0%)</p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="col-auto" class="text-center">
                    <v-card class="mx-auto bg-custom" data-type="refunds" v-on:click="updateChartData" v-bind:class="{ 'active-box' : activeBox === 'refunds'}">
                        <v-card-text>
                            <div>Refunds</div>
                            <p class="display-1 text--primary mb-0">
                                0
                            </p>
                            <p class="mb-0">0 (0%)</p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="col-auto" class="text-center">
                    <v-card class="mx-auto bg-custom" data-type="discounts" v-on:click="updateChartData" v-bind:class="{ 'active-box' : activeBox === 'discounts'}">
                        <v-card-text>
                            <div>Discounts</div>
                            <p class="display-1 text--primary mb-0">
                                0
                            </p>
                            <p class="mb-0">0 (0%)</p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="col-auto" class="text-center">
                    <v-card class="mx-auto bg-custom" data-type="net-sales" v-on:click="updateChartData" v-bind:class="{ 'active-box' : activeBox === 'net-sales'}">
                        <v-card-text>
                            <div>Net sales</div>
                            <p class="display-1 text--primary mb-0">
                                0
                            </p>
                            <p class="mb-0">0 (0%)</p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="col-auto" class="text-center">
                    <v-card class="mx-auto bg-custom" data-type="gross-profit" v-on:click="updateChartData" v-bind:class="{ 'active-box' : activeBox === 'gross-profit'}">
                        <v-card-text>
                            <div>Gross Profit</div>
                            <p class="display-1 text--primary mb-0">
                                0
                            </p>
                            <p class="mb-0">0 (0%)</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="mx-0">
                <ul class="chart-panel">
                    <li class="chart-title">
                        <span class="chart-panel-text"> Chart Title</span>
                    </li>
                    <li class="chart-type">
                        <v-select
                                class="mb-0"
                                v-model="graphType"
                                :items="items"
                                item-text="type"
                                item-value="type"
                                label="Graph Type"
                                persistent-hint
                                return-object
                                single-line
                                v-on:change="updateChartData"
                        ></v-select>
                    </li>
                    <li class="chart-group-by">
                        <v-select
                                class="mb-0"
                                v-model="graphFrequency"
                                :items="frequencyOptions"
                                item-text="type"
                                item-value="type"
                                label="Graph Frequency"
                                persistent-hint
                                return-object
                                single-line
                        ></v-select>
                    </li>
                </ul>
            </v-row>
            <v-row v-if="graphType.type == 'Bar'">
                <div class="col-12">
                    <bar-chart :chart-data="chartData" class="mx-2"></bar-chart>
                </div>
            </v-row>
            <v-row v-else>
                <div class="col-12">
                    <line-chart :chart-data="chartData" class="mx-2"></line-chart>
                </div>
            </v-row>
        </div>
    </div>
</template>

<script>
    import BarChart from "../../components/BarChart";
    import LineChart from "../../components/LineChart";

    export default {
        name: 'SalesSummary',
        components: {
            BarChart,
            LineChart
        },
        data: () => ({
            activeBox : 'gross-sales',
            graphType : {type: 'Bar'},
            items: [
                {type: 'Bar'},
                {type: 'Area'}
            ],
            graphFrequency: {type: 'Days'},
            frequencyOptions: [
                {type: 'Days'},
                {type: 'Weeks'},
                {type: 'Months'}
            ],
            chartData: {},
        }),
        methods: {
            updateChartData: function (e = null) {
                let chartType = 'gross-sales';
                if (e && e.currentTarget && e.currentTarget.hasAttribute('data-type')) {
                    chartType = e.currentTarget.getAttribute('data-type');
                }
                // Get Data Set Object with basic chart properties set
                let dataSet = this.getChartDataSetObject();
                // Get chart data and labels
                let dataAndLabels = this.getChartData(chartType);
                dataSet['data'] = dataAndLabels.data;
                // Setting default object
                let chartData = {
                    labels : dataAndLabels.labels,
                    datasets: [dataSet]
                }
                // Check and provide specific data-set and labels

                this.chartData = chartData;
            },
            getChartDataSetObject: function () {
                let dataSet = {};
                // Check graph type and fill props accordingly
                if (this.graphType.type === 'Bar') {
                    dataSet['backgroundColor'] = '#8bc34a';
                } else {
                    dataSet['backgroundColor'] = "rgba(241, 248, 233, 0.5)";
                    dataSet['pointBackgroundColor'] = "rgba(0, 0, 0, 0.1)";
                    dataSet['fillBackgroundColor'] = 'rgba(241, 248, 233, 0.8)';
                    dataSet['radius'] = 4;
                    dataSet['pointRadius'] = 4;
                    dataSet['fill'] = 'origin';
                }

                return dataSet;
            },
            getChartData: function (chartType) {
                // Change clicked card
                this.activeBox = chartType;
                // All Data from API will be gathered here
                // Setting default data
                let dataAndLabels = {
                    data: ["NOV 22", "NOV 23", "NOV 24", "NOV 25"],
                    labels: [2000, 1500, 1000, 500]
                }

                // Changing only data for now, setting labels as static
                dataAndLabels.labels = ["NOV 22", "NOV 23", "NOV 24", "NOV 25", "NOV 26", "NOV 27", "NOV 28", "NOV 29", "NOV 30",
                    "DEC 01", "DEC 02", "DEC 03", "DEC 04", "DEC 05", "DEC 06", "DEC 07", "DEC 08", "DEC 09",
                    "DEC 10", "DEC 11", "DEC 12", "DEC 13", "DEC 14", "DEC 15", "DEC 16", "DEC 17", "DEC 18",
                    "DEC 19", "DEC 20", "DEC 21", "DEC 22", "DEC 23"];

                if (chartType === 'gross-sales') {
                    dataAndLabels.data = [2478, 5267, 734, 784, 433, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 6000, 3500, 2000];
                } else if (chartType === 'refunds') {
                    dataAndLabels.data = [0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0];
                } else if (chartType === 'discounts') {
                    dataAndLabels.data = [0, 0, 100, 0, 0, 300, 50, 0, 0, 0, 0, 600, 0, 0, 0, 0, 250, 450];
                } else if (chartType === 'net-sales') {
                    dataAndLabels.data = [0, 500, 0, 0, 5000, 0, 0, 3500, 0, 0, 0, 0, 0, 0, 2500, 0, 0, 2000];
                } else if (chartType === 'gross-profit') {
                    dataAndLabels.data = [0, 200, 0, 0, 1000, 0, 0, 1500, 0, 0, 0, 0, 0, 0, 500, 0, 0, 700];
                }

                return dataAndLabels;
            }
        }, mounted() {
            this.updateChartData();
        }
    }
</script>
<style scoped>
    div.body-font {
        font-family: Roboto, 'Helvetica Neue', sans-serif;
        color: rgba(0,0,0,0.87);
    }

    div.box {
        background-color: #f2f2f2;
    }

    .bg-custom {
        background-color: inherit !important;
        border: unset !important;
        border-radius: unset !important;
        box-shadow: unset !important;
    }

    .border-bottom-stats {
        border-bottom: 1px solid #EAEAEA;
        border-bottom-color: rgb(234, 234, 234);
    }

    .active-box {
        border-bottom: 2px solid green !important;
    }

    ul.chart-panel {
        width: 100%;
    }

    >>>.v-input__slot {
        margin-bottom: 0px !important;
    }

    ul.chart-panel li {
        list-style-type: none;
        display: inline-block;
    }

    ul.chart-panel .chart-title {
        text-align: left;
        width: 120px;
        transform: translateY(60%);
    }

    ul.chart-panel .chart-type,
    ul.chart-panel .chart-group-by {
        float: right;
        margin-right: 15px;
    }

    ul.chart-panel .chart-panel-text {
        font-size: 16px;
        line-height: 28px;
        vertical-align: baseline;
    }
</style>