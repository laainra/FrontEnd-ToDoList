<!-- Membuat komponen table untuk menampilkan todo dari database -->
<template>
  <div class="card mb-4">
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                No
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Title
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Description
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Status
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Membuat looping untuk menampilkan data perbaris -->
            <tr v-for="(todo, index) in todos" :key="todo.id">
              <td>{{ index + 1 }}</td>
              <td class="text-sm">{{ todo.title }}</td>
              <td class="text-sm">{{ todo.description }}</td>
              <td class="text-sm">
                <span :class="getStatusClass(todo.status)">{{
                  getTodoStatus(todo.status)
                }}</span>
              </td>
              <td class="text-center">
                <!-- button edit -->
                <button
                  class="btn btn-link text-secondary mb-0"
                  @click="editTodo(todo.id)"
                >
                  Edit
                </button>
                 <!-- button hapus -->
                <button
                  class="btn btn-link text-danger mb-0"
                  @click="deleteTodo(todo.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TodoService from "../../services/todo.service.js"; // import module todo service yang berisi method API CRUD untuk Todo

export default {
  // inisiasi data todos denga array kosong
  data() {
    return {
      todos: [],
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    // membuat method untuk mengambil semua data todo dari database
    async fetchTodos() {
      try {
        // Memanggil method readTodo  dari TodoService 
        const todos = await TodoService.readTodo();
        // mengupdate data todo dengan data yang di fetch 
        this.todos = todos;
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    },
    // Method untuk edirect ke halaman edit todo dengan membawa id sbg parameter
    async editTodo(id) {
      try {
        
        this.$router.push({ name: 'Edit Todo', params: { id } });
      } catch (error) {
        console.error("Error editing todo:", error.message);
      }
    },
    // method untuk menghapus todo
    async deleteTodo(id) {
      try {
        // memanggil method deleteTodo method dari TodoService 
        await TodoService.deleteTodo(id);
        console.error("Delete Success");
        // Refresh list setelah sukses mengahpus
        this.fetchTodos();
      } catch (error) {
        console.error("Error deleting todo:", error.message);
      }
    },
    getStatusClass(status) {
      return status
        ? "badge badge-sm bg-gradient-success"
        : "badge badge-sm bg-gradient-primary";
    },
    getTodoStatus(status) {
      return status ? "Completed" : "Incomplete";
    },
  },
};
</script>
