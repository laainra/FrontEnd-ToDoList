<!-- Membuat Halaman Todo -->
<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h2>To Do List</h2>
          <div class="col-12">
            <h3>Edit New To Do</h3>
          </div>
        </div>
        <EditToDoForm  />

      </div>
    </div>
  </template>
  
  <script>

  import EditToDoForm from "./components/EditToDoForm.vue"; // import komponen form edit todo
  
  export default {
    name: "Todo",
    components: {
      EditToDoForm,

    },
    data() {
      return {
        title: "",
        description: "",
        status: "", 
      };
    },
   
  };
  </script>
  