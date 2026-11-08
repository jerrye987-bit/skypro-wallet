export const useSelectedDate = () => {
  const selectedDate = useState<Date>("selectedDate", () => new Date());
  const selectedRange = useState<Date[]>("selectedRange", () => []);

  const sortedRange = computed(() =>
    [...selectedRange.value].sort((a, b) => +a - +b),
  );

  const rangeKeys = computed<Set<string>>(() => {
    const keys = new Set<string>();
    if (!selectedRange.value.length) return keys;

    const start = sortedRange.value[0];
    const end = sortedRange.value[sortedRange.value.length - 1];
    if (!start || !end) return keys;

    const cursor = new Date(start);
    while (cursor <= end) {
      keys.add(dateKey(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return keys;
  });

  return { selectedDate, selectedRange, rangeKeys };
};

