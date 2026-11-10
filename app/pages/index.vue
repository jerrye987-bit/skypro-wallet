<template>
  <div class="page">
    <div v-if="isAuthed">
      <AppHeader />
      <main class="main">
        <h1 class="title">Мои расходы</h1>
        <div class="content">
          <div class="table-wrap">
            <p v-if="isLoading" class="status">Загружаем расходы…</p>
            <template v-else>
              <p v-if="serverError" class="status status--error">
                {{ serverError }}
              </p>
              <ExpensesTable
                :expenses="expenses"
                :deleting-id="deletingId"
                @delete="deleteExpense"
              />
            </template>
          </div>
          <NewExpenseForm :is-submitting="isSubmitting" @add="addExpense" />
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
  mapTransaction,
  sortByDate,
} from "~/api/expenses";

import type { Expense, ExpensePayload } from "~/types";

const isLoading = ref(false);
const isSubmitting = ref(false);

const deletingId = ref<string | null>(null);

const expenses = ref<Expense[]>([]);
const serverError = ref("");
const isAuthed = ref(false);

const addExpense = async (expense: ExpensePayload) => {
  if (isSubmitting.value) return; 

  serverError.value = ""; 

  isSubmitting.value = true;
  try {
    const list = await apiAddExpense(expense);
    expenses.value = Array.isArray(list)
      ? sortByDate(list).map(mapTransaction)
      : [];
  } catch (error) {
      serverError.value = error instanceof Error
        ? error.message
        : "Не удалось добавить расход";
  } finally {
    isSubmitting.value = false;
  }
};

const deleteExpense = async (id: string) => {
  if (deletingId.value) return;

  serverError.value = "";

  deletingId.value = id;
  try {
    const list = await apiDeleteExpense(id);
    expenses.value = Array.isArray(list)
      ? sortByDate(list).map(mapTransaction)
      : [];
  } catch (error) {
    serverError.value = error instanceof Error
      ? error.message
      : "Не удалось удалить расход";
  } finally {
    deletingId.value = null;
  }
};


onMounted(async () => {
  const savedToken = localStorage.getItem("token");
  if (!savedToken) {
    navigateTo("/login");
    return;
  }
  isAuthed.value = true;

  serverError.value = "";

  isLoading.value = true;
  try {
    const list = await getExpenses();
    expenses.value = Array.isArray(list)
      ? sortByDate(list).map(mapTransaction)
      : [];
  } catch (error) {
      serverError.value = error instanceof Error
        ? error.message
        : "Не удалось загрузить расходы";
    } finally {
    isLoading.value = false;
  }
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

.status {
  padding: 24px 0;
  color: #666666;
  font-size: 16px;
}

.status--error {
  color: #d92d20;
}


@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
