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
                    return {
                        jawab : false,
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
    // eslint-disable-next-line no-unused-vars
    jawab(index){
        this.soals[this.indexSoal].newChoice.forEach(e => {
            e.jawab = false;
        });
        this.soals[this.indexSoal].jawaban_user = this.soals[this.indexSoal].newChoice[index].choice
        this.soals[this.indexSoal].newChoice[index].jawab = true;
        this.next();
    },
    doneAnswer(id){
        const jawab = this.jawabans.find(el=>el.id == id)
        return jawab != undefined;
    },
    kumpulkan(){
        this.loading = true;
        Promise.all([this.soals.forEach((v)=>{
            var formData = new FormData();
            formData.append("id",v.id_tryoutDetailSoals)
            formData.append("jawaban_user",v.jawaban_user)
            tryout.kumpulkan(formData);
        })]).then((values) => {
            console.log("siapsssai?"+values);
            tryout.finishMatpel(this.tryoutDetail.id).then((res)=>{
                console.log(res);
                this.$store.dispatch("tryout/getMatpelTryout",this.idTryout)
            })
            this.loading = false;
        });
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
                <h4 class="card-title">{{matpel.nama}}</h4>
                <div class="pull-right">
                    <button class="btn btn-primary btn-sm" :disabled="loading" @click="kumpulkan()">Kumpulkan </button>
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
                        <h4 class="card-title">Pilih Jawaban Yang tepat</h4>
                        <b-list-group>
                            <b-list-group-item v-for="(choice,index) in this.soals[this.indexSoal].newChoice" :key="index" button @click="jawab(index)" :active="choice.jawab || choice.choice == soals[indexSoal].jawaban_user"><span class="font-size-18 font-weight-bolder mr-2">{{String.fromCharCode(65+index)}}. &nbsp;&nbsp;</span>&nbsp;{{choice.choice}}</b-list-group-item>
                        </b-list-group>
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
                            <b-button size="sm" pill class="m-2 btn-soal"  v-for="(soal,index) in soals" :key="index" :variant="soal.jawaban_user !==null ?'success': (index==indexSoal) ? 'primary' :'outline-primary'" @click="gotoIndex(index)">{{index + 1}}</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- end card -->
</template>