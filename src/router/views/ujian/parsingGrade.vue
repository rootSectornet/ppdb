<script>
/**
 * Profile component
 */
export default {
  data() {
    return {
      error : false,
      trackBy: 'id',
    };
  },
  computed:{
    loading() { return this.$store.getters['tryout/loading'] },
    tryout(){
      // @ts-ignore
      return this.$store.getters["tryout/tryoutSelected"];
    },
    rasio(){
      // @ts-ignore
      return this.$store.getters["tryout/rasio"];
    },
  },
  mounted(){
    // eslint-disable-next-line no-console
    this.$store.dispatch("area/DataProvinsi")
  },
  methods:{
    cancel(){
      this.$store.commit("state/SET_STATE","RANGKING");
    },
    duaDigitAfterComma(digit){
        var num = Number(digit) // The Number() only visualizes the type and is not needed
        var roundedString = num.toFixed(2);
        var rounded = Number(roundedString); 
        return rounded;
    },
    pembahasan(matpel){
          this.$store.dispatch("tryout/checkPembahasan",matpel)
    }
  }};
</script>
<template>
    <div class="row" v-if="tryout != null && rasio != null">
        <div class="col-md-5">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-4 ">Parsing Grade </h4>
                    <p class="text-muted font-size-12 pb-0 mb-0 font-weight-bold">Sekolah Favoritmu</p>
                    <p class="text-dark font-size-12 pt-0 mt-0 font-weight-normal">{{rasio.namaSekolah}}</p>
                    <center><img :src="tryout.totalNilai >= rasio.kkm ? 'success.png' : 'fail.png'" width="100px" alt=""></center>
                    <div class="d-flex flex-row justify-content-between mb-0 pb-0">
                        <div>
                            <p class="text-muted font-size-12 pb-0 mb-0 font-weight-bold">Nilai MU</p><br>
                            <p class="text-dark font-size-18 font-weight-normal">{{tryout.totalNilai}}</p>
                        </div>
                        <div>
                            <p class="text-muted font-size-12 pb-0 mb-0 font-weight-bold">Standart Nilai <br> Sekolah Favoritmu</p>
                            <p class="text-dark font-size-18 font-weight-normal">{{rasio.kkm}}</p>
                        </div>
                    </div>
                    <hr>
                    <p v-if="tryout.totalNilai >= rasio.kkm" class="text-muted font-size-10">Selamat yah, Nilai Mu Sudah Cukup Memenuhi Nilai Standart Sekolah Favoritmu. </p><br>
                    <p v-if="tryout.totalNilai < rasio.kkm" class="text-muted font-size-10">Tetap Semangat yah, Walaupun Nilai Mu belum Memenuhi Standart Nilai Sekolah Favoritmu , Tapi Kamu Pasti Bisa Jika Sering Latihan dan Giat Belajar </p><br>
                    <button class="btn btn-primary btn-block btn-md mt-4 mb-4" @click="cancel()">  <span v-if="loading"><i class="bx bx-loader-alt bx-spin"></i></span>  Coba Ujian Lainnya</button>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-4 ">Analisa UjianMu </h4>
                    <div class="text-center">
                    <div class="mb-4">
                        <i class="bx bx-edit-alt text-primary display-4"></i>
                    </div>
                    <h3>{{tryout.totalNilai}}</h3>
                    <p>Total Nilaimu</p>
                    </div>

                    <div class="table-responsive mt-4">
                    <table class="table table-centered">
                        <tbody>
                        <tr v-for="matpel in tryout.matpels" :key="matpel.id">
                            <td style="width: 140px">
                                <a href="javascript: void(0);" @click="pembahasan(matpel)" > <p class="mb-0">{{matpel.nama}}</p></a>
                                <p class="font-size-10 pb-0 mb-0">Benar : {{matpel.totalBenar}}</p>
                                <p class="font-size-10 pb-0 mb-0">Salah : {{matpel.totalSalah}}</p>
                            </td>
                            <td align="right">
                                <h5 :class="`mb-0 font-size-18 font-weight-bolder ${duaDigitAfterComma((matpel.totalBenar /matpel.jumlah_soal )*100) <=50 ? 'text-danger' : 'text-success'}`">{{duaDigitAfterComma((matpel.totalBenar /matpel.jumlah_soal )*100)}}</h5>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div> 
  <!-- end card -->
</template>