/* eslint-disable no-console */
<script>
/**
 * Monthly-Earning component
 */
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "13px",
                color: undefined,
                offsetY: 60
              },
              value: {
                offsetY: 22,
                fontSize: "16px",
                color: undefined,
                formatter: function(val) {
                  return val ;
                }
              }
            }
          }
        },
        colors: ["#556ee6"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
          }
        },
        stroke: {
          dashArray: 4
        },
        labels: ["Total Kursi"]
      },
      series: [200]
    };
  },
  computed: {
    state() { return this.$store.getters['state/stateTest'] }
  },
  methods:{
    start(){
      if(this.state == "RANGKING"){
         this.$store.commit("state/SET_STATE","INTRO");
      }else{
         this.$store.commit("state/SET_STATE","RANGKING");
      }
    }
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">Hasil Test</h4>
      <div class="row">
        <div class="col-sm-6">
          <p class="text-muted">Sisa Kuota Kursi</p>
          <h3>79 </h3>
          <p class="text-muted">
            <span class="text-danger mr-2">
              60.5
              <i class="mdi mdi-arrow-down"></i>
            </span> Nilai Terendah
          </p>
          <p class="text-muted">
            <span class="text-success mr-2">
              95.4
              <i class="mdi mdi-arrow-up"></i>
            </span> Nilai Tertinggi
          </p>

          <div class="mt-4">
            <a href="javascript: void(0);" @click="start()" class="btn btn-primary btn-sm">
              <span v-if="this.state == 'RANGKING'">Mulai Test</span>
              <span v-else>Lihat Peringkat</span>
              <i class="mdi mdi-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
        <div class="col-sm-6">
          <!-- Chart -->
          <apexchart
            class="apex-charts"
            type="radialBar"
            height="250"
            dir="ltr"
            :series="series"
            :options="chartOptions"
          ></apexchart>
        </div>
      </div>
      <p  v-if="this.state == 'RANGKING'" class="text-muted mb-0">Mulai test dan dapatkan nilai terbaikmu.</p>
    </div>
  </div>
</template>