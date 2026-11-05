<template>
  <div class="page">
    <AppHeader />
    <main class="main">
      <h1 class="title">Анализ расходов</h1>
      <div class="content">
        <PeriodCard />
        <ExpenseChart />
      </div>
    </main>
  </div>
</template>

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
