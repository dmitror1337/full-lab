<script setup>
import { computed, ref } from 'vue'
import { useCatalogStore } from '../stores/catalog.js'
import WorkoutList from '../components/WorkoutList.vue'
import WorkoutForm from '../components/WorkoutForm.vue'

const store = useCatalogStore()
const query = ref('')
const category = ref('all')
const showMore = ref(false)

const filteredItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return store.items.filter((item) =>
    (category.value === 'all' || item.category === category.value) &&
    `${item.title} ${item.description}`.toLowerCase().includes(text)
  )
})
</script>

<template>
  <section id="about" class="section">
    <h2>Про наш клуб</h2>
    <p>PowerFit — це сучасний фітнес-клуб для тих, хто цінує здоров'я, силу та красу. Ми пропонуємо найкращі умови для досягнення ваших спортивних цілей.</p>

    <p>Наші переваги:</p>
    <ul>
      <li>Сучасне тренажерне обладнання</li>
      <li>Професійні тренери з багаторічним досвідом</li>
      <li>Групові та індивідуальні заняття</li>
    </ul>

    <button
      class="details-toggle"
      type="button"
      :aria-expanded="showMore"
      aria-controls="extra-details"
      @click="showMore = !showMore"
    >
      {{ showMore ? 'Показати менше' : 'Показати більше' }}
    </button>

    <p v-if="showMore" id="extra-details">
      У клубі є сучасне обладнання, персональні тренування та заняття для різних рівнів підготовки.
    </p>

    <img src="/images/gym.jpg" alt="Інтер'єр сучасного тренажерного залу PowerFit" class="content-img">

    <p>
      Більше про стандарти здорового способу життя читайте на сайті
      <a href="https://sport.ua/" target="_blank" rel="noopener noreferrer">Спорт.ua</a>.
    </p>
  </section>

  <section id="trainers" class="section">
    <h2>Наші тренери</h2>
    <div class="card-grid">
      <article class="card">
        <img src="/images/trainer1.jpg" alt="Тренер Олександр" class="card-img">
        <h3 class="card-title">Олександр</h3>
        <p>Тренер тренажерного залу. Спеціалізація: важка атлетика, кросфіт.</p>
      </article>
      <article class="card">
        <img src="/images/trainer2.jpg" alt="Тренер Марія" class="card-img">
        <h3 class="card-title">Марія</h3>
        <p>Тренерка з пілатесу та йоги. Спеціалізація: розтяжка, реабілітація.</p>
      </article>
      <article class="card">
        <img src="/images/trainer3.jpg" alt="Тренер Дмитро" class="card-img">
        <h3 class="card-title">Дмитро</h3>
        <p>Тренер з функціонального тренінгу. Спеціалізація: схуднення, витривалість.</p>
      </article>
    </div>
  </section>

  <section id="catalog" class="section">
    <h2>Каталог тренувань</h2>

    <div class="catalog-controls">
      <div class="form-field">
        <label for="search">Пошук тренувань</label>
        <input id="search" v-model.trim="query" type="search" placeholder="Назва або опис">
      </div>
      <div class="form-field">
        <label for="category">Категорія</label>
        <select id="category" v-model="category">
          <option value="all">Усі</option>
          <option value="strength">Силові тренування</option>
          <option value="yoga">Йога та пілатес</option>
          <option value="functional">Функціональний тренінг</option>
        </select>
      </div>
    </div>

    <p>Знайдено: {{ filteredItems.length }}</p>
    <WorkoutList :items="filteredItems" />
    <p v-if="filteredItems.length === 0">Нічого не знайдено.</p>
  </section>

  <section id="signup" class="section">
    <h2>Запис на заняття</h2>
    <p>Заповніть форму нижче, і наш менеджер зв'яжеться з вами.</p>

    <form class="request-form" @submit.prevent>
      <div class="form-field">
        <label for="name">Ваше ім'я</label>
        <input id="name" name="name" type="text" minlength="2" required placeholder="Введіть ім'я">
      </div>

      <div class="form-field">
        <label for="workout">Напрям тренування</label>
        <select id="workout" name="workout" required>
          <option value="">Оберіть напрям</option>
          <option value="gym">Тренажерний зал</option>
          <option value="yoga">Йога / Пілатес</option>
          <option value="crossfit">Кросфіт</option>
        </select>
      </div>

      <div class="form-field">
        <label for="date">Бажана дата першого візиту</label>
        <input id="date" name="date" type="date" required>
      </div>

      <div class="form-field">
        <label for="message">Коментар або рівень підготовки</label>
        <textarea id="message" name="message" rows="4" minlength="5" required placeholder="Наприклад: новачок, маю травму коліна..."></textarea>
      </div>

      <button type="submit" class="button">Записатися</button>
    </form>
  </section>

  <section id="my-workouts" class="section">
    <h2>Мої тренування</h2>
    <p>Додайте власний напрям тренувань.</p>

    <WorkoutForm @add="store.addUserItem" />

    <p v-if="store.userItems.length === 0">Власних тренувань поки немає.</p>
    <WorkoutList :items="store.userItems" removable @delete="store.deleteUserItem" />
  </section>
</template>