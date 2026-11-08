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
  const { expenses, addExpense, deleteExpense } = useExpenses();

  const isAuthed = ref(false);

  onMounted(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      navigateTo("/login");
      return;
    }
    isAuthed.value = true;
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
