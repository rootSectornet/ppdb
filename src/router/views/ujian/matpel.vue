<script>
/**
 * Profile component
 */
import Swal from "sweetalert2";
export default {
  computed:{
    matpels(){
      // @ts-ignore
      return this.$store.getters["tryout/matpels"];
    },
    idTryout() { return this.$store.getters['tryout/idTryout'] },
  },
  methods:{
    start(tryoutDetail){
        if(tryoutDetail.status == 1){
          Swal.fire("Mata Pelajaran Ini Sudah Anda Kerjakan", "Silahkan Anda Kerjakan Mata Pelajaran Lainnya", "warning");
        }else{
          this.$store.dispatch("tryout/getSoals",tryoutDetail)
        }
    },
    finish(){
      this.$store.dispatch("tryout/finishTryout",this.idTryout)
    }
  }};
</script>
<template>
  <div class="card">
    <div class="card-body">
        <h4 class="card-title mb-4">Pilih Mata Pelajaran</h4>
        <div class="img-center d-flex justify-content-center align-items-center">
            <img src="@/assets/images/subject.png" alt="" height="300">
        </div>
            <div class="table-responsive mt-4">
              <table class="table table-centered">
                <tbody>
                  <tr v-for="matpel in matpels" :key="matpel.id">
                    <td style="width: 140px">
                     <a href="javascript: void(0);"   @click="start(matpel)" > <p class="mb-0">{{matpel.nama}}</p></a>
                    </td>
                    <td style="width: 120px" v-if="matpel.status == 1">
                      <h5 class="mb-0">{{matpel.nilai}}</h5>
                    </td>
                    <td v-if="matpel.status == 1">
                        <b-progress class="mt-2" :max="50" show-value>
                        <b-progress-bar :value="30" variant="success">{{matpel.totalBenar}} Benar</b-progress-bar>
                        <b-progress-bar :value="20" variant="danger">{{matpel.totalSalah}}  Salah</b-progress-bar>
                        </b-progress>
                    </td>
                    <td v-else>
                        <p><b-badge variant="warning">Belum Di Kerjakan</b-badge></p>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">{{matpel.jumlah_soal}} Soal</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        <p><b-badge variant="warning">Note</b-badge> <i class="font-size-10">Kerjakan Sebaik Mungkin, Nilai yang anda dapatkan bisa menjadi acuan untuk masuk ke sekolah favorit anda</i></p>
        <div class="img-center d-flex justify-content-center align-items-center">
            <button class="btn btn-outline-primary btn-pill" @click="finish()">Selesai & Kumpulkan</button>
        </div>
    </div> 
  </div>
  <!-- end card -->
</template>