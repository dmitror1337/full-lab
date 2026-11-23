<script setup>
import { computed, ref } from 'vue'
import { workouts } from './data/workouts.js'
import WorkoutList from './components/WorkoutList.vue'
import WorkoutForm from './components/WorkoutForm.vue'
const query = ref('')
const category = ref('all')
const userItems = ref([])
const filteredWorkouts = computed(() => {
  const text = query.value.trim().toLowerCase()
  return workouts.filter(item => (category.value === 'all' || item.category === category.value) && `${item.title} ${item.description}`.toLowerCase().includes(text))
})
function addWorkout(item) { userItems.value = [...userItems.value, item] }
function deleteWorkout(id) { userItems.value = userItems.value.filter(item => item.id !== id) }
</script>
<template>
  <header class="site-header"><div class="container header-inner"><h1>PowerFit</h1><nav class="main-nav"><a href="#catalog">Каталог</a><a href="#my-workouts">Мої тренування</a></nav></div></header>
  <main class="container">
    <section id="catalog" class="section"><h2>Каталог тренувань</h2>
      <div class="catalog-controls"><div class="form-field"><label for="search">Пошук тренувань</label><input id="search" v-model.trim="query" type="search" placeholder="Назва або опис"></div>
        <div class="form-field"><label for="filter">Категорія</label><select id="filter" v-model="category"><option value="all">Усі</option><option value="strength">Силові тренування</option><option value="yoga">Йога та пілатес</option><option value="functional">Функціональний тренінг</option></select></div>
      </div>
      <p aria-live="polite">Знайдено: {{ filteredWorkouts.length }}</p>
      <WorkoutList v-if="filteredWorkouts.length" :items="filteredWorkouts" /><p v-else class="empty-state">За вашим запитом тренувань не знайдено.</p>
    </section>
    <section id="my-workouts" class="section"><h2>Мої тренування</h2><WorkoutForm @add="addWorkout" />
      <WorkoutList v-if="userItems.length" :items="userItems" removable @delete="deleteWorkout" />
      <p v-else class="empty-state">Власних тренувань поки немає.</p>
    </section>
  </main>
  <footer class="site-footer"><div class="container"><p>© 2026 Фітнес-клуб PowerFit</p></div></footer>
</template>
