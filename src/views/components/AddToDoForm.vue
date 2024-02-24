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
import TodoService from "../../services/todo.service.js";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      title: "",
      description: "",
      status: "", 
    };
  },
  methods: {
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

        // Create the todo in the database
        const createdTodo = await TodoService.createTodo(newTodo);

        // Reset the form after submission
        this.resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error submitting todo:", error.message);
        // Handle error
      }
    },
    resetForm() {
      // Clear form fields
      this.title = "";
      this.description = "";
      // Reset status to empty string
      this.status = "";
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
