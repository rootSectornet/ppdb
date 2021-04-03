<script>
/**
 * Profile component
 */
var moment = require('moment');
export default {
  data() {
    return {
      banks : [
          {
            id:"bri",
            name : "BRI",
            image : "bri.png",
            selected : false
          },
          {
            id:"bca",
            name : "BCA",
            image : "bca.png",
            selected : false
          },
          {
            id:"bni",
            name : "BNI",
            image : "bni.png",
            selected : false
          },
          {
            id:"mandiri",
            name : "MANDIRI",
            image : "mandiri.png",
            selected : false
          },
      ],
      error : false,
      trackBy: 'id',
    };
  },
  computed:{
    jenjang(){
      // @ts-ignore
      return this.$store.getters["jenjang/getSelected"];
    },
    tryout(){
      // @ts-ignore
      return this.$store.getters["tryout/tryoutSelected"];
    },
    state() { return this.$store.getters['state/stateTest'] },
    detailPembayaran() { return this.$store.getters['tryout/detailPembayaran'] },
    loading() { return this.$store.getters['tryout/loading'] },
  },
  mounted(){
    // eslint-disable-next-line no-console
    this.$store.dispatch("area/DataProvinsi")
  },
  methods:{
    selectBank(index){
        this.banks.forEach(v=>v.selected=false);
        this.banks[index].selected = true;
    },
    cancel(){
      this.$store.commit("state/SET_STATE","RANGKING");
    },
    batasWaktu(str){
        str = str.slice(0,-5);
        return moment(str).calendar()
    },
    check(){
      this.$store.dispatch("tryout/checkPayment",this.tryout);
    },
    bayar(){
        this.error = false;
        var indexBank = this.banks.findIndex(v=>v.selected==true);
        if(indexBank < 0){
            this.error = true
        }else{
            var param = {
                id_murid : this.tryout.id_murid,
                id_tryout : this.tryout.id,
                metode_pembayaran : this.banks[indexBank].id,
                jumlah:20000
            }
            this.$store.dispatch("tryout/bayar",param);
        }
    }
  }};
</script>
<template>
<div>
    <div class="row" v-if="tryout != null">
        <div class="col-md-8" v-if="detailPembayaran != null">
            <div class="card" >
                <div class="card-body">
                     <h4 class="card-title mb-4 ">Informasi Pembayaran</h4>
                    <p class="text-muted font-size-12 pb-0 mb-0 font-weight-bold">NO. TAGIHAN</p>
                    <p class="text-dark font-size-12 font-weight-normal">{{detailPembayaran.id}}</p>
                    <hr>
                    <p class="text-muted font-size-12 pb-0 mb-0 font-weight-bold">STATUS TAGIHAN</p>
                    <p class="text-dark font-size-14 font-weight-normal  pb-0 mb-0 "><b-badge variant="warning"><span class="p-1 text-dark">MENUNGGU PEMBAYARAN</span></b-badge></p>
                    <p class="text-dark font-size-12 font-weight-normal">Batas Pembayaran : {{batasWaktu(detailPembayaran.batas_waktu)}}</p>
                    <hr>
                    <p class="text-muted font-size-12 pb-0 mb-0 font-weight-bold">METODE PEMBAYARAN</p>
                             <div :class="`img border p-4 mb-1 d-flex justify-content-center`">
                                <img :src="`${detailPembayaran.metode_pembayaran}.png`" class="" alt="">
                             </div>
                    <p class="text-dark font-size-12 font-weight-normal">Bank Transfer</p>
                    <hr>
                    <p class="text-muted font-size-12 pb-1 mb-0 font-weight-bold">KODE PEMBAYARAN</p>
                    <p class="text-danger font-size-16 font-weight-bolder text-monospace">{{detailPembayaran.va_number}} &nbsp;
                    </p>
                    <hr>
                    <p class="text-muted font-size-12 pb-4 mb-0 font-weight-bold">RINCIAN PEMBAYARAN</p>
                        <div class="d-flex flex-row justify-content-between px-4">
                            <p class="text-dark font-size-12 font-weight-bold">Total Pembayaran</p>
                            <p class="text-danger font-size-16 font-weight-bolder text-monospace">Rp. 20.000 &nbsp;
                            </p>
                        </div>
                    <hr>
                    <i class="font-size-10">Segera Lakukan Pembayaran, Tagihan Akan Terhapus Secara Otomatis Jika Melewati Batas Waktu Yang Telah Di Tentukan.</i>
                    <button class="btn btn-primary btn-block btn-md mt-4 mb-4" @click="check()">  <span v-if="loading"><i class="bx bx-loader-alt bx-spin"></i></span>  Cek Status Pembayaran</button>
                    <center><a href="javascript:void(0);"  @click="cancel()"  class="text-muted text-decoration-underline"> <i class="bx bx-chevron-left"></i> Kembali Ke Halaman Utama</a></center>
                </div>
            </div>
        </div>
        <div class="col-md-5" v-if="detailPembayaran == null">
            <div class="card" >
                <div class="card-body">
                     <h4 class="card-title mb-4 ">Pilih Metode pembayaran</h4>
                     <h4 class="font-size-12 mb-4 ">Bank Transfer</h4>
                     <div class="row">
                         <div class="col-md-6" v-for="(bank,index) in banks" :key="bank.id">
                             <div @click="selectBank(index)" :class="`img border p-4 mb-1 paymentImage d-flex justify-content-center ${bank.selected ? 'active' : ''}`">
                                <img :src="bank.image" class="" alt="">
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
        <div class="col-md-7"  v-if="detailPembayaran == null">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-4 ">Detail Subscriptions </h4>
                    <p class="text-small text-danger font-size-12" v-if="error"><i>Silahkan Pilih Metode Pembayaran</i></p>
                    <div class="table-responsive mt-4">
                        <table class="table table-centered">
                            <tbody>
                                <tr>
                                    <td width="8%">
                                        <div class="avatar-sm mb-4 mt-1">
                                            <img :src="tryout.icon" alt class="img-thumbnail rounded-circle" />
                                        </div>
                                    </td>
                                    <td width="60%">
                                        <p class="text-dark pb-0 mb-0">{{tryout.paket.nama_paket}}</p>
                                        <p class="font-size-12 text-muted">Jenjang {{tryout.tingkat.jenjang}}</p>
                                    </td>
                                    <td width="32%">
                                        <p class="font-size-16 text-dark font-weight-bold">Rp. 20.000</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <p class="font-size-18 text-dark font-weight-bolder">TOTAL</p>
                                    </td>
                                    <td>
                                        <p class="font-size-18 text-dark font-weight-bolder">Rp. 20.000</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex flex-row justify-content-between">
                        <button class="btn btn-outline-danger btn-sm" @click="cancel()" >
                            <i class="mdi mdi-arrow-left ml-1"></i>  Batalkan Pembayaran
                        </button>
                        <button class="btn btn-success btn-sm" @click="bayar()" :disabled="loading" > <span v-if="loading"><i class="bx bx-loader-alt bx-spin"></i></span> Lanjutkan Pembayaran
                            <i class="mdi mdi-arrow-right ml-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  <!-- end card -->
</template>