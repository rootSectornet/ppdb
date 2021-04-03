/* eslint-disable no-console */
<script>
/**
 * Monthly-Earning component
 */
import Multiselect from "vue-multiselect";
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
        labels: ["Ujian Di Ikuti"]
      },
      // series: [200],
      trackBy: 'id',
      jenjangSelected : null

    };
  },
  components: {Multiselect },
  computed: {
    state() { return this.$store.getters['state/stateTest'] },
    jenjangs() { return this.$store.getters['jenjang/jenjangs'] },
    rataRata() { return this.$store.getters['tryout/rataRata'] },
    terendah() { return this.$store.getters['tryout/terendah'] },
    tertinggi() { return this.$store.getters['tryout/tertinggi'] },
    series() { return [this.$store.getters['tryout/totalDiikuti']] },
  },
  mounted(){
      this.$store.dispatch("jenjang/getJenjang")
  },
  methods:{
    start(){
      this.$store.commit("state/SET_STATE","RANGKING");
    },
    jenjangChange(e){
      // eslint-disable-next-line no-console
      this.$store.commit("tryout/SET_IDJENJANG",e.id)
      this.$store.dispatch("tryout/getHistory")
    },
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex flex-column justify-content-between mb-4">
          <h4 class="card-title ">Analisa Hasil Ujianmu</h4>
          <multiselect v-model="jenjangSelected"  @input="jenjangChange"  :options="jenjangs" :track-by="trackBy" label="jenjang">
              <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.jenjang }}</strong></template>
          </multiselect>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <p class="text-muted">Rata Rata nilaimu</p>
          <h3>{{rataRata}} </h3>
          <p class="text-muted">
            <span class="text-danger mr-2">
              {{terendah}}
              <i class="mdi mdi-arrow-down"></i>
            </span> Nilai Terendah
          </p>
          <p class="text-muted">
            <span class="text-success mr-2">
              {{tertinggi}}
              <i class="mdi mdi-arrow-up"></i>
            </span> Nilai Tertinggi
          </p>

          <div class="mt-4">
            <a href="javascript: void(0);" @click="start()" class="btn btn-primary btn-sm">
              <span>Mulai Test</span>
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