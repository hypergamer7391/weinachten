<template>
  <div class="container">
    <h1>🎄 Willkommen zu deinem Weihnachts-Escape-Game! 🎄</h1>

    <p class="intro">
      Hey Jenny! Mach dich bereit für ein kleines Abenteuer.  
      Du wirst Rätsel lösen, Codes knacken und Nachrichten entschlüsseln.
    </p>

    <div class="rules">
      <h2>Regeln</h2>
      <ul>
        <li>Du darfst googeln und Maps benutzen.</li>
        <li>Es kann hilfreich sein, Papier und Stift bereit zu halten.</li>
        <li>Plane etwa 30–60 Minuten ein.</li>
        <li>Hast du ein Rätsel gelöst, geht es automatisch weiter zur nächsten Etappe.</li>
        <li>Viel Spaß! 🎉</li>
      </ul>
    </div>

    <button @click="startGame">Los geht's!</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function startGame() {
  localStorage.setItem('gameStart', Date.now())
  localStorage.setItem('raum', 1) // Setze den aktuellen Raum auf 1
  router.push('/raetsel1') // erste Rätsel-Route (Kerzenrätsel)
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 80px auto;
  padding: 40px 30px;
  background: #fffaf0;
  border-radius: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

h1 {
  font-size: 2.5rem;
  color: #d32f2f;
  margin-bottom: 20px;
}

.intro {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
}

.rules {
  text-align: left;
  margin-bottom: 30px;
}

.rules h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #8b0000;
}

.rules ul {
  list-style: disc inside;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

button {
  padding: 14px 28px;
  font-size: 18px;
  background-color: #28a745;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
  background-color: #218838;
}
</style>
