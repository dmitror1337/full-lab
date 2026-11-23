<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useCatalogStore } from '../stores/catalog.js'

const route = useRoute()
const store = useCatalogStore()

const item = computed(() =>
  store.items.find((entry) => String(entry.id) === String(route.params.id))
)
</script>

<template>
  <article v-if="item" class="section">
    <p class="card-category">{{ item.category }}</p>
    <h1>{{ item.title }}</h1>
    <img v-if="item.image" class="content-img" :src="item.image" :alt="item.title">
    <p>{{ item.description }}</p>

    <button
      type="button"
      class="button"
      :aria-pressed="store.isFavorite(item.id)"
      @click="store.toggleFavorite(item.id)"
    >
      {{ store.isFavorite(item.id) ? 'Прибрати з обраного' : 'До обраного' }}
    </button>
  </article>

  <section v-else class="section">
    <h1>Тренування не знайдено</h1>
    <RouterLink :to="{ name: 'home' }">Повернутися до каталогу</RouterLink>
  </section>
</template>