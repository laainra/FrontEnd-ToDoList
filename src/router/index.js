import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Todo from "../views/Todo.vue";
import EditTodo from "../views/EditTodo.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import ToDoForm from "../views/ToDoForm.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Cookies from "js-cookie";

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
    path: "/edit-todo/:id", // Define the route with a parameter for the todo index
    name: "Edit Todo",
    component: EditTodo,
    props: true, // Pass route params as props to the component
  },
  // {
  //   path: "/rtl-page",
  //   name: "RTL",
  //   component: RTL,
  // },
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/signin", "/signup", "/dashboard-default"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Cookies.get("user"); // Retrieve user data from cookies

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
