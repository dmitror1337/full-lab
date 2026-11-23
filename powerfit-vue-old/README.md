# PowerFit — лабораторна №9

Vue 3 + Vite реалізація сайту фітнес-клубу з лабораторної №8.

## Запуск

Потрібен Node.js 22.12+ або сумісна актуальна LTS версія.

```sh
npm install
npm run dev
npm run build
```

## Структура `src`

- `App.vue` — реактивні пошук, категорія, список користувача та його CRUD-події.
- `data/workouts.js` — вісім елементів каталогу PowerFit.
- `components/WorkoutList.vue` — список із стабільним `:key` на основі `id`.
- `components/WorkoutCard.vue` — картка, props `item`/`removable`, emit `delete`.
- `components/WorkoutForm.vue` — поля з `v-model`, валідація і emit `add`.
- `assets/main.css` — стилі перенесені з попередньої роботи.

Запис каталогу має поля `id`, `title`, `category`, `description`, `image`. Власний запис має `id`, `title`, `category`, `description`. Стан користувача зберігається в пам’яті згідно з базовими вимогами №9; localStorage реалізовано у vanilla-версії №8.

## Фотографии каталога

Карточки используют восемь локальных фотографий Unsplash в `public/images/workout-*.jpg`; при работе сайта внешние запросы не нужны. Исходные страницы авторов находятся на Unsplash: фотографии strength beginner, yoga, pilates и battle ropes — поисковые результаты Unsplash.
