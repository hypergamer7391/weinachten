<template>
  <div class="container">
    <h2>🔐 Der Zahlencode</h2>

    <p class="intro">
      An der Tür zum nächsten Raum ist ein dreistelliges Zahlenschloss.<br />
      Alle Hinweise sind wahr.
    </p>

    <ul class="hints">
      <li>➊ Die Summe aller drei Ziffern ist <strong>15</strong></li>
      <li>➋ Die mittlere Ziffer ist <strong>doppelt so groß</strong> wie die erste</li>
      <li>➌ Die letzte Ziffer ist <strong>um 1 kleiner</strong> als die mittlere</li>
    </ul>

    <input
      v-model="code"
      maxlength="3"
      placeholder="___"
    />

    <button @click="check">Prüfen</button>

    <p v-if="feedback" class="feedback">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const code = ref('')
const feedback = ref('')

const correctCode = '365'

function check() {
  if (code.value === correctCode) {
    router.push('/raetsel5')
    localStorage.setItem('raum', 5)
  } else {
    feedback.value = '❌ Die Hinweise passen noch nicht zusammen.'
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
  font-family: Arial, sans-serif;
  text-align: center;
}

.hints {
  text-align: left;
  margin: 20px 0;
}

input {
  font-size: 22px;
  letter-spacing: 8px;
  text-align: center;
  padding: 10px;
  width: 120px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  margin-left: 10px;
  padding: 10px 20px;
  background: #28a745;
  border: none;
  color: white;
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
