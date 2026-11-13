<template>
  <div class="card chart">
    <div class="chart__total">{{ formatMoney(total) }}</div>
    <div class="chart__subtitle">Расходы за {{ periodLabel }}</div>

    <div class="chart__columns">
      <div v-for="cat in categories" :key="cat.name" class="chart__column">
        <span class="chart__value">{{ formatMoney(sums[cat.name] ?? 0) }}</span>
        <div
          class="chart__bar"
          :style="{
            height: barHeight(sums[cat.name] ?? 0),
            background: cat.color,
          }"
        />
        <span class="chart__label">{{ cat.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from "~/types";

const props = defineProps<{ expenses: Expense[] }>();

const { selectedRange, selectedDate } = useSelectedDate();

const sums = computed(() => {
  const result: Record<string, number> = {};
  for (const cat of categories) result[cat.name] = 0;
  for (const e of props.expenses) {
    result[e.category] = (result[e.category] ?? 0) + e.amount;
  }
  return result;
});

const categories = [
  { name: "Еда", color: "#D9B6FF" },
  { name: "Транспорт", color: "#FFB53D" },
  { name: "Жилье", color: "#6EE4FE" },
  { name: "Развлечения", color: "#B0AEFF" },
  { name: "Образование", color: "#BCEC30" },
  { name: "Другое", color: "#FFB9B8" },
];

const total = computed(() =>
  Object.values(sums.value).reduce((acc, s) => acc + s, 0)
);

const maxSum = computed(() =>
  Math.max(...Object.values(sums.value), 1)
);

const barHeight = (sum: number) =>
  `${Math.round((sum / maxSum.value) * 328) || 2}px`;

const periodLabel = computed(() => {
  if (selectedRange.value.length < 2) {
    return formatDate(selectedDate.value);
  }
  const sorted = [...selectedRange.value].sort((a, b) => +a - +b);
  const start = sorted[0];
  const end = sorted[sorted.length - 1];
  if (!start || !end) return formatDate(selectedDate.value);
  return `${formatDate(start)} — ${formatDate(end)}`;
});

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
</script>



<style scoped>
.card {
  background: #fff;
  border-radius: 30px;
  padding: 32px;
  height: 540px;
  box-shadow: 0px 20px 67px -12px #00000021;
}

.chart__total {
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  line-height: 29px;
}

.chart__subtitle {
  font-size: 12px;
  color: #999999;
  margin-top: 12px;
  line-height: 100%;
  margin-bottom: 21px;
  line-height: 15px;
}

.chart__columns {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.chart__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.chart__value {
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  line-height: 19px;
}

.chart__bar {
  width: 94px;
  border-radius: 12px;
}

.chart__label {
  font-size: 12px;
  color: #000000;
}
</style>
