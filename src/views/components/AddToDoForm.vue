<!-- Membuat komponen form untuk insert to do baru -->
<template>
  <div class="card">
    <form @submit.prevent="addTodo">
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
          <label for="description" class="form-control-label"
            >Description</label
          >
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
              <input
                type="radio"
                v-model="status"
                value="incomplete"
                required
              />
              Incomplete
            </label>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Add Todo</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TodoService from "../../services/todo.service.js"; // import module todo service yang berisi method API CRUD untuk Todo
import Cookies from "js-cookie"; // import cookies untuk mengakses cookies di browser

export default {
  // membuat function data untuk manipulasi data dalam komponen
  data() {
    return {
      title: "",
      description: "",
      status: "", 
    };
  },
  methods: {
    // membut method untuk mengambil data dari form kemudian disimpan di database melalui API dari todo service
    async addTodo() {
      try {
        const userData = Cookies.get("user.username");

        let newTodo = {
          title: this.title,
          description: this.description,
          status: this.status === "completed" ? true : false,
          username: userData,
        };

        console.log(newTodo);

        const createdTodo = await TodoService.createTodo(newTodo);

        this.resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error submitting todo:", error.message);
   
      }
    },
    resetForm() {
   // method untuk mereset isi form
      this.title = "";
      this.description = "";
      
      this.status = "";
    },
  },
};
</script>

