<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div class="card shadow-sm" style="width: 100%; max-width: 400px;">
        <div class="card-body p-4">
          <h1 class="text-center mb-4 custom-header">Signup</h1>
          <form @submit.prevent="signup" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="username" class="form-label">Username:</label>
              <input type="text" id="username" v-model="username" class="form-control custom-input" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input type="password" id="password" v-model="password" class="form-control custom-input" required />
            </div>
            <button type="submit" class="btn btn-primary w-100 custom-btn">Signup</button>
            <div>
                <button type="button" @click="signin" class="btn btn-secondary w-100 mt-2 custom-btn">Login,Already have account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signup() {
        // Dummy signup
      
        this.$router.push('/home')
      },
      signin(){
        this.$router.push('/Login')
      }
    }
  }
  </script>
  <style scoped>
.custom-input {
  border-radius: 0.25rem; /* Rounded corners */
  border-color: #007bff; /* Change to your desired color */
  font-size: 1.25rem; /* Increase the font size */
  padding: 0.75rem; /* Increase padding inside the input */
}

.custom-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Change to match your color */
  border-color: #007bff; /* Change to your desired color */
}

.custom-btn {
  background-color: #007bff; /* Change to your desired color */
  border-color: #007bff; /* Change to your desired color */
  font-weight: bold;
  font-size: 1.5rem; /* Increase the font size */
  padding: 0.75rem; /* Increase padding inside the button */
}

.custom-header {
  font-family: 'Arial', sans-serif;
  color: #007bff; /* Change to your desired color */
  font-size: 2.5rem; /* Increase the font size */
}

.form-label {
  font-size: 1.25rem; /* Increase the font size for labels */
}

.bg-light {
  background-color: #f8f9fa; /* Light background color */
}

.btn-secondary {
  background-color: #6c757d; /* Secondary button color */
  border-color: #6c757d; /* Secondary button border color */
}

.btn-secondary:hover {
  background-color: #5a6268; /* Secondary button hover color */
  border-color: #545b62; /* Secondary button border hover color */
}
</style>

  