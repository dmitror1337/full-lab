const STORAGE_KEY = "powerfit:my-workouts:v1";
const CATEGORIES = ["strength", "yoga", "functional"];

function isUserItems(value) {
  if (!Array.isArray(value)) return false;
  const ids = new Set();
  return value.every((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item) ||
        typeof item.id !== "string" || !item.id.startsWith("user-") || item.id.length <= 5 || ids.has(item.id) ||
        typeof item.title !== "string" || item.title.trim().length < 3 || item.title.length > 80 ||
        typeof item.description !== "string" || item.description.trim().length < 10 || item.description.length > 500 ||
        !CATEGORIES.includes(item.category)) return false;
    ids.add(item.id);
    return true;
  });
}

export function readUserItems() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  const value = JSON.parse(raw);
  if (!isUserItems(value)) throw new Error("Некоректні власні записи PowerFit");
  return value;
}

export function writeUserItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
