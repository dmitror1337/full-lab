import { initUserItems } from "./userItems.js";
import { loadItems } from "./api.js";
import { filterItems, renderItems } from "./catalog.js";
import { debounce } from "./utils.js";

const searchInput = document.querySelector("#item-search");
const categorySelect = document.querySelector("#category-filter");
const grid = document.querySelector("#item-grid");
const resultsCount = document.querySelector("#results-count");
const emptyMessage = document.querySelector("#empty-message");
const statusMessage = document.querySelector("#load-status");
const errorMessage = document.querySelector("#load-error");
const retryButton = document.querySelector("#retry-load");

const showMoreButton = document.querySelector(".details-toggle");
const extraDescription = document.querySelector("#extra-details");

let items = [];

function updateView() {
  const filteredItems = filterItems(
    items,
    searchInput.value,
    categorySelect.value
  );

  renderItems(filteredItems, grid, resultsCount, emptyMessage);
}

const debouncedUpdateView = debounce(updateView, 300);

async function init() {
  searchInput.disabled = true;
  categorySelect.disabled = true;
  retryButton.disabled = true;
  retryButton.hidden = true;
  errorMessage.hidden = true;
  statusMessage.textContent = "Завантаження…";
  grid.setAttribute("aria-busy", "true");
  grid.replaceChildren();
  resultsCount.textContent = "";
  emptyMessage.hidden = true;

  let loaded = false;

  try {
    items = await loadItems();
    updateView();
    loaded = true;
  } catch (error) {
    items = [];
    errorMessage.textContent =
      "Не вдалося завантажити каталог. Спробуйте ще раз.";
    errorMessage.hidden = false;
    retryButton.hidden = false;
    console.error(error);
  } finally {
    statusMessage.textContent = "";
    grid.setAttribute("aria-busy", "false");
    searchInput.disabled = !loaded;
    categorySelect.disabled = !loaded;
    retryButton.disabled = false;
  }
}

searchInput.addEventListener("input", debouncedUpdateView);
categorySelect.addEventListener("change", updateView);
retryButton.addEventListener("click", init);

if (showMoreButton && extraDescription) {
  showMoreButton.addEventListener("click", () => {
    const isHidden = extraDescription.classList.toggle("is-hidden");
    showMoreButton.textContent = isHidden ? "Показати більше" : "Показати менше";
    showMoreButton.setAttribute("aria-expanded", String(!isHidden));
  });
}

initUserItems();
init();
