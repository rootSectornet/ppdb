<script>
import Layout from "../../layouts/auth";
import appConfig from "@/app.config";
const User = require('./../../../api/users');
const user = new User();

/**
 * Forgot Password component
 */
export default {
  page: {
    title: "Verifycation Code",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout },
  data() {
    return {
      otp: "",
      error: null,
      tryingToReset: false,
      isResetError: false
    };
  },
  methods: {
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.tryingToReset = true;
      user.code(this.otp)
      .then((result)=>{
        this.tryingToReset = false;
        this.error = result;
        window.localStorage.setItem("auth.currentUser", JSON.stringify(result.murid))
        this.$router.push(
          this.$route.query.redirectFrom || { name: "home" }
        );
      })
      .catch((err)=>{
        this.tryingToReset = false;
        this.error = err;
        this.isResetError= true;
      })
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
                  <h5 class="text-primary">OTP Code Verivications</h5>
                  <p>Please enter the OTP code, we send to your email (info@desktopip.com)</p>
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
                    <img src="@/assets/images/logo.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>
            <div class="p-2">
              <b-alert v-model="isResetError" class="mb-4" variant="danger" dismissible>{{error}}</b-alert>
              <form >
                <div class="form-group">
                  <label for="useremail">OTP Code</label>
                  <input
                    type="text"
                    v-model="otp"
                    class="form-control"
                    id="useremail"
                    placeholder="OTP Code"
                  />
                </div>
                <div class="form-group row mb-0">
                  <div class="col-12 text-right">
                    <button class="btn btn-primary w-md" type="button" @click="tryToReset()">Verify</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            © {{ new Date().getFullYear() }} tesujian.com
            <i
              class="mdi mdi-heart text-danger"
            ></i> by Candahar
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
