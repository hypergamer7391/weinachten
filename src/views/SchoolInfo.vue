<template>
  <div class="app-wrapper">
    <div class="überschrift">
      <h1>Python im Advent für Schulen</h1>
    </div>

    <div class="content">
      <p>
        <strong>Was ist Python im Advent für Schulen?</strong><br>
        Python im Advent ist ein kostenloses Adventskalender-Projekt, bei dem Schüler:innen jeden Tag eine spannende Programmieraufgabe lösen können. Lehrkräfte können ihre Klassen registrieren und erhalten einen eigenen Zugang, um den Fortschritt der Schüler:innen zu verfolgen und Aufgaben zu verwalten.
      </p>
      <p>
        <strong>Für Schüler:innen:</strong><br>
        Melde dich mit deinem Klassencode an und löse die täglichen Aufgaben. Deine Lehrkraft kann deinen Fortschritt sehen und dir bei Fragen helfen.
      </p>
      <button class="login-btn">Schüler-Login</button>
      <p>
        <strong>Für Lehrkräfte:</strong><br>
        Registrieren Sie Ihre Klasse und erhalten Sie einen eigenen Zugang. Sie können Aufgaben einsehen und den Fortschritt Ihrer Schüler:innen verfolgen.
      </p>
      <button class="register-btn">Klasse registrieren</button>
    </div>
    <div class="footer">
      <a href="/">Startseite</a>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  background-color: #0f0f0f;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  user-select: none;
}

.überschrift {
  margin-bottom: 2rem;
  text-shadow: 0 0 10px #00ff00;
}

h1 {
  font-weight: 900;
  font-size: 2.5rem;
  letter-spacing: 0.15rem;
  text-transform: lowercase;
}

.content {
  max-width: 600px;
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-btn,
.register-btn {
  background-color: transparent;
  border: 2px solid #00ff00;
  color: #00ff00;
  font-family: monospace;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 2rem 5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-shadow: 0 0 6px #00ff00;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  align-self: center;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn:hover,
.register-btn:hover {
  background-color: #00ff00;
  color: #0f0f0f;
  box-shadow: 0 0 15px #00ff00;
}

a {
  color: #00ff00;
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  color: #a0ffa0;
}

.footer {
  position: fixed;
  bottom: 2%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
