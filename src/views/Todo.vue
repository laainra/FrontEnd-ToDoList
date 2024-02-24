<!-- Membuat halaman utama to do list yang akan menampilkan form dan table  -->
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2>To Do List</h2>
        <div class="col-12">
          <h3>Add New To Do</h3>
        </div>
      </div>
      <AddToDoForm  />
      <TodoTable />
    </div>
  </div>
</template>

<script>
import TodoTable from "./components/TodoTable.vue";
import AddToDoForm from "./components/AddToDoForm.vue";
import TodoService from "../services/todo.service.js";


export default {
  name: "Todo",
  components: {
    TodoTable,
    AddToDoForm,
    TodoService
  },
  data() {
    return {
      title: "",
      description: "",
      status: "", // Default status to empty string
    };
  },
 
};
</script>
