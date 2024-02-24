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
import TodoService from "../../services/todo.service.js";

export default {
  data() {
    return {
      title: "",
      description: "",
      status: "",
    };
  },
  async mounted() {
    // Fetch the todo item based on its ID from the route params
    const todoId = this.$route.params.id;
    try {
      const todo = await TodoService.getTodoById(todoId);
      // Populate the form fields with the fetched todo data
      this.title = todo.title;
      this.description = todo.description;
      this.status = todo.status ? "completed" : "incomplete";
    } catch (error) {
      console.error("Error fetching todo:", error.message);
    }
  },
  methods: {
    async editTodo() {
      // Get the todo ID from the route params
      const todoId = this.$route.params.id;
      try {
        let updatedTodo = {
          title: this.title,
          description: this.description,
          status: this.status === "completed" ? true : false,
        };
        // Call the editTodo method from TodoService with the updated todo object
        const editedTodo = await TodoService.editTodo(todoId, updatedTodo);
        console.log("Todo updated:", editedTodo);
        // Reset the form after submissions
        this.resetForm();
        // Redirect to the todo list page
        this.$router.push("/todo");
      } catch (error) {
        console.error("Error editing todo:", error.message);
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
