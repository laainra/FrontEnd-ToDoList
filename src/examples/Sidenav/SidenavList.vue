<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <!-- <li class="nav-item">
        <sidenav-item
          url="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : 'Tables'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li> -->
      <li class="nav-item">
        <sidenav-item
          url="/todo"
          :class="getRoute() === 'todo' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الفواتیر' : 'To Do Table'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          url="/todo-form"
          :class="getRoute() === 'todo-form' ? 'active' : ''"
          navText="To Do Form"
        >
          <template v-slot:icon>
            <i class="ni ni-world-2 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item">
        <h6
          v-if="this.$store.state.isRTL"
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          صفحات المرافق
        </h6>
        <h6
          v-else
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Profile'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <sidenav-item
          url="/signin"
          :class="getRoute() === 'signin' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'تسجيل الدخول' : 'Sign In'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <sidenav-item
          url="/signup"
          :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'اشتراك' : 'Sign Up'"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="isLoggedIn" class="nav-item">
        <router-link
          to="/"
          class="nav-link"
          @click="logout"
        >
          <i class="ni ni-user-run text-warning text-sm opacity-10"></i>
          <span v-if="this.$store.state.isRTL">الخروج</span>
          <span v-else>Logout</span>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please check our docs"
    />
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
import Cookies from 'js-cookie';

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
      isLoggedIn: !!Cookies.get('user') // Check if user is logged in based on the presence of user in cookies
    };
  },
  components: {
    SidenavItem,
    SidenavCard
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    logout() {
      // Perform logout actions, e.g., removing user from cookies or resetting login status
      Cookies.remove('user');
      this.isLoggedIn = false;
      // Redirect to home page or any other desired page
      this.$router.push('/');
    }
  }
};
</script>
