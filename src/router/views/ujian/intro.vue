<script>
/**
 * Profile component
 */
export default {
  methods:{
    start(){
      this.$store.commit("state/SET_STATE","MATPEL");
    }
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
                <li>Waktu Pengerjaan 1 Jam untuk setiap Mata Pelajaran.</li>
                <li>Total Ada 4 Mata Pelajaran</li>
                <li>50 B.Indonesia</li>
                <li>40 Matematika</li>
                <li>40 IPA</li>
                <li>50 B. Inggris</li>
                <li>Ujian Hanya bisa dilakukan 1 kali</li>
                <li>Jawaban hanya akan di hitung saat anda klik tombol kumpulkan.</li>
            </ol>
        </div> 
        <p><b-badge variant="warning">Note</b-badge> <i class="font-size-10">Kerjakan Sebaik Mungkin, Rangking anda bisa saja tergantikan oleh peserta lain yang memiliki nilai lebih tinggi dari anda</i></p>
        <div class="img-center d-flex justify-content-center align-items-center">
            <button  @click="start()"  class="btn btn-outline-primary btn-pill">Mengerti & Mulai Ujian</button>
        </div>
    </div> 
  </div>
  <!-- end card -->
</template>