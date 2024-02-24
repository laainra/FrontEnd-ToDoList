<!-- Membuat komponen form untuk edit to do  -->
<template>
  <div class="card">
    <form @submit.prevent="editTodo">
      <div class="card-body">
        <div class="form-group">
          <label for="title" class="form-control-label">Title</label>
          <input
            type="text"
            id="title"
            class="form-control"
            v-model="title"
            required
          />
        </div>
        <div class="form-group">
          <label for="description" class="form-control-label">Description</label>
          <input
            type="text"
            id="description"
            class="form-control"
            v-model="description"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-control-label">Status</label>
          <div>
            <label>
              <input type="radio" v-model="status" value="completed" required />
              Completed
            </label>
          </div>
          <div>
            <label>
              <input type="radio" v-model="status" value="incomplete" required />
              Incomplete
            </label>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Edit Todo</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
 // import module todo service yang berisi API CRUD untuk Todo
import TodoService from "../../services/todo.service.js";

export default {
   // membuat function data untuk manipulasi data dalam komponen
  data() {
    return {
      title: "",
      description: "",
      status: "",
    };
  },
  async mounted() {
    // mengambil data berdasarkan parameter route
    const todoId = this.$route.params.id;
    try {
      const todo = await TodoService.getTodoById(todoId);
      // Mengisi form field dengan data yang diambil
      this.title = todo.title;
      this.description = todo.description;
      this.status = todo.status ? "completed" : "incomplete";
    } catch (error) {
      console.error("Error fetching todo:", error.message);
    }
  },
  methods: {
    async editTodo() {
      // mendapat id dari parameter route
      const todoId = this.$route.params.id;
      try {
        let updatedTodo = {
          title: this.title,
          description: this.description,
          status: this.status === "completed" ? true : false,
        };
        // Memanggil method editTodo dari TodoService
        const editedTodo = await TodoService.editTodo(todoId, updatedTodo);
        console.log("Todo updated:", editedTodo);
        // Reset form
        this.resetForm();
        // Redirect ke halaman todo jika berhasil
        this.$router.push("/todo");
      } catch (error) {
        console.error("Error editing todo:", error.message);
        // mengahndle error
      }
    },
    resetForm() {
      // mengapus field form
      this.title = "";
      this.description = "";
      this.status = "";
    },
  },
};
</script>

