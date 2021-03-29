<script>
import { authMethods } from "@/state/helpers";
import Layout from "../../layouts/auth";
import appConfig from "@/app.config";
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";

/**
 * Register component
 */
export default {
  page: {
    title: "Register",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout,DatePicker,Multiselect },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      regError: null,
      jenisKelamin : null,
      jkOptions : ["Laki - Laki","Perempuan"],
      tglLahir : new Date(),
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false,
      provinsi : null,
      kota : null,
      sekolah : null,
      trackBy: 'id',
    };
  },
  computed:{
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
  methods: {
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
    ...authMethods,
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.tryingToRegister = true;
      // Reset the regError if it existed.
      this.regError = null;
      return (
        this.register({
          email: this.email,
          password: this.password
        })
          // eslint-disable-next-line no-unused-vars
          .then(token => {
            this.tryingToRegister = false;
            this.isRegisterError = false;
            this.registerSuccess = true;
            if (this.registerSuccess) {
              this.$router.push(
                this.$route.query.redirectFrom || { name: "home" }
              );
            }
          })
          .catch(error => {
            this.tryingToRegister = false;
            this.regError = error ? error : "";
            this.isRegisterError = true;
          })
      );
    }
  }
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Silahkan Daftar</h5>
                  <p>Lengkapi dulu Data Diri mu dibawah ini yah!.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt class="rounded-circle" height="34" />
                  </span>
                </div>
              </router-link>
            </div>

            <b-alert
              v-model="registerSuccess"
              class="mt-3"
              variant="success"
              dismissible
            >Registration successfull.</b-alert>

            <b-alert
              v-model="isRegisterError"
              class="mt-3"
              variant="danger"
              dismissible
            >{{regError}}</b-alert>

            <b-form class="p-2" @submit.prevent="tryToRegisterIn">
              <b-form-group id="email-group" label="Nama Lengkap: " label-for="nama">
                <b-form-input
                  id="nama"
                  v-model="username"
                  type="text"
                  placeholder="Masukan Nama Lengkap mu"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="fullname-group" label="Email" label-for="email">
                <b-form-input id="email" v-model="email" type="email" placeholder="Enter email"></b-form-input>
              </b-form-group>

              <b-form-group id="password-group" label="Password" label-for="password">
                <b-form-input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="tglLahir" label="Tanggal Lahir :" label-for="tglLahir">
                <date-picker v-model="tglLahir" :first-day-of-week="1" lang="en"></date-picker>
              </b-form-group>

              <b-form-group id="jenisKelamin" label="Jenis Kelamin :" label-for="jenisKelamin">
                <multiselect v-model="jenisKelamin" :options="jkOptions"></multiselect>
              </b-form-group>

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

              <div class="mt-4">
                <b-button type="submit" variant="primary" class="btn-block">Register</b-button>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
                  Dengan mendaftar anda menyetujui 
                  <a
                    href="javascript: void(0);"
                    class="text-primary"
                  >Syarat & Kententuan</a> dari System penerimaan ujian ini.
                </p>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Sudah Memiliki Akun ?
            <router-link tag="a" to="/login" class="font-weight-medium text-primary">Silahkan Masuk</router-link>
          </p>
          <p>
            © {{new Date().getFullYear()}} Tpm Enterprise
            <i class="mdi mdi-heart text-danger"></i> by Candahar
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
