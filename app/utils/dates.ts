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

export const dateToApi = (date: Date): string =>
  `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

// "2025-06-01" -> "6-1-2025" (месяц-день-год, как ждёт API)
export const isoDateToApi = (value: string): string => {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) {
    throw new Error(`Некорректная дата: ${value}`);
  }
  return `${Number(month)}-${Number(day)}-${year}`;
};
