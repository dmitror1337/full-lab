const ALLOWED_CATEGORIES = new Set(["strength", "yoga", "functional"]);

export async function loadItems() {
  const url = new URL("../data/items.json", import.meta.url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Не вдалося завантажити дані: HTTP ${response.status}`);
  }

  const items = await response.json();

  if (!Array.isArray(items)) {
    throw new Error("Файл items.json має містити масив.");
  }

  const ids = new Set();

  for (const item of items) {
    const validItem =
      item !== null &&
      typeof item === "object" &&
      Number.isInteger(item.id) &&
      item.id > 0 &&
      typeof item.title === "string" &&
      typeof item.category === "string" &&
      typeof item.description === "string" &&
      typeof item.image === "string" &&
      ALLOWED_CATEGORIES.has(item.category) &&
      item.image.startsWith("images/") &&
      !item.image.includes("..");

    if (!validItem) {
      throw new Error("У каталозі є запис із неправильними полями.");
    }

    if (ids.has(item.id)) {
      throw new Error(`Повторюється id: ${item.id}`);
    }

    ids.add(item.id);
  }

  return items;
}