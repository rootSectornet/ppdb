<script>
import Layout from "../layouts/main";
import appConfig from "@/app.config";

import Profile from "@/components/widgets/profile";
import Intro from "@/router/views/ujian/intro";
import Matpel from "@/router/views/ujian/matpel";
import Soal from "@/router/views/ujian/soal";
import Earning from "@/components/widgets/earning";
import Transaction from "@/components/widgets/transaction";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Dashboard",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, Profile, Transaction, Earning,Intro,Matpel,Soal },
  data() {
    return {
      title: "Dashboard",
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
    state() { return this.$store.getters['state/stateTest'] }
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
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-4">Analisa Ujian</h4>

            <div class="text-center">
              <div class="mb-4">
                <i class="bx bx-edit-alt text-primary display-4"></i>
              </div>
              <h3>80.5</h3>
              <p>Total Nilaimu</p>
            </div>

            <div class="table-responsive mt-4">
              <table class="table table-centered">
                <tbody>
                  <tr>
                    <td style="width: 140px">
                      <p class="mb-0">B. Indonesia</p>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">60</h5>
                    </td>
                    <td>
                      <b-progress :value="60" variant="primary" height="5px"></b-progress>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="mb-0">Matematika</p>
                    </td>
                    <td>
                      <h5 class="mb-0">30</h5>
                    </td>
                    <td>
                      <b-progress :value="30" variant="success" height="5px"></b-progress>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="mb-0">IPA</p>
                    </td>
                    <td>
                      <h5 class="mb-0">40.6</h5>
                    </td>
                    <td>
                      <b-progress :value="40.6" variant="warning" height="5px"></b-progress>
                    </td>
                  <tr>
                    <td>
                      <p class="mb-0">B. Inggris</p>
                    </td>
                    <td>
                      <h5 class="mb-0">40.6</h5>
                    </td>
                    <td>
                      <b-progress :value="40.6" variant="danger" height="5px"></b-progress>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
      <div class="col-xl-8">
        <div class="card" v-show="this.state == 'RANGKING'">
          <div class="card-body">
            <h4 class="card-title mb-4">Peringkat</h4>
            <!-- Transactions table -->
            <Transaction :transactions="transactions" />
          </div>
        </div>

        <!-- intro -->
      <Intro  v-show="state == 'INTRO'"/>
        <!-- matpel -->
      <Matpel  v-show="state == 'MATPEL'"/>
        <!-- matpel -->
      <Soal  v-show="state == 'SOAL'"/>

      </div>
    </div>
    <!-- end row -->
    <!-- end row -->
    <!-- end row -->
  </Layout>
</template>
