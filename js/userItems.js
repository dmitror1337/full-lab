import { readUserItems, writeUserItems } from "./storage.js";

const categoryNames = {
  strength: "Силові тренування",
  yoga: "Йога та пілатес",
  functional: "Функціональний тренінг"
};

export function initUserItems() {
  const form = document.querySelector("#user-item-form");
  const list = document.querySelector("#user-list");
  const empty = document.querySelector("#user-empty");
  const message = document.querySelector("#user-message");
  if (!form || !list || !empty || !message) return;

  let userItems;
  try {
    userItems = readUserItems();
  } catch (error) {
    userItems = [];
    message.textContent = "Не вдалося відновити записи. Нові зміни зберігатимуться окремо.";
    console.error(error);
  }

  function render() {
    const fragment = document.createDocumentFragment();
    userItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card user-item-card";
      const category = document.createElement("p");
      category.className = "card-category";
      category.textContent = categoryNames[item.category];
      const title = document.createElement("h3");
      title.className = "card-title";
      title.textContent = item.title;
      const description = document.createElement("p");
      description.textContent = item.description;
      const button = document.createElement("button");
      button.className = "button";
      button.type = "button";
      button.textContent = "Видалити";
      button.dataset.deleteId = item.id;
      card.append(category, title, description, button);
      fragment.append(card);
    });
    list.replaceChildren(fragment);
    empty.hidden = userItems.length !== 0;
  }

  function commit(nextItems) {
    userItems = nextItems;
    render();
    try {
      writeUserItems(userItems);
      return true;
    } catch (error) {
      message.textContent = "Зміна доступна в пам’яті, але не збережена після закриття сторінки.";
      console.error(error);
      return false;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const category = String(data.get("category") ?? "");
    const description = String(data.get("description") ?? "").trim();
    if (title.length < 3 || title.length > 80 || description.length < 10 || description.length > 500 || !categoryNames[category]) {
      message.textContent = "Перевірте назву, категорію й опис.";
      return;
    }
    const saved = commit([...userItems, { id: `user-${crypto.randomUUID()}`, title, category, description }]);
    if (saved) message.textContent = "Тренування додано й збережено.";
    form.reset();
    form.elements.namedItem("title").focus();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button || !list.contains(button)) return;
    const saved = commit(userItems.filter((item) => item.id !== button.dataset.deleteId));
    if (saved) message.textContent = "Тренування видалено й зміни збережено.";
  });

  render();
}
