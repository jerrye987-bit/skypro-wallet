// "03.07.2024" -> Date
export const parseDate = (value: string): Date => {
  const [day, month, year] = value.split(".").map(Number);

  if (day === undefined || month === undefined || year === undefined) {
    throw new Error(`Некорректная дата: ${value}`);
  }
  return new Date(year, month - 1, day);
};

// "2026-11-26" -> "26.11.2026"
export const isoToRu = (iso: string): string => {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) {
    throw new Error(`Некорректная дата: ${iso}`);
  }
  return `${day}.${month}.${year}`;
};

// Date -> "10 июля 2024"
export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

// уникальный ключ дня — для сравнения без времени
export const dateKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;