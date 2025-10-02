<template>
    <div class="site">
  <div class="überschrift">
    <h1>Python im Advent</h1>
  </div>

  <div class="numbers">
    <button
  v-for="number in inputs"
  :key="number"
  @click="redirect_page(number)"
  class="number"
  :class="{ 'disabled-button': number > day }"
  :disabled="number > day"
>
  {{ number }}
</button>

  </div>
    <div class="footer" style="position: fixed; bottom: 2%; left:50%; width: 100%;"><a href="/impressum">Impressum</a></div>

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
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { inject } from 'vue'

const globalState = inject('globalState')

// Zugriff auf debugMode
console.log(globalState.debugMode)

// Ändern möglich


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
