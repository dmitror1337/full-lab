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

  if (
    cleanTitle.length < 3 || cleanTitle.length > 80 ||
    cleanDescription.length < 10 || cleanDescription.length > 500 ||
    !category.value
  ) {
    message.value = 'Перевірте назву, категорію й опис.'
    return
  }

  emit('add', {
    id: crypto.randomUUID(),
    title: cleanTitle,
    category: category.value,
    description: cleanDescription
  })

  title.value = ''
  category.value = ''
  description.value = ''
  message.value = 'Тренування додано.'
}
</script>

<template>
  <form class="request-form" @submit.prevent="submitForm">
    <div class="form-field">
      <label for="user-title">Назва</label>
      <input id="user-title" v-model="title" required minlength="3" maxlength="80">
    </div>

    <div class="form-field">
      <label for="user-category">Категорія</label>
      <select id="user-category" v-model="category" required>
        <option value="">Оберіть категорію</option>
        <option value="strength">Силові тренування</option>
        <option value="yoga">Йога та пілатес</option>
        <option value="functional">Функціональний тренінг</option>
      </select>
    </div>

    <div class="form-field">
      <label for="user-description">Опис</label>
      <textarea id="user-description" v-model="description" required minlength="10" maxlength="500" rows="4"></textarea>
    </div>

    <button type="submit" class="button">Додати тренування</button>
    <p role="status" aria-live="polite">{{ message }}</p>
  </form>
</template>