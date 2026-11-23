const trainers = [
  {
    id: 1,
    title: "Олександр",
    category: "strength",
    description: "Тренер тренажерного залу. Спеціалізація: важка атлетика та кросфіт.",
    image: "images/trainer1.jpg"
  },
  {
    id: 2,
    title: "Марія",
    category: "yoga",
    description: "Тренерка з пілатесу та йоги. Спеціалізація: розтяжка та реабілітація.",
    image: "images/trainer2.jpg"
  },
  {
    id: 3,
    title: "Дмитро",
    category: "functional",
    description: "Тренер з функціонального тренінгу. Спеціалізація: витривалість.",
    image: "images/trainer3.jpg"
  },
  {
    id: 4,
    title: "Андрій",
    category: "strength",
    description: "Допомагає розвивати силу та вдосконалювати техніку вправ.",
    image: "images/Image_16.jpg"
  },
  {
    id: 5,
    title: "Ірина",
    category: "yoga",
    description: "Проводить заняття з йоги для початківців і досвідчених.",
    image: "images/Image_15.jpg"
  },
  {
    id: 6,
    title: "Максим",
    category: "functional",
    description: "Проводить функціональні тренування для сили та витривалості.",
    image: "images/Image_12.jpg"
    },
  {
    id: 7,
    title: "Олена",
    category: "strength",
    description: "Допомагає скласти план силових тренувань.",
    image: "images/Image_14.jpg"
  },
  {
    id: 8,
    title: "Софія",
    category: "yoga",
    description: "Тренерка з пілатесу та вправ для покращення гнучкості.",
    image: "images/Image_13.jpg"
  }
];

const categoryNames = {
  strength: "Силові тренування",
  yoga: "Йога та пілатес",
  functional: "Функціональний тренінг"
};

function createCard(trainer) {
  return `
    <article class="card" data-id="${trainer.id}">
      <img
        class="card-img"
        src="${trainer.image}"
        alt="Тренер ${trainer.title}"
      >
      <div class="card-content">
        <p class="card-category">${categoryNames[trainer.category]}</p>
        <h3 class="card-title">${trainer.title}</h3>
        <p>${trainer.description}</p>
        <button
          class="button favorite-toggle"
          type="button"
          aria-pressed="false"
        >
          Додати до обраного
        </button>
      </div>
    </article>
  `;
}
const trainerGrid = document.querySelector("#item-grid");
trainerGrid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-toggle");

  if (!favoriteButton) {
    return;
  }

  const isFavorite = favoriteButton.classList.toggle("is-active");

  favoriteButton.textContent = isFavorite
    ? "Додано до обраного"
    : "Додати до обраного";

  favoriteButton.setAttribute("aria-pressed", String(isFavorite));
});
const searchInput = document.querySelector("#item-search");
const categorySelect = document.querySelector("#category-filter");
const resultsCount = document.querySelector("#results-count");
const emptyMessage = document.querySelector("#empty-message");

function renderItems(trainersToRender) {
  trainerGrid.innerHTML = trainersToRender.map(createCard).join("");

  resultsCount.textContent =
    `Знайдено тренерів: ${trainersToRender.length}`;

  emptyMessage.hidden = trainersToRender.length !== 0;
}

function applyFilters() {
  const searchQuery = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;

  const filteredTrainers = trainers.filter((trainer) => {
    const searchableText =
      `${trainer.title} ${trainer.description}`.toLowerCase();

    const matchesSearch = searchableText.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" ||
      trainer.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderItems(filteredTrainers);
}

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

renderItems(trainers);