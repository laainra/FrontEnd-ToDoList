// membuat class todo service yang berisi method uyang berisi API CRUD untuk request dengan axios
import axios from 'axios'; // import axios untuk membuat request HTTP

const API_URL = 'http://localhost:3500/api/todos/';// dekalarasi variabel API URL untuk api todo

class TodoService {
  constructor() {
    this.init();
  }

  init() {
//  // interceptor request
    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // interceptor resppon
    axios.interceptors.response.use(
      response => {

        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
// membuat method untuk membuat request api post untuk menambahka todo ke database
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
// membuat method untuk membuat request api get untuk membaca semua data todo dari  database
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
// membuat method untuk membuat request api put untuk mengedit data  todo dari  database berdasarkan id
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
// membuat method untuk membuat request api delete untuk mengahpsu data todo dari  database
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
// membuat method untuk membuat request api pget untuk membaca data  todo dari  database berdasarkan id
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
