<script>
/**
 * Profile component
 */
export default {
  methods:{
    start(){
        this.$store.commit("state/SET_STATE","SOAL");
        this.$store.commit("state/SET_MATPEL",{id:1,nama:"B. Indonesia"});
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
                  <tr>
                    <td style="width: 140px">
                     <a href="javascript: void(0);"   @click="start()" > <p class="mb-0">B. Indonesia</p></a>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">60</h5>
                    </td>
                    <td>
                        <b-progress class="mt-2" :max="50" show-value>
                        <b-progress-bar :value="30" variant="success">30 Benar</b-progress-bar>
                        <b-progress-bar :value="20" variant="danger">20 Salah</b-progress-bar>
                        </b-progress>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">50 Soal</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 140px">
                     <a href="javascript: void(0);"> <p class="mb-0">Matematika</p></a>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">40</h5>
                    </td>
                    <td>
                        <b-progress class="mt-2" :max="40" show-value>
                        <b-progress-bar :value="15" variant="success">15 Benar</b-progress-bar>
                        <b-progress-bar :value="25" variant="danger">25 Salah</b-progress-bar>
                        </b-progress>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">40 Soal</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 140px">
                     <a href="javascript: void(0);"> <p class="mb-0">IPA</p></a>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">75</h5>
                    </td>
                    <td>
                        <b-progress class="mt-2" :max="40" show-value>
                        <b-progress-bar :value="25" variant="success">25 Benar</b-progress-bar>
                        <b-progress-bar :value="15" variant="danger">15 Salah</b-progress-bar>
                        </b-progress>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">40 Soal</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 140px">
                     <a href="javascript: void(0);"> <p class="mb-0">B. Inggris</p></a>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">90</h5>
                    </td>
                    <td>
                        <b-progress class="mt-2" :max="40" show-value>
                        <b-progress-bar :value="30" variant="success">30 Benar</b-progress-bar>
                        <b-progress-bar :value="10" variant="danger">10 Salah</b-progress-bar>
                        </b-progress>
                    </td>
                    <td style="width: 120px">
                      <h5 class="mb-0">40 Soal</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        <p><b-badge variant="warning">Note</b-badge> <i class="font-size-10">Kerjakan Sebaik Mungkin, Rangking anda bisa saja tergantikan oleh peserta lain yang memiliki nilai lebih tinggi dari anda</i></p>
        <div class="img-center d-flex justify-content-center align-items-center">
            <button class="btn btn-outline-primary btn-pill">Selesai & Kumpulkan</button>
        </div>
    </div> 
  </div>
  <!-- end card -->
</template>