<template> 
<div class="app-wrapper" v-if="!loading"><h1>
    <div class="dashboard-container">
        <!-- Header -->
        <header class="dashboard-header">
            <div class="header-title">
                <svg class="terminal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
                <h1>&gt; PYTHON_ADVENT.exe</h1>
            </div>
            <p class="header-subtitle">// Lehrer Dashboard - Schülerfortschritte überwachen</p>
        </header>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Schüler Gesamt</span>
                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <div class="stat-value">{{ klasse.students.length}}</div>
                <div class="stat-description">Registriert</div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Ø Fortschritt</span>
                    <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                </div>
                <div class="stat-value">{{ averageProgress
                    }}%</div>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: averageProgress + '%' }"></div>
                </div>
            </div>

            
        </div>

        <!-- Advent Calendar -->
        <section class="calendar-section">
    <h2 class="section-title">
      <span class="prompt">&gt;</span> Adventskalender Übersicht
    </h2>
    <div class="advent-grid">
      <div
        v-for="day in adventDays"
        :key="day.number"
        :class="['advent-day', getStatus(day.number)]"
      >
        <div class="day-number">{{ day.number }}</div>
        <div class="day-status">
          <!-- completed -->
          <template v-if="getStatus(day.number) === 'completed'">
            <svg class="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span class="completion-rate">{{ day.completion }}%</span>
          </template>

          <!-- in-progress -->
          <template v-else-if="getStatus(day.number) === 'in-progress'">
            <svg class="icon-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <span class="completion-rate">{{ day.completion }}%</span>
          </template>

          <!-- locked -->
          <template v-else>
            <svg class="icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </template>
        </div>
      </div>
    </div>
  </section>

        <!-- Student Progress -->
        <section class="students-section">
            <h2 class="section-title">
                <span class="prompt">&gt;</span> Schülerfortschritte
            </h2>
            <div class="students-list">
                <!-- Student 1 -->
                <div class="student-card">
                    <div class="student-info">
                        <div class="student-rank rank-1">
                            <svg class="rank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                            #1
                        </div>
                        <div class="student-details">
                            <h3 class="student-name">Anna Schmidt</h3>
                            <p class="student-id">ID: 0001</p>
                        </div>
                    </div>
                    <div class="student-progress">
                        <div class="progress-header">
                            <span class="progress-label">Fortschritt</span>
                            <span class="progress-value">95%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 95%"></div>
                        </div>
                    </div>
                    <div class="student-stats">
                        <div class="stat-item">
                            <div class="stat-item-label">Türchen</div>
                            <div class="stat-item-value">23/24</div>
                        </div>
                        <div class="stat-item streak">
                            <div class="stat-item-label">
                                <svg class="streak-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                </svg>
                                Streak
                            </div>
                            <div class="stat-item-value">16</div>
                        </div>
                    </div>
                </div>

                <!-- Student 2 -->
                <div class="student-card">
                    <div class="student-info">
                        <div class="student-rank rank-2">
                            <svg class="rank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                            #2
                        </div>
                        <div class="student-details">
                            <h3 class="student-name">Max Müller</h3>
                            <p class="student-id">ID: 0002</p>
                        </div>
                    </div>
                    <div class="student-progress">
                        <div class="progress-header">
                            <span class="progress-label">Fortschritt</span>
                            <span class="progress-value">88%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 88%"></div>
                        </div>
                    </div>
                    <div class="student-stats">
                        <div class="stat-item">
                            <div class="stat-item-label">Türchen</div>
                            <div class="stat-item-value">21/24</div>
                        </div>
                        <div class="stat-item streak">
                            <div class="stat-item-label">
                                <svg class="streak-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                </svg>
                                Streak
                            </div>
                            <div class="stat-item-value">14</div>
                        </div>
                    </div>
                </div>

                <!-- Student 3 -->
                <div class="student-card">
                    <div class="student-info">
                        <div class="student-rank rank-3">
                            <svg class="rank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                            #3
                        </div>
                        <div class="student-details">
                            <h3 class="student-name">Lisa Weber</h3>
                            <p class="student-id">ID: 0003</p>
                        </div>
                    </div>
                    <div class="student-progress">
                        <div class="progress-header">
                            <span class="progress-label">Fortschritt</span>
                            <span class="progress-value">83%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 83%"></div>
                        </div>
                    </div>
                    <div class="student-stats">
                        <div class="stat-item">
                            <div class="stat-item-label">Türchen</div>
                            <div class="stat-item-value">20/24</div>
                        </div>
                        <div class="stat-item streak">
                            <div class="stat-item-label">
                                <svg class="streak-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                                </svg>
                                Streak
                            </div>
                            <div class="stat-item-value">12</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="dashboard-footer">
            <p>[SYSTEM] Python Advent 2025 | v1.0.0 | Status: ONLINE</p>
        </footer>
    </div>

</h1></div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { db, auth } from '../firebase'
import { average, doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

const globalState = inject('globalState')

const loading = ref(true)
const route = useRoute()

const teacherData = ref({})
const klasse = ref(null)
const averageProgress = ref(0)
const averagePercentagePerDay = ref([])

const debug = globalState.debugMode
const date = new Date()
let day = 24

if(debug == false){
   day = date.getDate()
}


const currentDay = ref(day);

// Array mit den Completion-Raten für jeden Tag (hier beispielhaft)
const adventDays = ref([
  { number: 1, completion: 92 },
  { number: 2, completion: 88 },
  { number: 3, completion: 85 },
  { number: 4, completion: 63 },
  { number: 5, completion: 58 },
  { number: 6, completion: 45 },
  { number: 7, completion: 0 },
  { number: 8, completion: 0 },
  { number: 9, completion: 0 },
  { number: 10, completion: 0 },
  { number: 11, completion: 0 },
  { number: 12, completion: 0 },
  { number: 13, completion: 0 },
  { number: 14, completion: 0 },
  { number: 15, completion: 0 },
  { number: 16, completion: 0 },
  { number: 17, completion: 0 },
  { number: 18, completion: 0 },
  { number: 19, completion: 0 },
  { number: 20, completion: 0 },
  { number: 21, completion: 0 },
  { number: 22, completion: 0 },
  { number: 23, completion: 0 },
  { number: 24, completion: 0 }
]);

// Funktion, um den Status zu bestimmen
const getStatus = (dayNumber) => {
  if (dayNumber < currentDay.value) return 'completed';
  if (dayNumber === currentDay.value) return 'in-progress';
  return 'locked';
};

console.log("Klassen-ID aus URL:", route.params.classCode);

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const studentId = user.uid; // UID statt Email
      const studentDocRef = doc(db, "users", studentId);
      const studentDocSnap = await getDoc(studentDocRef);

      console.log("Eingeloggter Schüler UID:", studentId, studentDocRef, studentDocSnap);

      if (studentDocSnap.exists()) {
        teacherData.value = studentDocSnap.data();
        console.log("Schüler-Daten:", teacherData.value);
        klasse.value = teacherData.value.classen.find(c => c.id === route.params.classCode);
        console.log("Gefundene Klasse:", klasse.value, calculateAverageProgress());
        averageProgress.value = calculateAverageProgress();
        loading.value = false
      } else {
        console.log("Schüler-Dokument nicht gefunden!");
      }
    } else {
      console.log("Kein Schüler eingeloggt.");
    }
  });
});

function calculateAverageProgress() {
    if (!klasse.value || !klasse.value.students || klasse.value.students.length === 0) {
        return 0;
    }

    console.log("Berechnung des durchschnittlichen Fortschritts für Klasse:", klasse.value, klasse.value.students);

    
    

    
    const totalProgress = klasse.value.students.reduce((sum, student) => sum + ((Object.keys(student.losungen).length/day)*100 || 0), 0);
    console.log("Gesamtfortschritt:", totalProgress, Object.keys(klasse.value.students[0].losungen).length);
    return Math.round(totalProgress / klasse.value.students.length);
}

</script>

<style>
body{    font-family: 'JetBrains Mono', 'Courier New', monospace;
    background-color: #000000;
    color: #00ff00;
    line-height: 1.6;
    min-height: 100vh;
    background-image: 
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
        );
    animation: scanline 8s linear infinite;
}
</style>

<style scoped>
/* ===================================
   Python Advent Dashboard Styles
   Matrix/Hacker Theme - Schwarz/Grün
   =================================== */

/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    background-color: #000000;
    color: #00ff00;
    line-height: 1.6;
    min-height: 100vh;
    background-image: 
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
        );
    animation: scanline 8s linear infinite;
}

@keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
}

/* Container */
.dashboard-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

/* Header */
.dashboard-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.3);
}

.header-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.header-title h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    animation: glow-pulse 2s ease-in-out infinite;
}

.terminal-icon {
    width: 2rem;
    height: 2rem;
    animation: glow-pulse 2s ease-in-out infinite;
}

.header-subtitle {
    font-size: 0.875rem;
    color: rgba(0, 255, 0, 0.6);
    margin-left: 2.75rem;
}

@keyframes glow-pulse {
    0%, 100% {
        text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.4);
        filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.8));
    }
    50% {
        text-shadow: 0 0 20px rgba(0, 255, 0, 1), 0 0 30px rgba(0, 255, 0, 0.6);
        filter: drop-shadow(0 0 20px rgba(0, 255, 0, 1));
    }
}

/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-card {
    background-color: rgba(0, 20, 0, 0.5);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.stat-card:hover {
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.stat-label {
    font-size: 0.875rem;
    color: rgba(0, 255, 0, 0.7);
}

.stat-icon {
    width: 1.25rem;
    height: 1.25rem;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.stat-description {
    font-size: 0.75rem;
    color: rgba(0, 255, 0, 0.6);
}

/* Progress Bar */
.progress-bar {
    width: 100%;
    height: 0.5rem;
    background-color: rgba(0, 255, 0, 0.2);
    border: 1px solid rgba(0, 255, 0, 0.2);
    border-radius: 0.25rem;
    overflow: hidden;
    margin-top: 0.5rem;
}

.progress-fill {
    height: 100%;
    background-color: #00ff00;
    transition: width 0.5s ease;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

/* Section Titles */
.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.prompt {
    color: rgba(0, 255, 0, 0.6);
}

.calendar-section,
.students-section {
    margin-bottom: 2rem;
}

/* Advent Calendar Grid */
.advent-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.75rem;
}

.advent-day {
    aspect-ratio: 1;
    background-color: rgba(0, 20, 0, 0.3);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.advent-day.completed {
    background-color: rgba(0, 20, 0, 0.5);
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.advent-day.completed:hover {
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6), 0 0 40px rgba(0, 255, 0, 0.3);
}

.advent-day.in-progress {
    border-color: rgba(0, 255, 0, 0.3);
}

.advent-day.in-progress:hover {
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.advent-day.locked {
    background-color: rgba(0, 10, 0, 0.3);
    border-color: rgba(0, 255, 0, 0.2);
    opacity: 0.5;
    cursor: not-allowed;
}

.day-number {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.day-status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.icon-check,
.icon-circle,
.icon-lock {
    width: 1rem;
    height: 1rem;
}

.icon-check {
    color: #00ff00;
}

.icon-circle {
    color: rgba(0, 255, 0, 0.5);
}

.icon-lock {
    color: rgba(0, 255, 0, 0.4);
}

.completion-rate {
    font-size: 0.75rem;
    color: rgba(0, 255, 0, 0.7);
}

/* Student Cards */
.students-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.student-card {
    background-color: rgba(0, 20, 0, 0.3);
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 0.25rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1.5rem;
    align-items: center;
}

.student-card:hover {
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.student-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.student-rank {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.625rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    border: 1px solid;
}

.student-rank.rank-1 {
    background-color: #00ff00;
    color: #000000;
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.student-rank.rank-2,
.student-rank.rank-3 {
    background-color: rgba(0, 255, 0, 0.2);
    color: #00ff00;
    border-color: rgba(0, 255, 0, 0.5);
}

.student-rank.rank-4,
.student-rank.rank-5,
.student-rank.rank-6,
.student-rank.rank-7,
.student-rank.rank-8 {
    background-color: transparent;
    color: #00ff00;
    border-color: rgba(0, 255, 0, 0.3);
}

.rank-icon {
    width: 0.75rem;
    height: 0.75rem;
}

.student-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.125rem;
}

.student-id {
    font-size: 0.75rem;
    color: rgba(0, 255, 0, 0.6);
}

.student-progress {
    flex: 1;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
}

.progress-label {
    font-size: 0.75rem;
    color: rgba(0, 255, 0, 0.7);
}

.progress-value {
    font-size: 0.875rem;
    font-weight: 700;
}

.student-stats {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-end;
}

.stat-item {
    text-align: center;
}

.stat-item.streak {
    padding-left: 1.5rem;
    border-left: 1px solid rgba(0, 255, 0, 0.3);
}

.stat-item-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: rgba(0, 255, 0, 0.7);
    margin-bottom: 0.25rem;
}

.streak-icon {
    width: 0.75rem;
    height: 0.75rem;
}

.stat-item-value {
    font-size: 1.125rem;
    font-weight: 700;
}

/* Footer */
.dashboard-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 255, 0, 0.3);
    text-align: center;
}

.dashboard-footer p {
    font-size: 0.75rem;
    color: rgba(0, 255, 0, 0.6);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .student-card {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .student-stats {
        justify-content: flex-start;
    }
}

@media (max-width: 768px) {
    .dashboard-container {
        padding: 1rem;
    }

    .header-title h1 {
        font-size: 1.5rem;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .advent-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    .student-info {
        flex-direction: column;
        align-items: flex-start;
    }
}

@media (max-width: 480px) {
    .advent-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }

    .day-number {
        font-size: 1.25rem;
    }
}
</style>