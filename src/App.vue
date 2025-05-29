<template>
  <div :class="['app-container', isDark ? 'dark' : '']">

  <header class="header">
    <button class="toggle-theme" @click="toggleTheme">
      {{ isDark ? '☀️' : '🌙' }}
    </button>
    <div class="title">DAAP</div>
  </header>
  <main>
    <RouterView />
  </main>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
const isDark = ref(localStorage.getItem('theme') === 'dark')

watch(isDark, (val) => {
  localStorage.setItem('theme', val ? 'dark' : 'light')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<style scoped>
.app-container {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3700B3;
  color: white;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 100;
}

.toggle-theme {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
}

.content {
  padding: 1rem;
}

.connect-section {
  margin: 2rem auto;
  max-width: 480px;
  text-align: center;
}

.wallet-address {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}

:root {
  --bg: #ffffff;
  --text: #111111;
}
.dark {
  --bg: #121212;
  --text: #f0f0f0;
}

@media (max-width: 600px) {
  .header {
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }

  .connect-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  .content {
    padding: 0.75rem;
  }
  
  .wallet-address {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
