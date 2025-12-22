<template>
  <div class="container">
    <h2>Die Kiste</h2>
    <p>Hey Jenny, du kommst in einen Raum, hier findest du eine Kiste und 6 Kerzen. Zum Anfang zieh die Kerzen in die richtige Reihenfolge. Nutze die Hinweise unten!</p>

    <ul class="candles">
      <li
        v-for="(candle, index) in candles"
        :key="candle.name"
        class="candle"
        draggable="true"
        @dragstart="dragStart(index)"
        @dragover.prevent
        @drop="drop(index)"
      >
        <div class="candle-box" :style="{ background: candle.gradient }"></div>
        <div class="candle-name">{{ candle.name }}</div>
      </li>
    </ul>

    <div class="hints">
      <p>Hinweise:</p>
      <ul>
        <li>Gelb ist die zweite Kerze</li>
        <li>Amber steht direkt vor Indigo</li>
        <li>Magenta steht vor Crimson</li>
        <li>Turquoise ist nicht die dritte Kerze</li>
        <li>Crimson ist nicht die letzte Kerze</li>
      </ul>
    </div>

    <button @click="checkOrder">Prüfen</button>

    <p class="feedback" v-if="feedback">{{ feedback }}</p>

    <div class="code-eingabe" v-if="solved">
      <p>Die Kiste hat ein Zahlenschloss mit einem sechsstelligen Code. Um den Code herauszubekommen schau dir die Kerzen genau an. Jede Kerze steht für eine Zahl.</p>
      <input type="number" v-model="code" placeholder="Gib hier den Code ein" />
      <button @click="openKiste">Kiste öffnen</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 6 Kerzen mit unterschiedlichen Buchstabenanzahlen
const candles = ref([
  { name: 'Amber', gradient: 'linear-gradient(to top, #ffbf00, #ff8000)' },     
  { name: 'Indigo', gradient: 'linear-gradient(to top, #4b0082, #551a8b)' },  
  { name: 'Magenta', gradient: 'linear-gradient(to top, #ff00ff, #c71585)' }, 
  { name: 'Turquoise', gradient: 'linear-gradient(to top, #40e0d0, #00ced1)' },
  { name: 'Crimson', gradient: 'linear-gradient(to top, #dc143c, #b22222)' },
    { name: 'Gelb', gradient: 'linear-gradient(to top, #ffed4a, #ffd700)' },    

])
const draggedIndex = ref(null)
const feedback = ref('')
const solved = ref(false)
const code = ref('')
// Drag & Drop Methoden
function dragStart(index) {
  draggedIndex.value = index
}

function drop(index) {
  const temp = candles.value[index]
  candles.value[index] = candles.value[draggedIndex.value]
  candles.value[draggedIndex.value] = temp
  draggedIndex.value = null
}

// Prüfen der Reihenfolge nach eindeutigen Hinweisen
function checkOrder() {
  const order = candles.value.map(c => c.name)

  const amberPos = order.indexOf('Amber') + 1
  const gelbPos = order.indexOf('Gelb') + 1
  const indigoPos = order.indexOf('Indigo') + 1
  const magentaPos = order.indexOf('Magenta') + 1
  const crimsonPos = order.indexOf('Crimson') + 1
  const turquoisePos = order.indexOf('Turquoise') + 1

  if (
    gelbPos !== 2 ||              // Gelb zweite Kerze
    amberPos !== indigoPos -1 ||  // Amber direkt vor Indigo
    magentaPos >= crimsonPos ||   // Magenta vor Crimson
    turquoisePos === 3 ||         // Turquoise nicht dritte
    crimsonPos === 6               // Crimson nicht letzte
  ) {
    feedback.value = '❌ Die Reihenfolge passt noch nicht. Überlege die Hinweise!'
    solved.value = false
  } else {
    feedback.value = '✅ Richtig! Du hast die Kerzen logisch sortiert.'
    solved.value = true
  }
}

function openKiste() {
    console.log(code.value)
  if (code.value === 745679) {
    router.push('/raetsel2')
    localStorage.setItem('raum', 2)
  } else {
    alert('Falscher Code! Versuche es erneut.')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

h2 {
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
}

.candles {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.candle {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
  user-select: none;
  transition: transform 0.2s;
}

.candle:hover {
  transform: translateY(-5px);
}

.candle-box {
  width: 60px;
  height: 140px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.candle-name {
  margin-top: 6px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.feedback {
  margin-top: 15px;
  font-weight: bold;
  font-size: 16px;
}

.hints {
  margin-bottom: 20px;
  text-align: left;
}
.hints ul {
  padding-left: 20px;
}
.hints li {
  font-size: 14px;
  color: #555;
}

.code-eingabe {
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #222;
}
</style>
