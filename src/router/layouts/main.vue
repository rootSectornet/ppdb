<script>
import router from "@/router";

import Footer from "@/components/footer";

export default {
  components: {  Footer,},
  data() {
    return {
      isMenuCondensed: false
    };
  },
  created: () => {
    document.body.setAttribute("data-layout", "horizontal");
      document.body.setAttribute("data-layout-size", "boxed");
      document.body.setAttribute("data-topbar", "dark");
  },
  methods: {
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    }
  }
};
</script>

<template>
  <div id="layout-wrapper">
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="main-content px-4">
      <div class="page-content mx-4">
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
