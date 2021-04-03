<script>
import Layout from "../layouts/main";
import appConfig from "@/app.config";

import Profile from "@/components/widgets/profile";
import Intro from "@/router/views/ujian/intro";
import Matpel from "@/router/views/ujian/matpel";
import Soal from "@/router/views/ujian/soal";
import ChoosePembayaran from "@/router/views/ujian/choosePembayaran";
import parsingGrade from "@/router/views/ujian/parsingGrade";
import Pembahasan from "@/router/views/ujian/pembasahan";
import Earning from "@/components/widgets/earning";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Dashboard",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, Profile, Earning,Intro,Matpel,Soal,ChoosePembayaran,parsingGrade,Pembahasan },
  data() {
    return {
      title: "Dashboard",
      slide: 0,
      statData: [
        {
          icon: "bx bx-copy-alt",
          title: "Orders",
          value: "1,235"
        },
        {
          icon: "bx bx-archive-in",
          title: "Revenue",
          value: "$35, 723"
        },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "Average Price",
          value: "$16.2"
        }
      ],
      transactions: [
        {
          id: "#SK2540",
          name: "Neal Matthews",
          date: "07 Oct, 2019",
          total: "$400",
          status: "Paid",
          payment: ["fa-cc-mastercard", "Mastercard"],
          index: 1
        },
        {
          id: "#SK2541",
          name: "Jamal Burnett",
          date: "07 Oct, 2019",
          total: "$380",
          status: "Chargeback",
          payment: ["fa-cc-visa", "Visa"],
          index: 2
        },
        {
          id: "#SK2542",
          name: "Juan Mitchell",
          date: "06 Oct, 2019",
          total: "$384",
          status: "Paid",
          payment: ["fab fa-cc-paypal", "Paypal"],
          index: 3
        },
        {
          id: "#SK2543",
          name: "Barry Dick",
          date: "05 Oct, 2019",
          total: "$412",
          status: "Paid",
          payment: ["fa-cc-mastercard", "Mastercard"],
          index: 4
        },
        {
          id: "#SK2544",
          name: "Ronald Taylor",
          date: "04 Oct, 2019",
          total: "$404",
          status: "Refund",
          payment: ["fa-cc-visa", "Visa"],
          index: 5
        },
        {
          id: "#SK2545",
          name: "Jacob Hunter",
          date: "04 Oct, 2019",
          total: "$392",
          status: "Paid",
          payment: ["fab fa-cc-paypal", "Paypal"],
          index: 6
        }
      ]
    };
  },
  computed: {
    state() { return this.$store.getters['state/stateTest'] },
    jenjangs() { return this.$store.getters['jenjang/getData'] },
    backButton() { return this.$store.getters['jenjang/getshowBackButton'] },
    historys() { return this.$store.getters['tryout/currentHistory'] },
    loading() { return this.$store.getters['tryout/loading'] },
  },
  mounted(){
    // eslint-disable-next-line no-console
    this.$store.dispatch("tryout/getHistory")
  },
  methods:{
    startTryout(jenjang){
        if(jenjang.isParent){
         this.$store.commit("jenjang/SET_JENJANG",jenjang.child);
         this.$store.commit("jenjang/SET_BACKBUTTON",true);
        }else{
         this.$store.commit("jenjang/SET_SELECTED",jenjang);
         this.$store.commit("state/SET_STATE","INTRO");
         this.$store.commit("jenjang/SET_BACKBUTTON",false);
         this.$store.dispatch("paket/getPaket");
        }
    },
    resetJenjang(){
      this.$store.commit("jenjang/SET_BACKBUTTON",false);
      this.$store.dispatch("jenjang/resetJenjang");
    },
    nextHistory(){
      this.$store.dispatch("tryout/slideHistory");
    },
    lanjutKerjain(id){
      this.$store.dispatch("tryout/getMatpelTryout",id);
    },
    check(history){
      this.$store.dispatch("tryout/checkPayment",history);
    }
  }
};
</script>

<template>
  <Layout>
    <!-- start page title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box d-flex align-items-center justify-content-between">
          <h4 class="mb-0 font-size-18">Dashboard</h4>

          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item active">Welcome to TesUjian Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- end page title -->

    <div class="row">
      <div class="col-xl-4">
        <Profile />
        <Earning />
      </div>
      <!-- end col -->
      <div class="col-xl-8">
        <div v-show="this.state == 'RANGKING'">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                      <div class=" d-flex justify-content-between">
                        <h4 class="card-title mb-4">History Tyrout mu</h4>
                        <div class="pull-right">
                            <button class="btn btn-light btn-sm" @click="nextHistory()">Lihat Lainnya <i class="mdi mdi-arrow-right ml-1"></i></button>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-md-4" v-for="history in historys" :key="history.id">
                        <div class="card bg-light mini-stats-wid">
                          <div class="card-body">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                              <div class="avatar-lg mb-4 mt-1">
                                <img :src="history.icon" alt class="img-thumbnail rounded-circle" />
                              </div>
                              <div class="mt-4">
                                <center>
                                <h4 class="card-title mb-4">{{history.paket.nama_paket}}</h4></center>
                                <button v-if="history.status == false" class="btn btn-warning btn-sm" @click="lanjutKerjain(history.id)">
                                  Lanjut Kerjain
                                  <i class="mdi mdi-arrow-right ml-1"></i>
                                </button>
                                <button v-else class="btn btn-success btn-sm" :disabled="loading"  @click="check(history)">
                                     <span v-if="loading"><i class="bx bx-loader-alt bx-spin"></i></span>  Lihat Hasil
                                  <i class="mdi mdi-arrow-right ml-1"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button class="btn btn-danger btn-sm mb-3" v-show="backButton" @click="resetJenjang()"> <i class="mdi mdi-arrow-left ml-1"></i> Kembali</button>
              </div>
              <div class="col-md-3" v-for="jenjang in jenjangs" :key="jenjang.id">
                <div class="card card mini-stats-wid">
                  <div class="card-body">
                    <div class="d-flex flex-column justify-content-center align-items-center">
                      <div class="avatar-lg mb-4 mt-1">
                        <img :src="jenjang.image" alt class="img-thumbnail rounded-circle" />
                      </div>
                      <div class="mt-4">
                        <button class="btn btn-primary btn-sm" @click="startTryout(jenjang)">
                          Mulai Tryout {{jenjang.nama}}
                          <i class="mdi mdi-arrow-right ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <!-- intro -->
      <Intro  v-show="state == 'INTRO'"/>
        <!-- matpel -->
      <Matpel  v-show="state == 'MATPEL'"/>
        <!-- matpel -->
      <Soal  v-show="state == 'SOAL'"/>
      <ChoosePembayaran  v-show="state == 'METODEPEMBAYARAN'"/>
      <parsingGrade  v-show="state == 'PARSINGGRADE'"/>
      <Pembahasan  v-show="state == 'PEMBAHASAN'"/>
      </div>
    </div>
    <!-- end row -->
    <!-- end row -->
    <!-- end row -->
  </Layout>
</template>
