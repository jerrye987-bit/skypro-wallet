<template>
  <div class="page">
    <div v-if="isAuthed">
      <AppHeader />
      <main class="main">
        <h1 class="title">Анализ расходов</h1>
        <div class="content">
          <PeriodCard />
          <ExpenseChart :expenses="expenses" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getExpensesByPeriod, mapTransaction } from "~/api/expenses";

import type { Expense } from "~/types";

const expenses = ref<Expense[]>([]);
const isLoading = ref(true);
const serverError = ref("");
const isAuthed = ref(false);

const { selectedRange, selectedDate } = useSelectedDate();

// Определяем границы периода: диапазон из календаря или один день
const getPeriod = () => {
  if (selectedRange.value.length === 2) {
    const sorted = [...selectedRange.value].sort((a, b) => +a - +b);
    return { start: sorted[0], end: sorted[1] };
  }
  const single = selectedRange.value[0] ?? selectedDate.value;
  return { start: single, end: single };
};

const loadPeriod = async () => {
  const { start, end } = getPeriod();
  isLoading.value = true;
  try {
    const list = await getExpensesByPeriod(start, end);
    expenses.value = Array.isArray(list) ? list.map(mapTransaction) : [];
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Не удалось загрузить расходы";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const savedToken = localStorage.getItem("token");
  if (!savedToken) {
    navigateTo("/login");
    return;
  }
  isAuthed.value = true;
  await loadPeriod();
});

// Перевыбрали дату или диапазон в календаре — перезагружаем данные
watch([selectedRange, selectedDate], loadPeriod);
</script>


<style scoped>
.main {
  padding: 36px 120px;
}

.title {
  font-size: 32px;
  margin-bottom: 32px;
  line-height: 150%;
}

.content {
  display: grid;
  grid-template-columns: 379px 1fr;
  gap: 32px;
  align-items: stretch;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
