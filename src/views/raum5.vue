<template>
  <div class="container">
    <h2>Der letzte Raum</h2>

    <p class="story">
      Du kommst in den letzten Raum. Auf einem Tisch liegt ein Zettel mit einer Zahlenreihe. Du erinnerst dich an die Caesar-Verschlüsselung, die du mal in der Schule gelernt hast (Tipp: +3).
    </p>

    <blockquote>
      9 21 18 11 8 26 8 12 11 17 4 6 11 23 8 17 7 24 5 12 22 23 16 12 21 26 12 6 11 23 12 10
    </blockquote>

    <p>Gib die entschlüsselte Nachricht ein:</p>
    <input v-model="messageInput" placeholder="Großbuchstaben & Leerzeichen"/>
    <button @click="checkMessage">Prüfen</button>

    <p v-if="feedback" class="feedback">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const messageInput = ref('')
const feedback = ref('')

// Richtige Nachricht (alles Großbuchstaben, Leerzeichen + Emoji optional)
const correctMessage = 'FROHE WEIHNACHTEN DU BIST MIR WICHTIG'

function checkMessage() {
  // Leerzeichen ignorieren, alles Großbuchstaben
  const cleanedInput = messageInput.value.toUpperCase().replace(/\s+/g, ' ')
  if (cleanedInput === correctMessage) {
    feedback.value = '✅ Perfekt! Du hast die Nachricht erfolgreich entschlüsselt! 🎉'
    router.push('/ende')
    localStorage.setItem('raum', 1)
  } else {
    feedback.value = '❌ Noch nicht ganz richtig. Überprüfe die Zahlen und die Caesar-Verschiebung!'
  }
}
</script>

<style scoped>
.container {
  max-width: 650px;
  margin: 60px auto;
  padding: 25px;
  background: #f5f5f5;
  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
  font-family: Arial, sans-serif;
  text-align: center;
}

.story {
  margin-bottom: 15px;
}

blockquote {
  font-style: italic;
  margin: 20px 0;
  color: #555;
}

input {
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 400px;
  text-align: center;
  margin-bottom: 10px;
}

button {
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
