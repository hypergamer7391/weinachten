<template>
  <div class="app-wrapper">
    <div class="überschrift">
      <h1>Lehrer-Registrierung</h1>
    </div>
    <div class="content">
      <form @submit.prevent="registerTeacher" class="register-form">
        <label for="email">E-Mail-Adresse</label>
        <input type="email" id="email" v-model="email" required />

        <label for="password">Passwort</label>
        <input type="password" id="password" v-model="password" required />

        <button class="register-btn" type="submit" :disabled="loading">
          {{ loading ? 'Registriere...' : 'Registrieren' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">Registrierung erfolgreich! Du kannst dich jetzt einloggen.</p>
      </form>
    </div>
    <div class="footer">
      <a href="/">Startseite</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)

async function registerTeacher() {
  error.value = ''
  success.value = false
  loading.value = true
  try {
   
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

    await setDoc(doc(db, "users", userCredential.user.uid), {
      username: email.value,
      role: "teacher",
      classes: [],
      createdAt: new Date()
    });
    success.value = true
    email.value = ''
    password.value = ''
  } catch (e) {
    error.value = e.message
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

.register-form {
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

.register-btn {
  background-color: transparent;
  border: 2px solid #00ff00;
  color: #00ff00;
  font-family: monospace;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.8rem 5rem;
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

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-btn:hover:enabled {
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

.success {
  color: #00ff00;
  text-shadow: 0 0 6px #00ff00;
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