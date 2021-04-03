<script>
/**
 * Profile component
 */
import Multiselect from "vue-multiselect";
export default {
  data() {
    return {
      provinsi : null,
      kota : null,
      sekolah : null,
      trackBy: 'id',
    };
  },
  components: {Multiselect },
  computed:{
    jenjang(){
      // @ts-ignore
      return this.$store.getters["jenjang/getSelected"];
    },
    provinsiOption(){
      // @ts-ignore
      return this.$store.getters["area/getProvinsi"];
    },
    kotaOption(){
      // @ts-ignore
      return this.$store.getters["area/getKota"];
    },
    sekolahOption(){
      // @ts-ignore
      return this.$store.getters["sekolah/getSekolah"];
    }
  },
  mounted(){
    // eslint-disable-next-line no-console
    this.$store.dispatch("area/DataProvinsi")
  },
  methods:{
    start(){
      if(this.sekolah){
        this.$store.dispatch("tryout/startTryout",this.sekolah.id)
      }
    },
    pronvinsiChange(e){
      // eslint-disable-next-line no-console
      console.log(e)
      this.$store.dispatch("area/DataKota",e.id)
    },
    kotaChange(e){
      // eslint-disable-next-line no-console
      console.log(e)
      this.$store.dispatch("sekolah/DataSekolah",e.id)
    },
  }};
</script>
<template>
  <div class="card">
    <div class="card-body">
        <h4 class="card-title mb-4">Peraturan Ujian</h4>
        <div class="img-center d-flex justify-content-center align-items-center">
            <img src="@/assets/images/intro.png" alt="" height="300">
        </div>
        <div class="detail">
            <ol>
                <li v-if="jenjang">Tryout Jenjang {{jenjang.nama}}</li>
                <li>Waktu Pengerjaan 1 Jam untuk setiap Mata Pelajaran.</li>
                <li>Ujian Hanya bisa dilakukan 1 kali</li>
                <li>Jawaban hanya akan di hitung saat anda klik tombol kumpulkan.</li>
            </ol>
        </div> 
        <p><b-badge variant="warning">Note</b-badge> <i class="font-size-10">Kerjakan Sebaik Mungkin, Nilai yang anda dapatkan bisa menjadi acuan untuk masuk ke sekolah favorit anda</i></p>
        <b-form class="p-2">
          <h4 class="card-title mb-4">Pilih Sekolah Favoritmu</h4>
            <b-form-group id="Pronvisi" label="Pronvisi :" label-for="Pronvisi">
              <multiselect v-model="provinsi" :options="provinsiOption" :track-by="trackBy" @input="pronvinsiChange" label="name">
                  <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
              </multiselect>
            </b-form-group>

            <b-form-group id="Kota" label="Kota :" label-for="Kota">
              <multiselect v-model="kota" :options="kotaOption" :track-by="trackBy" @input="kotaChange" label="name">
                  <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
              </multiselect>
            </b-form-group>

            <b-form-group id="Sekolah" label="Sekolah :" label-for="Sekolah">
              <multiselect v-model="sekolah" :options="sekolahOption" :track-by="trackBy" label="name">
                  <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
              </multiselect>
            </b-form-group>
        </b-form>
        <div class="img-center d-flex justify-content-center align-items-center">
            <button  @click="start()"  class="btn btn-outline-primary btn-pill">Mengerti & Mulai Ujian</button>
        </div>
    </div> 
  </div>
  <!-- end card -->
</template>