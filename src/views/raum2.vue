<template>
  <div class="container">
    <h2>📦 In der Kiste</h2>

    <p class="story">
      In der Kiste liegt ein Zettel.<br />
      Darauf steht:
    </p>

    <blockquote>
      „Egal wie viele Kilometer zwischen uns liegen –<br />
      sag mir, wie weit es wirklich ist.“
    </blockquote>

    <p>Gib die Distanz zwischen uns in Kilometern ein:</p>

    <input
      v-model="distanceInput"
      type="number"
      placeholder="Kilometer"
    />

    <button @click="checkDistance">Bestätigen</button>

    <p v-if="feedback" class="feedback">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const distanceInput = ref('')
const feedback = ref('')

// 👉 HIER trägst du die richtige Distanz ein
const richtigeDistanz = 156 // z.B. 123 km

function checkDistance() {
  if (Number(distanceInput.value) === richtigeDistanz) {
    router.push('/raetsel3') // neue Route
    localStorage.setItem('raum', 3)
  } else {
    feedback.value = '❌ Das fühlt sich noch nicht richtig an.'
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 60px auto;
  padding: 25px;
  background: #f5f5f5;
  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
  text-align: center;
  font-family: Arial, sans-serif;
}

.story {
  margin-bottom: 10px;
}

blockquote {
  font-style: italic;
  margin: 20px 0;
  color: #555;
}

input {
  padding: 10px;
  width: 150px;
  font-size: 16px;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}

button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background: #28a745;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #218838;
}

.feedback {
  margin-top: 15px;
  font-weight: bold;
}
</style>
