<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="section">
    <h1>Сторінку не знайдено</h1>
    <p>Перевірте адресу або поверніться до каталогу.</p>
    <RouterLink :to="{ name: 'home' }">Повернутися до каталогу</RouterLink>
  </section>
</template>