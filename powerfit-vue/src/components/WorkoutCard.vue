<script setup>
defineProps({
  item: { type: Object, required: true },
  removable: { type: Boolean, default: false }
})

const emit = defineEmits(['delete'])

const categoryNames = {
  strength: 'Силові тренування',
  yoga: 'Йога та пілатес',
  functional: 'Функціональний тренінг'
}
</script>

<template>
  <article class="card">
    <img v-if="item.image" class="card-img" :src="item.image" :alt="item.title">
    <p class="card-category">{{ categoryNames[item.category] }}</p>
    <h3 class="card-title">{{ item.title }}</h3>
    <p>{{ item.description }}</p>
    <button
      v-if="removable"
      class="button"
      type="button"
      @click="emit('delete', item.id)"
    >
      Видалити
    </button>
  </article>
</template>