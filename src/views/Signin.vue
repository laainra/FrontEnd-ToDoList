<!-- Membaut halaman sign in yang akan menyimpan data user termasuk token di cookies -->
<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <navbar isBtn="bg-gradient-light" />
  </div>
  <main class="main-content mt-0">
    <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
         style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: top;">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Sign in</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="login" role="form">
                <div class="form-group">
                  <input type="text" v-model="user.username" class="form-control" placeholder="Username" aria-label="Username" />
                </div>
                <div class="form-group">
                  <input type="password" v-model="user.password" class="form-control" placeholder="Password" aria-label="Password" />
                </div>
                <div class="text-center">
                  <button :disabled="loading" type="submit" class="btn btn-dark btn-gradient w-100 my-4 mb-2">{{ loading ? 'Signing in...' : 'Sign in' }}</button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  Don't have an account?
                  <router-link to="/signup" class="text-dark font-weight-bolder">Sign up</router-link>
                </p>
                <p class="text-danger mt-3 mb-0">{{ errorMessage }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import AuthService from "../services/auth.service.js"; // import auth service yang berisi API authenticaion user

export default {
  name: "Signin",
  components: {
    Navbar,
    AppFooter,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    // method login yang memanggil methode login dari AuthService kemudian jika berhasil akan redirect ke halaman todo
    async login() {
      this.loading = true;
      try {
        await AuthService.login(this.user);
        this.$router.push("/todo");
      } catch (error) {
        this.loading = false;
        this.errorMessage = (error.response && error.response.data && error.response.data.message) ||
                            error.message || error.toString();
      }
    },
  },
};
</script>
