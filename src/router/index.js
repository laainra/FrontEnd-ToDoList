import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Todo from "../views/Todo.vue";
import EditTodo from "../views/EditTodo.vue";
import ToDoForm from "../views/ToDoForm.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Cookies from "js-cookie";

// rute-rute yang digunakan untuk mengakses halaman
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/todo",
    name: "To Do List",
    component: Todo,
  },
  {
    path: "/edit-todo/:id", 
    name: "Edit Todo",
    component: EditTodo,
    props: true, 
  },
  {
    path: "/todo-form",
    name: " To Do Form",
    component: ToDoForm,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

// membuat router 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// Membuat authorizaztion untuk halaman public dan signed user only yang tokennya disimpan di cookies
router.beforeEach((to, from, next) => {
  const publicPages = ["/signin", "/signup", "/dashboard-default"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Cookies.get("user"); 

  // jika mengakses halaman yang butuh authorization maka akan redirect ke halaman sign in
  if (authRequired && !loggedIn) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
