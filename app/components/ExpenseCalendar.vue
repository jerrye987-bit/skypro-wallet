<template>
  <div class="calendar">
    <div class="calendar__weekdays">
      <span v-for="day in weekdays" :key="day" class="calendar__weekday">{{
        day
      }}</span>
    </div>

    <div ref="scrollEl" class="calendar__scroll" @scroll="onScroll">
      <section
        v-for="m in months"
        :key="m.key"
        class="calendar__month"
        :data-month="m.key"
      >
        <h3 class="calendar__month-name">{{ m.label }}</h3>
        <div class="calendar__days">
          <template v-for="cell in m.cells" :key="cell.key">
            <button
              v-if="cell.day"
              class="calendar__day"
              :class="{
                'calendar__day--selected': inRange(cell) || cell.isSelected,
              }"
              @click="select(cell)"
            >
              {{ cell.day }}
            </button>
            <span v-else class="calendar__day calendar__day--blank" />
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
type DayCell = {
  key: string;
  day: number | null;
  date?: Date;
  isSelected?: boolean;
};

type MonthBlock = {
  key: string;
  label: string;
  cells: DayCell[];
};

const { selectedDate, selectedRange, rangeKeys } = useSelectedDate();

const weekdays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const scrollEl = ref<HTMLElement | null>(null);

const now = new Date();

const currentMonthKey = `${now.getFullYear()}-${now.getMonth()}`;

const firstMonth = ref(new Date(now.getFullYear(), now.getMonth() - 3, 1));
const lastMonth = ref(new Date(now.getFullYear(), now.getMonth() + 1, 1));

const buildMonth = (first: Date): MonthBlock => {
  const year = first.getFullYear();
  const month = first.getMonth();

  const labelRaw = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(first);
  const label = labelRaw.charAt(0).toUpperCase() + labelRaw.slice(1);

  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const selectedKey = dateKey(selectedDate.value);

  const cells: DayCell[] = [];
  for (let i = 0; i < offset; i++) {
    cells.push({ key: `b-${year}-${month}-${i}`, day: null });
  }
  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(year, month, d);
    const key = dateKey(date);
    cells.push({
      key,
      day: d,
      date,
      isSelected: key === selectedKey,
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ key: `e-${year}-${month}-${cells.length}`, day: null });
  }
  return { key: `${year}-${month}`, label, cells };
};

const months = computed<MonthBlock[]>(() => {
  const blocks: MonthBlock[] = [];
  for (
    let d = new Date(firstMonth.value);
    d <= lastMonth.value;
    d.setMonth(d.getMonth() + 1)
  ) {
    blocks.push(buildMonth(new Date(d)));
  }
  return blocks;
});

const minMonth = new Date(now.getFullYear() - 1, now.getMonth(), 1);

onMounted(() => {
  const el = scrollEl.value;
  const current = el?.querySelector(`[data-month="${currentMonthKey}"]`);
  if (!el || !current) return;

  const elRect = el.getBoundingClientRect();
  const curRect = current.getBoundingClientRect();
  el.scrollTop = curRect.top - elRect.top + el.scrollTop;
});

const onScroll = (event: Event) => {
  const el = event.target as HTMLElement;

  if (el.scrollTop <= 0 && firstMonth.value > minMonth) {
    const prevHeight = el.scrollHeight;
    firstMonth.value = new Date(
      firstMonth.value.getFullYear(),
      firstMonth.value.getMonth() - 1,
      1,
    );
    nextTick(() => {
      el.scrollTop += el.scrollHeight - prevHeight;
    });
    return;
  }

  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
    lastMonth.value = new Date(
      lastMonth.value.getFullYear(),
      lastMonth.value.getMonth() + 1,
      1,
    );
  }
};

const select = (cell: DayCell) => {
  if (!cell.date) return;

  if (selectedRange.value.length >= 2) {
    selectedRange.value = [cell.date];
  } else if (selectedRange.value.length === 1) {
    const start = selectedRange.value[0];
    if (!start) return;

    selectedRange.value =
      dateKey(cell.date) < dateKey(start)
        ? [cell.date, start]
        : [start, cell.date];
  } else {
    selectedRange.value = [cell.date];
  }
  selectedDate.value = cell.date;
};

const inRange = (cell: DayCell) =>
  !!cell.date && rangeKeys.value.has(dateKey(cell.date));
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 0 32px;
  padding-bottom: 7px;
  border-bottom: 0.5px solid #999999;
}

.calendar__weekday {
  font-size: 12px;
  color: #9d9d9d;
  text-align: center;
}

.calendar__scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;
}

.calendar__scroll::-webkit-scrollbar {
  width: 6px;
}

.calendar__scroll::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 3px;
}

.calendar__scroll::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 3px;
}

.calendar__scroll::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
  background: transparent;
}

.calendar__month-name {
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0 12px;
}

.calendar__month {
  padding: 0 32px;
}

.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.calendar__day {
  aspect-ratio: 1;
  border: none;
  border-radius: 50%;
  background: #f3f3f3;
  color: #000000;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
}

.calendar__day--selected {
  background: #f1ebfd;
  color: #7334ea;
}

.calendar__day--blank {
  background: transparent;
}
</style>
