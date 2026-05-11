<template>
  <div>
    <!-- The Modal -->
    <div class="modal" :class="{ 'show': isModalOpen }" v-if="isModalOpen">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{ isLogin ? 'Login' : 'Register' }}</h4>
            <button type="button" class="close-button" @click="closeModal">&times;</button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group" v-if="!isLogin">
                <label for="name">Имя</label>
                <input type="text" id="name" v-model="name" required>
              </div>
              <div class="form-group">
                <label for="email">Email адрес</label>
                <input type="email" id="email" v-model="email" required>
              </div>
              <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" id="password" v-model="password" required>
              </div>
              <div class="form-group" v-if="!isLogin">
                <label for="confirmPassword">Подтверждение пароля</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required>
              </div>
              <button type="submit" class="submit-button">{{ isLogin ? 'Авторизация' : 'Регистрация' }}</button>
            </form>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="toggle-button" @click="toggleAuthMode">
              {{ isLogin ? 'Регистрация' : 'Авторизация' }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div class="modal-backdrop" v-if="isModalOpen"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isModalOpen: Boolean,
});

const isLogin = ref(true);

const emit = defineEmits(['closeModal']);

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const closeModal = () => {
  emit('closeModal');
};

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
};

const handleSubmit = () => {
  if (isLogin.value) {
    // Handle login
    login();
    console.log('Login:', { email: email.value, password: password.value });
  } else {
    // Handle registration
    if (password.value === confirmPassword.value) {
      register();
      console.log('Регистрация:', { email: email.value, password: password.value });
    } else {
      alert('Пароль не подходит');
    }
  }
};

async function login() {
  const response = await fetch('http://api.shop-spare-parts.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            device_name: 'web'
        })
    });
    const data = await response.json();

    if (data?.user) {
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.reload();
      emit('closeModal');
    }
}

async function register() {
  const response = await fetch('http://api.shop-spare-parts.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
            device_name: 'web'
        })
    });
    const data = await response.json();

    if (data?.user) {
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.reload();
      emit('closeModal');
    }
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
}

.modal-dialog {
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  background-color: #fefefe;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
}

.modal-header, .modal-footer {
  padding: 10px 20px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.toggle-button {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #5a6268;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>