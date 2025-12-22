<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const duration = ref('') // Dauer in Minuten/Sekunden

onMounted(() => {
  const start = localStorage.getItem('gameStart')
  if (start) {
    const now = Date.now()
    const diffMs = now - parseInt(start) // Millisekunden
    const minutes = Math.floor(diffMs / 60000)
    const seconds = Math.floor((diffMs % 60000) / 1000)
    duration.value = `${minutes} Minuten und ${seconds} Sekunden`
  }
})

function restart() {
    router.push('/')
    localStorage.removeItem('gameStart')
    localStorage.removeItem('raum')
}
</script>

<template>
  <div class="container">
    <h1>🎉 Herzlichen Glückwunsch! 🎉</h1>
    <p>Du hast alle Rätsel gelöst!</p>
    <p><strong>Deine Spielzeit:</strong> {{ duration }}</p>
    <p class="message">
      FROHE WEIHNACHTEN!<br/>
      Du bist mir sehr wichtig ❤️
    </p>
    <button @click="restart">Nochmal spielen</button>
  </div>
</template>


<style scoped>
.container {
  position: relative;
  max-width: 700px;
  margin: 50px auto;
  padding: 40px 20px;
  background: #fff0f8;
  border-radius: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  overflow: hidden;
}

h1 {
  font-size: 2.5rem;
  color: #d32f2f;
  margin-bottom: 20px;
}

.message {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 30px;
}

button {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
  background-color: #218838;
}

.tree {
  width: 200px;
  margin: 20px auto;
  display: block;
}


</style>
