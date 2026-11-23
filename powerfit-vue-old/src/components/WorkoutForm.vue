<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add'])
const title = ref('')
const category = ref('')
const description = ref('')
const message = ref('')
function submitForm() {
  const cleanTitle = title.value.trim()
  const cleanDescription = description.value.trim()
  if (cleanTitle.length < 3 || cleanTitle.length > 80 || cleanDescription.length < 10 || cleanDescription.length > 500 || !['strength', 'yoga', 'functional'].includes(category.value)) {
    message.value = 'Перевірте назву, категорію й опис.'
    return
  }
  emit('add', { id: `user-${crypto.randomUUID()}`, title: cleanTitle, category: category.value, description: cleanDescription })
  title.value = ''; category.value = ''; description.value = ''; message.value = 'Тренування додано.'
}
</script>
<template>
  <form class="request-form" @submit.prevent="submitForm">
    <div class="form-field"><label for="title">Назва тренування</label><input id="title" v-model="title" required minlength="3" maxlength="80" placeholder="Наприклад: Ранкова зарядка"></div>
    <div class="form-field"><label for="category">Категорія</label><select id="category" v-model="category" required><option value="">Оберіть категорію</option><option value="strength">Силові тренування</option><option value="yoga">Йога та пілатес</option><option value="functional">Функціональний тренінг</option></select></div>
    <div class="form-field"><label for="description">Опис</label><textarea id="description" v-model="description" required minlength="10" maxlength="500" rows="4" placeholder="Опишіть тренування"></textarea></div>
    <button class="button" type="submit">Додати тренування</button><p role="status" aria-live="polite">{{ message }}</p>
  </form>
</template>
