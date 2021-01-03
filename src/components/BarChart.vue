<script>
    import { Bar, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    export default {
        extends: Bar,
        mixins: [reactiveProp],
        props: {
            chartData: {
                type: Object,
                required: true,
            }
        },
        data: () => ({
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }]
                },
                legend: {
                    display: false
                },
            }
        }),
        mounted () {
            this.renderChart(this.chartData, this.options)
        },
    }
</script>