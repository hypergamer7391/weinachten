 <template>
  <div class="container">
    <h2>📅 Unser Anfang</h2>

    <p class="story">
      In der Kiste liegt ein letzter Zettel.<br />
      Darauf steht:
    </p>

    <blockquote>
      „Manche Tage vergisst man nie.<br />
      Wann hat alles begonnen?“
    </blockquote>

    <p>Gib das Datum ein, an dem wir uns kennengelernt haben:</p>

    <input
      v-model="dateInput"
      type="date"
    />

    <button @click="checkDate">Bestätigen</button>

    <p v-if="feedback" class="feedback">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const dateInput = ref('')
const feedback = ref('')

// 👉 HIER DAS RICHTIGE DATUM EINTRAGEN (YYYY-MM-DD)
const correctDate = '2025-12-05' // Beispiel!

function checkDate() {
  if (dateInput.value === correctDate) {
    router.push('/raetsel4') // nächste Route
    localStorage.setItem('raum', 4)
  } else {
    feedback.value = '❌ Das fühlt sich noch nicht ganz richtig an.'
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
  font-size: 16px;
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
