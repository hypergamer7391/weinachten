<template>
  <div class="site" v-if="!loading && !isLoggedIn">
    <div class="überschrift">
      <h1>Python im Advent</h1>
      Willkommen!<br><br>
      <p class="info-box">
        
        <strong>Du bist Schüler?</strong><br><br>
        <a href="/login-student">Hier geht's zum Schüler Login</a>

      </p>
      <br><br>
      <p class="info-box">
        
        <strong>Du bist Lehrer?</strong><br><br>
        <a href="/login-teacher">Hier geht's zum Lehrer Login</a><br><br>
        <a href="/register-teacher">Hier geht's zur Lehrer Registrierung</a>
        
      </p>
      <br><br>
      <p class="info-box">
        
        <strong>Du bist Privatperson?</strong><br><br>
        <a href="/login-privat">Hier geht's zum Privatpersonen Login</a><br><br>
        <a href="/register-privat">Hier geht's zur Privatpersonen Registrierung</a>
        
      </p>
    </div>
    <div class="footer">
      <a href="/impressum">Impressum</a>
    </div>
  </div>
  <div class="site" v-if="!loading && isLoggedIn">
    <div class="überschrift">
      <p class="username">Angemeldet als {{ user.role }}: {{ user.name.split('@')[0] }}</p>
      <a href="/teacher-dashboard" class="link" v-if="user.role =='teacher'">Zum Lehrer Dashboard</a>
      <h1>Python im Advent</h1>
    </div>
    <div class="numbers">
      <button
        v-for="number in inputs"
        :key="number"
        @click="redirect_page(number)"
        class="number"
        :class="{ 'disabled-button': number > day, 'yellow-button': !done_days.includes(number) }"
        :disabled="number > day"
      >
        {{ number }}
      </button>
    </div>
    <div class="footer">
      <a href="/impressum">Impressum</a>
      <p> | </p>
      <a @click="logout()">Logout</a>
    </div>
  </div>
</template>

<style scoped>
.site {
  background-color: #0f0f0f;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0;
  user-select: none;
  position: relative;
}

.username {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 6px #00ff00;
}

.überschrift {
  margin: 2rem 0 1rem;
  text-shadow: 0 0 10px #00ff00;
}

h1 {
  font-weight: 900;
  font-size: 2.5rem;
  letter-spacing: 0.2rem;
  text-transform: none;
}

.numbers {
  width: 70vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  justify-items: center;
}

button {
  background-color: transparent;
  border: 2px solid #00ff00;
  color: #00ff00;
  font-family: monospace;
  font-weight: bold;
  width: 100%;
  padding: 3rem 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-shadow: 0 0 6px #00ff00;
  user-select: none;
}

button:hover {
  background-color: #00ff00;
  color: #0f0f0f;
  box-shadow: 0 0 15px #00ff00;
}
.yellow-button{
  border: 2px solid #fffb00;
  text-shadow: 0 0 6px #ffea00;
  color: #f6ff00;
}

.yellow-button:hover {
  background-color: #ffe600;
  /* color: #ffffff; */
  box-shadow: 0 0 15px #f6ff00;
}
.disabled-button{
  border: 2px solid #ff0000;
  text-shadow: 0 0 6px #ff0000;
  color: #ff0000;
}
.disabled-button:hover {
  background-color: #ff0000;
  /* color: #ffffff; */
  box-shadow: 0 0 15px #ff0000;
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

.info-text {
  margin-top: 1rem;
  font-size: 1.2rem;
  text-align: center;
  color: #00ff00;
  text-shadow: 0 0 6px #00ff00;
}
.info-box {
  background: #181818;
  border: 2px solid #00ff00;
  border-radius: 4px;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 1rem;
  text-shadow: 0 0 6px #00ff00;
}
.link {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 6px #00ff00;
  width: 100%;
  display: block;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { inject } from 'vue'
import {auth, db} from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'

const user = ref('')
const globalState = inject('globalState')
const isLoggedIn = ref(false)
const loading = ref(true)
const done_days = ref([])

// Zugriff auf debugMode
console.log(globalState.debugMode)

async function logout() {
  try {
    await auth.signOut()

  } catch (error) {
    alert('Fehler beim Ausloggen: ' + error.message)
  }
}

async function loadDoneDays() {
  
  const querySnapshot = await getDocs(collection(db, "users"));
  let gefundeneLoesungen = null;
  console.log(user.value.name)

  for (const document of querySnapshot.docs) {
    const userData = document.data();
    const classen = userData.classen || [];

    for (const klasse of classen) {
      const klasseCode = klasse.code.toLowerCase();
      const lehrer = userData;

      console.log("Lehrer:", lehrer);
      console.log("Klasse:", klasse);
      console.log(user.value.name)

      const userDomain = user.value.name.split('@')[1].split('.')[0];
      const username = user.value.name.split('@')[0];

      if (klasseCode === userDomain) {
        const student = klasse.students?.find(s => s.username === username);
        if (student) {
          // ✅ Hier wird einfach die Variable mit den Lösungen zurückgegeben
          gefundeneLoesungen = student.losungen || {};
          break;
        }
      }
    }

    if (gefundeneLoesungen) break;
  }
  console.log("Gefundene Lösungen:", Object.keys(gefundeneLoesungen).includes(1), gefundeneLoesungen);

  done_days.value = Object.keys(gefundeneLoesungen).map(Number);
  console.log("Done Days:", done_days.value);


}

// Ändern möglich
onMounted(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
      console.log(snap)
      if (snap.exists()) {
        user.value = {
          name: snap.data().name || firebaseUser.email,
          role: snap.data().role || 'Unbekannt',
          isAdmin: snap.data().isAdmin || false
        }
        isLoggedIn.value = true

        loadDoneDays()
      } else {
        isLoggedIn.value = false
      }
    } else {
      isLoggedIn.value = false
    }
    loading.value = false
  })
})

const debug = globalState.debugMode
const date = new Date()
let day = 24

if(debug == false){
   day = date.getDate()
}

console.log(day, date)

const inputs = ref(
  Array.from({ length: 24 }, (_, i) => i + 1)
)

function redirect_page(day){
    router.push(`/python/${day}`)
}
</script>
