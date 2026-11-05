<template>
  <div class="page">
    <AppHeader />
    <main class="main">
      <h1 class="title">Мои расходы</h1>
      <div class="content">
        <ExpensesTable :expenses="expenses" @delete="deleteExpense" />
        <NewExpenseForm @add="addExpense" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  const { expenses, addExpense, deleteExpense } = useExpenses();
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
