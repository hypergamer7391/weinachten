<template>
  <div class="app-wrapper">
    <div class="überschrift">
      <h1>Lehrer-Login</h1>
    </div>
    <div class="content">
      <form @submit.prevent="loginTeacher" class="login-form">
        <label for="email">E-Mail-Adresse</label>
        <input type="email" id="email" v-model="email" required />

        <label for="password">Passwort</label>
        <input type="password" id="password" v-model="password" required />

        <button class="login-btn" type="submit" :disabled="loading">
          {{ loading ? 'Logge ein...' : 'Login' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
    <div class="footer">
      <a href="/">Startseite</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function loginTeacher() {
  error.value = ''
  loading.value = true
  try {
    
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = 'Login fehlgeschlagen: ' + e.message
  }
  loading.value = false
}
</script>

<style scoped>
.app-wrapper {
  background-color: #0f0f0f;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  user-select: none;
}

.überschrift {
  margin-bottom: 2rem;
  text-shadow: 0 0 10px #00ff00;
}

h1 {
  font-weight: 900;
  font-size: 2.2rem;
  letter-spacing: 0.15rem;
  text-transform: lowercase;
}

.content {
  max-width: 400px;
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.2rem;
}

input {
  background: #181818;
  color: #00ff00;
  border: 2px solid #00ff00;
  border-radius: 4px;
  padding: 0.7rem;
  font-family: monospace;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

input:focus {
  outline: none;
  border-color: #a0ffa0;
}

.login-btn {
  background-color: transparent;
  border: 2px solid #00ff00;
  color: #00ff00;
  font-family: monospace;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-shadow: 0 0 6px #00ff00;
  align-self: center;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-btn:hover:enabled {
  background-color: #00ff00;
  color: #0f0f0f;
  box-shadow: 0 0 15px #00ff00;
}

.error {
  color: #ff0000;
  text-shadow: 0 0 6px #ff0000;
  font-size: 1rem;
  margin-top: 0.5rem;
}

a {
  color: #00ff00;
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  color: #a0ffa0;
}

.footer {
  position: fixed;
  bottom: 2%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>