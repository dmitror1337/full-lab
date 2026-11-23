<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCatalogStore } from './stores/catalog.js'

const store = useCatalogStore()
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <h1>PowerFit</h1>
      <nav class="main-nav">
        <RouterLink :to="{ name: 'home' }">Каталог</RouterLink>
        <span>Обране: {{ store.favoriteCount }}</span>
      </nav>
    </div>
  </header>

  <main class="container">
    <RouterView />
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>© 2026 Фітнес-клуб PowerFit. Всі права захищені.</p>
    </div>
  </footer>
</template>