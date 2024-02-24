<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>Add New To Do</h2>
      </div>
      <AddToDoForm />
    </div>
  </div>
</template>

<script>
import TodoTable from "./components/TodoTable.vue";
import AddToDoForm from "./components/AddToDoForm.vue";
export default {
  name: "Add New Todo",
  components: {
    TodoTable,
    AddToDoForm,
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push(newTodo);
      this.showModal = false;
    },
  },
  data() {
    return {
      salary: {
        classIcon: "text-white fas fa-landmark",
        title: "Salary",
        desc: "Belong Interactive",
        price: "+$2000",
      },
      paypal: {
        classIcon: "text-white fab fa-paypal",
        title: "Paypal",
        desc: "Freelance Payment",
        price: "$455.00",
      },
    };
  },
};
</script>
