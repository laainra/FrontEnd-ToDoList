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
                <button
                  class="btn btn-link text-secondary mb-0"
                  @click="editTodo(todo.id)"
                >
                  Edit
                </button>
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
import TodoService from "../../services/todo.service.js";

export default {
  data() {
    return {
      todos: [],
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        // Call the readTodo method from TodoService to fetch all todos
        const todos = await TodoService.readTodo();
        // Update the todos data property with the fetched todos
        this.todos = todos;
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    },
    async editTodo(id) {
      try {
        // Redirect to edit page with todo ID
        this.$router.push({ name: 'Edit Todo', params: { id } });
      } catch (error) {
        console.error("Error editing todo:", error.message);
      }
    },

    async deleteTodo(id) {
      try {
        // Call the deleteTodo method from TodoService to delete the todo
        await TodoService.deleteTodo(id);
        console.error("Delete Success");
        // Refresh the list after deleting
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
