<template>
  <div class="page">
    <div v-if="isAuthed">
      <AppHeader />
      <main class="main">
        <h1 class="title">Мои расходы</h1>
        <div class="content">
          <ExpensesTable :expenses="expenses" @delete="deleteExpense" />
          <NewExpenseForm @add="addExpense" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getExpenses,
  addExpense as apiAddExpense,
  deleteExpense as apiDeleteExpense,
  CATEGORY_LABELS,
} from "~/api/expenses";

const expenses = ref<Expense[]>([]);
const serverError = ref("");
const isAuthed = ref(false);

interface ApiTransaction {
  _id: string;
  description: string;
  category: string;
  date: string;
  sum: number;
}

const mapExpense = (t: ApiTransaction) => ({
  id: t._id,
  description: t.description,
  category: CATEGORY_LABELS[t.category] || t.category,
  amount: t.sum,
  date: formatDate(new Date(t.date)),
});

interface ExpensePayload {
  description: string;
  category: string;
  date: string;
  amount: number;
}

interface Expense {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
}

const addExpense = async (expense: ExpensePayload) => {
  try {
    const list = await apiAddExpense(expense);
    if (Array.isArray(list)) {
      expenses.value = list.map(mapExpense);
    }
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Не удалось добавить расход";
  }
};

const deleteExpense = async (id: string) => {
  try {
    const list = await apiDeleteExpense(id);
    if (Array.isArray(list)) {
      expenses.value = list.map(mapExpense);
    }
  } catch (error) {
    serverError.value = error instanceof Error ? error.message : "Не удалось удалить расход";
  }
};


onMounted(() => {
  const savedToken = localStorage.getItem("token");
  if (!savedToken) {
    navigateTo("/login");
    return;
  }
  isAuthed.value = true;

  getExpenses()
    .then((list) => (expenses.value = Array.isArray(list) ? list.map(mapExpense) : []))
    .catch(() => (serverError.value = "Не удалось загрузить расходы"));
});
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
  grid-template-columns: 789px 1fr;
  gap: 34px;
  align-items: stretch;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
