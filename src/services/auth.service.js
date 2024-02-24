// Membuat service yang berisi method untuk athentication
import axios from 'axios'; // import axios untuk membuat request HTTP
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3500/api/auth/'; // dekalarasi variabel API URL untuk auth

// membuat class Auth Service
class AuthService {
  constructor() {
    this.init();
  }

  init() {
// Menggunakan Interceptor  digunakan untuk menambahkan header auth token JWT ke setiap permintaan sebelum dikirim ke server
    axios.interceptors.request.use(
      config => {
        const token = Cookies.get('jwt-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

   // Membuat interceptor respons digunakan untuk menangani respon dari server, di mana jika status kode respon adalah 401 (Unauthorized), maka user akan di-logout dari sistem.
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response && error.response.status === 401) {
          
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }
// membuat method lpgin untuk merequest apakah user terdaftar atau tidak  kemudian menyimpan respons payload dari jwt ke cookies 
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          Cookies.set('user', response.data);
          Cookies.set('username', response.data.username);
          Cookies.set('name', response.data.name);
          Cookies.set('jwt-token', response.data.accessToken);
        }
        console.log('Login Response:', response.data); 
        return response.data;
      })
      .catch(error => {
        console.error('Login Error:', error); 
        throw error;
      });
  }
// membuat method logout untuk user logout dengan cara menghapus data user dari cookies
  logout() {
    Cookies.remove('user');
    Cookies.remove('username');
    Cookies.remove('name');
    Cookies.remove('jwt-token');
  }
// membuat method register untuk emnambahkan user baru ke database
  register(user) {
    return axios
      .post(API_URL + 'signup', {
        name: user.name,
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log('Registration Response:', response.data); 
        return response.data;
      })
      .catch(error => {
        console.error('Registration Error:', error); 
        throw error;
      });
  }
}

export default new AuthService();
