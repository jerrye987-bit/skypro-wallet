<template>
  <div class="page">
    <header class="header">
      <div class="logo">
        <span class="logo__icon"> ₽ </span>
        Skypro.Wallet
      </div>
      <nav class="nav">
        <a href="#" class="nav__link nav__link--active">Мои расходы</a>
        <a href="#" class="nav__link">Анализ расходов</a>
        <a href="#" class="nav__link">Выйти</a>
      </nav>
    </header>
    <main class="main">
      <h1 class="title">Мои расходы</h1>
      <div class="content">
        <ExpensesTable />
        <NewExpenseForm />
      </div>
    </main>

  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  background: #fff;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
}

.logo__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #000;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav__link {
  color: #000;
  text-decoration: none;
  font-size: 15px;
}

.nav__link:hover {
  color: #8a78ff;
}

.nav__link--active {
  color: #8a78ff;
  text-decoration: underline;
  font-weight: 600;
}

.main {
  padding: 36px 120px;
}

.title {
  font-size: 32px;
  margin-bottom: 32px;
}

.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: stretch;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
