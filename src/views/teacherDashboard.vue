<template>
  <div class="app-wrapper">
    <div class="überschrift">
      <h1>Lehrer-Dashboard</h1>
  
    </div>
    <div class="content" v-if="!loading">
      <p>
        Willkommen im Lehrer-Dashboard! Wählen Sie oben eine Klasse aus, um sie zu verwalten.
      </p>
      <div v-if="classes.length != 0" class="class-select">
        <label for="classSelect">Klasse auswählen:</label>
        <select id="classSelect" v-model="selectedClass">
          <option v-for="klasse in classes" :key="klasse.id" :value="klasse.id">
            {{ klasse.name }}
          </option>
        </select>
      </div>
      <div v-if="selectedClass" class="manage-section">
        <h2>Verwaltung für: {{ getClassName(selectedClass) }}</h2>
        <button class="dashboard-btn">Schüler-Fortschritt ansehen</button>
        <button class="dashboard-btn">Klasse bearbeiten</button>
        <button class="dashboard-btn">Schüler bearbeiten</button>
      </div>
      <div  class="manage-section">
        <h2>Verwaltung aller Klassen</h2>
        <button class="dashboard-btn" @click="router.push('/teacher-create-class')">Neue Klasse erstellen</button>
       
      </div>
      <div class="info-box">
        <strong>Hinweis:</strong> Die Funktionen sind noch im Aufbau. Bei Fragen wenden Sie sich bitte an das Admin-Team.
      </div>
    </div>
    <div class="footer">
      <a href="/">Startseite</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
const router = useRouter()
// Beispiel-Daten für Klassen
const classes = ref([])
const loading = ref(true)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const teacherId = user.uid; // UID statt Email
    const teacherDocRef = doc(db, "users", teacherId);
    const teacherDocSnap = await getDoc(teacherDocRef);

    console.log("Eingeloggter Lehrer UID:", teacherId, teacherDocRef, teacherDocSnap);

    if (teacherDocSnap.exists()) {
      const teacherData = teacherDocSnap.data();
      console.log("Lehrer-Daten:", teacherData);
      classes.value = teacherData.classen || [];
      console.log("Alle Klassen des eingeloggten Lehrers:", classes);
    } else {
      console.log("Lehrer-Dokument nicht gefunden!");
    }
  } else {
    console.log("Kein Lehrer eingeloggt.");
  }
    loading.value = false
});

const selectedClass = ref(classes.value.length ? classes.value[0].id : '')

function getClassName(id) {
  const klasse = classes.value.find(k => k.id === id)
  return klasse ? klasse.name : ''
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
  max-width: 600px;
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.class-select {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

select {
  background: #181818;
  color: #00ff00;
  border: 2px solid #00ff00;
  border-radius: 4px;
  padding: 0.7rem;
  font-family: monospace;
  font-size: 1rem;
}

select:focus {
  outline: none;
  border-color: #a0ffa0;
}

.manage-section {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.dashboard-btn {
  background-color: transparent;
  border: 2px solid #00ff00;
  color: #00ff00;
  font-family: monospace;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 2rem 10rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-shadow: 0 0 6px #00ff00;
  align-self: flex-start;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
    width: 100%;
}

.dashboard-btn:hover {
  background-color: #00ff00;
  color: #0f0f0f;
  box-shadow: 0 0 15px #00ff00;
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