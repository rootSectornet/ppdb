<script>
/**
 * Profile component
 */
import router from "@/router";
export default {
    computed:{
      user(){
        // @ts-ignore
        return this.$store.getters["auth/user"];
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('auth/logOut')
        router.push('/login')
      },
    }
};
</script>
<template>
  <div class="card overflow-hidden" v-if="user != null">
    <div class="bg-soft-primary">
      <div class="row">
        <div class="col-7">
          <div class="text-primary p-3">
            <h5 class="text-primary">Welcome Back !</h5>
            <p>TESUJIAN.COM</p>
          </div>
        </div>
        <div class="col-5 align-self-end">
          <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <div class="row">
        <div class="col-sm-4">
          <div class="avatar-md profile-user-wid mb-4">
            <img src="@/assets/images/users/avatar-1.jpg" alt class="img-thumbnail rounded-circle" />
          </div>
          <h5 class="font-size-15 text-truncate">Rita Rianti</h5>
          <p class="text-muted mb-0 text-truncate">SD Negeri 5 Padang</p>
        </div>

        <div class="col-sm-8">
          <div class="pt-4">
            <div class="row">
              <div class="col-8">
                <h5 class="font-size-15">Email</h5>
                <p class="text-muted mb-0">{{user.email}}</p>
              </div>
              <div class="col-4 icon-demo-content">
                <div class="col-xl-3 col-lg-4 col-sm-6">
                  <i class="bx bx-log-out-circle logoutbtn" @click="logout()" id="tooltip-button-interactive">
                    <b-tooltip target="tooltip-button-interactive">I will stay open when hovered</b-tooltip>
                  </i> 
                </div>
              </div>
            </div>
            <div class="mt-4">
              <a href class="btn btn-primary btn-sm">
                Lihat Profil
                <i class="mdi mdi-arrow-right ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end card-body -->
  </div>
  <!-- end card -->
</template>