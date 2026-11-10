export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

export const dateKey = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export const dateToApi = (date: Date): string =>
  `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

export const isoDateToApi = (value: string): string => {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) {
    throw new Error(`Некорректная дата: ${value}`);
  }
  return `${Number(month)}-${Number(day)}-${year}`;
};
