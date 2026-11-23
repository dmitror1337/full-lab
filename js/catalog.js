export function filterItems(items, query, category) {
  const text = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesText =
      `${item.title} ${item.description}`.toLowerCase().includes(text);

    const matchesCategory =
      category === "all" || item.category === category;

    return matchesText && matchesCategory;
  });
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = String(item.id);

  const image = document.createElement("img");
  image.className = "card-img";
  image.src = item.image;
  image.alt = item.title;

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = item.title;

  const category = document.createElement("p");
  category.className = "card-category";
  const categoryNames = { strength: "Силові тренування", yoga: "Йога та пілатес", functional: "Функціональний тренінг" };
  category.textContent = categoryNames[item.category] ?? item.category;

  const description = document.createElement("p");
  description.textContent = item.description;

  card.append(image, category, title, description);
  return card;
}

export function renderItems(items, grid, count, empty) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    fragment.append(createCard(item));
  });

  grid.replaceChildren(fragment);
  count.textContent = `Знайдено: ${items.length}`;
  empty.hidden = items.length !== 0;
}

