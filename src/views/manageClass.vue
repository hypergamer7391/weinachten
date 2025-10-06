<template>
  <div class="app-wrapper">
    <div class="überschrift">
      <h1>Neue Klasse erstellen</h1>
    </div>
    <div class="content">
      <form @submit.prevent="createClass" class="create-form">
        <label for="className">Klassenname</label>
        <input type="text" id="className" v-model="className" required />

        <label for="studentCount">Anzahl der Schüler</label>
        <input type="number" id="studentCount" v-model.number="studentCount" min="1" required />

        <button class="create-btn" type="submit" :disabled="loading">
          {{ loading ? 'Erstelle...' : 'Klasse erstellen' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
        <div v-if="usernames.length" class="usernames-list">
          <strong>Schüler-Usernamen:</strong>
          <ul>
            <li v-for="username in usernames" :key="username">{{ username }}</li>
          </ul>
        </div>
      </form>
    </div>
    <div class="footer">
      <a href="/">Startseite</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db, auth } from '../firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

const className = ref('')
const studentCount = ref(1)
const loading = ref(false)
const error = ref('')
const usernames = ref([])

async function createClass() {
  error.value = ''
  usernames.value = []
  loading.value = true

  if (!className.value || studentCount.value < 1) {
    error.value = 'Bitte alle Felder korrekt ausfüllen.'
    loading.value = false
    return
  }

  // Schüler-Usernamen generieren
  const students = []
  for (let i = 1; i <= studentCount.value; i++) {
    const username = `${className.value.replace(/\s+/g, '').toLowerCase()}${i}`
    students.push({
      username,
      permissions: ['student']
    })
    usernames.value.push(username)
  }

  // Klasse-Objekt
  const newClass = {
    name: className.value,
    createdAt: new Date(),
    students: students
  }

  // Lehrer-Dokument updaten: Array "classen" erweitern
  try {
    const userRef = doc(db, "users", auth.currentUser.uid)
    const userSnap = await getDoc(userRef)
    let classen = []
    if (userSnap.exists() && Array.isArray(userSnap.data().classen)) {
      classen = userSnap.data().classen
    }
    classen.push(newClass)
    await updateDoc(userRef, { classen })
  } catch (e) {
    error.value = 'Fehler beim Speichern: ' + e.message
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

.create-form {
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

.create-btn {
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

.create-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.create-btn:hover:enabled {
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

.usernames-list {
  margin-top: 1rem;
  background: #181818;
  border: 2px solid #00ff00;
  border-radius: 4px;
  padding: 1rem;
  font-size: 1rem;
  text-shadow: 0 0 6px #00ff00;
}

.usernames-list ul {
  padding-left: 1.2rem;
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