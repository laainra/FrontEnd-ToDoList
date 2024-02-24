import axios from 'axios';

const API_URL = 'http://localhost:3500/api/todos/';

class TodoService {
  constructor() {
    this.init();
  }

  init() {
    // Request interceptor
    axios.interceptors.request.use(
      config => {
        // You can add any logic here before the request is sent
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axios.interceptors.response.use(
      response => {
        // You can add any logic here for handling successful responses
        return response;
      },
      error => {
        // You can add any logic here for handling error responses
        return Promise.reject(error);
      }
    );
  }

  async createTodo(todoData) {
    try {
      const response = await axios.post(API_URL, todoData);
      console.log('Todo created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error.message);
      throw error;
    }
  }

  async readTodo() {
    try {
      const response = await axios.get(API_URL);
      console.log('Todo list retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error reading todo list:', error.message);
      throw error;
    }
  }

  async editTodo(id, updatedTodoData) {
    try {
      const response = await axios.put(`${API_URL}${id}`, updatedTodoData);
      console.log('Todo edited:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error editing todo:', error.message);
      throw error;
    }
  }

  async deleteTodo(id) {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      console.log('Todo deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo:', error.message);
      throw error;
    }
  }

  async getTodoById(id) {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      console.log('Todo:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting todo by index:', error.message);
      throw error;
    }
  }
}

export default new TodoService();
