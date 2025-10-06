<template>
  <main>

    <iframe :class="{ active: !editor_active }" :src="`../../html/tag${$route.params.id}.html`" />
    <div class="navigation">
      <a @click='weiterleitung("")'>Startseite</a>
      <a v-if="editor_active" @click="toggle_editor()">Editor ausblenden</a>
      <a v-if="!editor_active" @click="toggle_editor()">Editor einblenden</a>
      <div class="seiten">
        <a @click="losung()">Lösung einreichen</a>
        <a @click='weiterleitung("back")'>Vorherige Tag</a>
        <a @click='weiterleitung("next")'>Nächste Tag </a>

      </div>
    </div>
    <div v-show="editor_active" class="editor_space">

      <div class="editor" ref="editorContainer" style="height: 100%; width:70%; border: 1px solid #ccc" />
      <div class="ergebnis">
        <div class="ergebnis-only">
          <pre id="terminal">{{ result }} <span v-if="showInputField" ref="inputLine" contenteditable="true" @keydown="handleKeydown"></span>
</pre>

        </div>
        <button @click="runPython" :disabled="!isReady">&#9654;</button>
      </div>
    </div>

  </main>
</template>

<style>
body {
  font-family: 'Courier New', Courier, monospace;
  background-color: black;
}
</style>

<style scoped>
body {
  margin: 0;
  background-color: #0f0f0f;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  user-select: none;
}

.navigation {
  height: 5vh;
  background-color: #101010;
  border: 1px solid #00ff00;
  color: #00ff00;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  font-weight: bold;

  box-shadow: 0 0 10px #00ff00;
}

.navigation a {
  margin: 0 0.5rem;
  cursor: pointer;
  color: #00ff00;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.navigation a:hover {
  color: #a0ffa0;
  text-shadow: 0 0 8px #a0ffa0;
}

.editor_space {
  display: flex;
  height: 32.3vh;
  width: 100vw;
  background-color: #101010;
  border-top: 1px solid #00ff00;
}

.editor {
  width: 70%;
  border-right: 1px solid #00ff00;
  box-shadow: inset 0 0 10px #00ff00;
}

iframe {
  width: 100vw;
  height: 60vh;
  border: none;
  box-shadow: 0 0 20px #00ff00;
}

.active {
  height: 92vh !important;
}

button {
  background-color: #00ff00;
  color: #0f0f0f;
  margin-left: 5%;
  margin-bottom: 5%;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0 0 10px #00ff00;
  transition: background-color 0.2s ease-in-out;
  user-select: none;
}

button:disabled {
  background-color: grey;
  box-shadow: none;
  cursor: not-allowed;
}

.ergebnis {
  display: flex;
  flex-direction: column;
  width: 30%;
  padding-left: 1rem;
  color: #00ff00;
  background-color: #101010;
  box-shadow: inset 0 0 10px #00ff00;
  font-size: 0.9rem;
  overflow: hidden;
}

.ergebnis-only {
  flex-grow: 1;
  overflow-y: auto;
  white-space: pre-wrap;
  padding: 0.5rem;
  font-family: 'Courier New', monospace;
  user-select: text;
}

pre#terminal {
  margin: 0;
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
}

span[contenteditable="true"] {
  outline: none;
  caret-color: #00ff00;
  color: #00ff00;
  background-color: transparent;
  user-select: text;
}
</style>


<script setup>
import { onMounted, ref } from 'vue'
import * as monaco from 'monaco-editor'
import router from '@/router'
import { useRoute } from 'vue-router'
import { inject } from 'vue'
import { updateDoc, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebase'

const globalState = inject('globalState')

// Zugriff auf debugMode
console.log(globalState.debugMode)

// Ändern möglich


const debug = globalState.debugMode
const date = new Date()
const user = ref()
const isLoggedIn = ref()
const loading = ref()
let day = 24

if (debug == false) {
  day = date.getDate()
}

console.log(day, date)

const editorContainer = ref(null)
const result = ref('')
const isReady = ref(false)
const showInputField = ref(false)
let pyodide = null
let editor = null
const route = useRoute();
const editor_active = ref(true)

// Ändern möglich
onMounted(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid))

      if (snap.exists()) {
        user.value = {
          name: snap.data().name || firebaseUser.email,
          role: snap.data().role || 'Unbekannt',
          isAdmin: snap.data().isAdmin || false
        }
        isLoggedIn.value = true
      } else {
        isLoggedIn.value = false
      }
    } else {
      isLoggedIn.value = false
    }
    loading.value = false
  })
})
onMounted(async () => {
  // Monaco Editor initialisieren

  monaco.editor.defineTheme('hacker-theme', {
    base: 'vs-dark', // 'vs', 'vs-dark' oder 'hc-black'
    inherit: true,
    rules: [
      { token: '', foreground: '00FF00', background: '0F0F0F' },           // Standard Text grün auf schwarz
      { token: 'comment', foreground: '008000', fontStyle: 'italic' },    // Kommentare dunkelgrün kursiv
      { token: 'keyword', foreground: '00FF00', fontStyle: 'bold' },      // Schlüsselwörter cyan fett
      { token: 'string', foreground: 'FFA500' },                          // Strings orange
      { token: 'number', foreground: 'FF4500' },                          // Zahlen rot-orange
      // ... weitere Token-Styles
    ],
    colors: {
      'editor.background': '#0F0F0F',
      'editor.foreground': '#00FF00',
      'editorCursor.foreground': '#00FF00',

      'editorLineNumber.foreground': '#007700',
      'editor.selectionBackground': '#004400',
      'editor.inactiveSelectionBackground': '#0F0F0F',
    }
  })

  editor = monaco.editor.create(editorContainer.value, {
    value: 'print("Hello Coder")',
    language: 'python',
    theme: 'hacker-theme',
    automaticLayout: true,
  })


  // Pyodide laden
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
  script.onload = async () => {
    pyodide = await window.loadPyodide()

    isReady.value = true
  }


  document.body.appendChild(script)
})

function toggle_editor() {
  editor_active.value = !editor_active.value
}
async function losung() {
  // Alle User abrufen
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((document) => {
    const userData = document.data();
    const classen = userData.classen || [];

    console.log("Überprüfe Benutzer:", userData.username);



    classen.forEach((klasse) => {
      const klasseCode = klasse.code.toLowerCase();
      console.log("Überprüfe Klasse:", klasse.code);

      // Lehrer dieser Klasse suchen
      const lehrer = userData

      if (!lehrer) {
        console.log("Kein Lehrer für diese Klasse gefunden:", klasse.code);
        return;
      }

      // Prüfen, ob der Code der Klasse mit der Benutzer-Domain übereinstimmt
      const userDomain = user.value.name.split('@')[1].split('.')[0];
      console.log("Benutzer-Domain:", userDomain, user.value);

      if (klasseCode === userDomain) {
        console.log("Richtige Klasse gefunden:", klasse.code);
        console.log("Lehrer dieser Klasse:", lehrer.username);

        // Prüfen, ob aktueller Benutzer ein Schüler der Klasse ist
        const isStudent = klasse.students?.some(student => student.username === user.value.name.split('@')[0]);

        if (isStudent) {
          console.log("Richtiger Schüler gefunden");
          alert("Du bist Schüler dieser Klasse. Lehrer: " + lehrer.username);
          console.log("Vor dem Update, aktuelle Klassendaten:", userData);
          const userDocRef = doc(db, "users", document.id);

          let classen = userData.classen || [];

          const username = user.value.name.split('@')[0]
          const loesungId = `${route.params.id}`
          const loesungText = editor.getValue()

          console.log("Lösung wird hinzugefügt:", { username, loesungId, loesungText });

          // 2. Gewünschte Klasse finden und ändern
          // Klasse suchen und bearbeiten
          classen = classen.map((k) => {
            if (k.code === klasse.code) {
              const updatedStudents = k.students.map((student) => {
                if (student.username === username) {
                  // Existierende Lösungen oder leeres Objekt
                  const alteLoesungen = student.losungen || {};

                  // Neue Lösung hinzufügen (z. B. { "tag3": "mein Code" })
                  const neueLoesungen = {
                    ...alteLoesungen,
                    [loesungId]: loesungText
                  };

                  return { ...student, losungen: neueLoesungen };
                }
                return student;
              });

              return { ...k, students: updatedStudents };
            }
            return k;
          });

          // Firestore aktualisieren
          updateDoc(userDocRef, { classen });

          console.log(`Lösung '${loesungId}' hinzugefügt für Schüler '${username}' in Klasse '${klasse.code}'.`);
        } else {
          alert("Du bist kein Schüler dieser Klasse.");
        }
      } else {
        console.log("Klasse-Code stimmt nicht überein:", klasseCode, userDomain);
      }
    });
  });
}




function weiterleitung(param) {

  if (param == "") {
    router.push("/")
  }
  if (param == "next" && Number(route.params.id) < 24) {
    if (day >= Number(route.params.id) + 1) {
      router.push(`/python/${Number(route.params.id) + 1}`);
    }


  }
  if (param == "back" && Number(route.params.id) > 1) {

    router.push(`/python/${Number(route.params.id) - 1}`);


  }


}

let stopInput = false;

function handle_input(promptText) {
  if (stopInput) throw new Error("Input abgebrochen!");
  const input = window.prompt(promptText);
  if (input === null) { // Nutzer drückt "Abbrechen"
    stopInput = true;
    return ""; // oder Exception werfen
  }
  return input;
}



async function runPython() {
  pyodide.globals.set('handle_input', handle_input)
  if (!isReady.value) {
    result.value = 'Interpreter lädt noch...'
    return
  }

  const code = editor.getValue()

  try {
    // stdout umleiten und input() definieren
    await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = sys.stdout

from js import prompt
def input(prompt_text=""):
    return handle_input(prompt_text)
`)

    // Benutzer-Code ausführen
    console.log(code)
    await pyodide.runPythonAsync(code)

    // Ausgabe holen
    const output = await pyodide.runPythonAsync('sys.stdout.getvalue()')
    result.value = output
  } catch (e) {
    result.value = 'Fehler: ' + e
  }
}


</script>
