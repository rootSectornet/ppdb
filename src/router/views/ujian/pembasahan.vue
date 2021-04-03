<script>
/**
 * Profile component
 */
const Tryout = require('./../../../api/tryout');
const tryout = new Tryout();
export default {
  data() {
    return {
      jawabans : [],
      soals : [],
      currentSoal : null,
      indexSoal:0,
      loading : false
    };
  },
  computed: {
    matpel() { return this.$store.getters['state/matpel'] },
    tryoutDetail() { return this.$store.getters['tryout/tryoutDetail'] },
    idTryout() { return this.$store.getters['tryout/idTryout'] },
  },
  watch: {
    // whenever question changes, this function will run
    // eslint-disable-next-line no-unused-vars
    tryoutDetail: function (n, o) {
        if(n != null){
            this.getSoals();
        }
    }
  },
  mounted(){
      this.indexSoal = 0;
    //   this.getSoals();
  },
  methods:{
    getSoals(){
        tryout.getSoals(this.tryoutDetail.idmatpel,this.tryoutDetail.id)
        .then((result)=>{
            result = result.map((v)=>{
                var newChoice = v.choice.map((c)=>{
                    var variant = c.choice == v.jawaban_user && v.jawaban_user == v.jawaban_benar ? 'succcess' : c.choice == v.jawaban_user ? 'danger' : c.choice == v.jawaban_benar ? 'info' : 'light';
                    return {
                        jawab : false,
                        variant : variant,
                        ...c
                    }
                })
                return {
                    newChoice : newChoice,
                    ...v
                }
            })
            this.soals = result;
            this.currentSoal = result[0];
        })
        .catch(err=>console.log(err));
    },
    next(){
        if(this.indexSoal == (this.soals.length-1)){
            this.indexSoal = 0;
        }else{
            this.indexSoal++;
        }
        this.currentSoal = this.soals[this.indexSoal];
    },
    prev(){
        if(this.indexSoal == 0){
            this.indexSoal = 0;
        }else{
            this.indexSoal--;
        }
        this.currentSoal = this.soals[this.indexSoal];
    },
    gotoIndex(index){
        this.indexSoal = index;
        this.currentSoal = this.soals[index];
    },
    doneAnswer(id){
        const jawab = this.jawabans.find(el=>el.id == id)
        return jawab != undefined;
    },
    kembali(){
      this.$store.commit("state/SET_STATE","PARSINGGRADE");
    }
  }
};
</script>
<template>
    <div> 
        <div class="card" v-if="loading">
            <div class="card-body d-flex justify-content-center align-items-center">
                Loading ...
            </div>
        </div>
        <div class="card" v-else>
            <div class="card-body d-flex justify-content-between">
                <div>
                    <h4 class="card-title">{{matpel.nama}}</h4>
                    <p class="font-size-10 pb-0 mb-0">Benar : {{matpel.totalBenar}} soal</p>
                    <p class="font-size-10 pb-0 mb-0">Salah : {{matpel.totalSalah}} soal</p>
                </div>
                <div class="pull-right">
                    <button class="btn btn-primary btn-sm" :disabled="loading" @click="kembali()">Lihat Mata Pelajaran Lainnya </button>
                </div>
            </div> 
        </div>
        <div class="row" v-if="soals.length > 0">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Soal No {{indexSoal+1}}.</h4>
                        <div class="d-flex flex-wrap  align-items-justify  justify-content-start" v-html="this.soals[this.indexSoal].soal">
                           
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4 v-if="this.soals[this.indexSoal].jawaban_user == null || this.soals[this.indexSoal].jawaban_user == 'null'" class="card-title">Anda Tidak Menjawab Soal ini</h4>
                        <h4 v-else  class="card-title">Jawaban Anda {{this.soals[this.indexSoal].jawaban_benar ==this.soals[this.indexSoal].jawaban_user ? "Benar" : "Salah" }}</h4>
                        <b-list-group>
                            <b-list-group-item v-for="(choice,index) in this.soals[this.indexSoal].newChoice" :key="index" button :variant="choice.variant"><span class="font-size-18 font-weight-bolder mr-2">{{String.fromCharCode(65+index)}}. &nbsp;&nbsp;</span>&nbsp;{{choice.choice}}</b-list-group-item>
                        </b-list-group><br>
                        <h4 class="card-title">Jawaban Benar Adalah <br></h4>
                        <b-list-group>
                            <b-list-group-item button ><span class="font-size-18 font-weight-bolder mr-2"></span>&nbsp;{{this.soals[this.indexSoal].jawaban_benar}}</b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Pembahasan</h4>
                        <div v-if="this.soals[this.indexSoal].imgPembahasan" v-html="this.soals[this.indexSoal].pembahasan"></div>
                        <img v-else :src="`http://103.41.207.247:3000/${this.soals[this.indexSoal].pembahasan}`" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between mb-2">
                    <b-button variant="danger" @click="prev()"> <i class="bx bx-chevron-left"></i> Sebelumnya </b-button>
                    <b-button variant="success" @click="next()">Selanjutnya <i class="bx bx-chevron-right"></i></b-button>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Nomor</h4>
                        <div class="d-flex flex-wrap  align-items-justify  justify-content-start">
                            <b-button size="sm" pill class="m-2 btn-soal"  v-for="(soal,index) in soals" :key="index" :variant="index==indexSoal ? 'outline-primary' : 'success'" @click="gotoIndex(index)">{{index + 1}}</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- end card -->
</template>