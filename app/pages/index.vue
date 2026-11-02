<template>
  <div class="page">
    <header class="header">
      <div class="header__inner">
        <a href="/" class="header__logo">
          <img src="/icons/logo.svg" alt="Skypro.Wallet" />
        </a>
        <nav class="header__nav">
          <a href="#" class="header__link header__link--active" data-text="Мои расходы">Мои расходы</a>
          <a href="#" class="header__link" data-text="Анализ расходов">Анализ расходов</a>
        </nav>
        <a href="#" class="header__link header__exit">Выйти</a>
      </div>
    </header>
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
interface Expense {
  id: number;
  description: string;
  category: string;
  date: string;
  amount: number;
}

const expenses = ref<Expense[]>([
  {
    id: 1,
    description: "Пятерочка",
    category: "Еда",
    date: "03.07.2024",
    amount: 3500,
  },
  {
    id: 2,
    description: "Яндекс.Такси",
    category: "Транспорт",
    date: "03.07.2024",
    amount: 730,
  },
  {
    id: 3,
    description: "Аптека Вита",
    category: "Другое",
    date: "03.07.2024",
    amount: 1200,
  },
  {
    id: 4,
    description: "Бургер Кинг",
    category: "Еда",
    date: "03.07.2024",
    amount: 950,
  },
  {
    id: 5,
    description: "Деливери",
    category: "Еда",
    date: "02.07.2024",
    amount: 1320,
  },
  {
    id: 6,
    description: "Кофейни №1",
    category: "Еда",
    date: "02.07.2024",
    amount: 400,
  },
  {
    id: 7,
    description: "Бильярд",
    category: "Развлечения",
    date: "29.06.2024",
    amount: 600,
  },
  {
    id: 8,
    description: "Перекресток",
    category: "Еда",
    date: "29.06.2024",
    amount: 2360,
  },
  {
    id: 9,
    description: "Лукойл",
    category: "Транспорт",
    date: "29.06.2024",
    amount: 1000,
  },
  {
    id: 10,
    description: "Летуаль",
    category: "Другое",
    date: "29.06.2024",
    amount: 4500,
  },
  {
    id: 11,
    description: "Яндекс.Такси",
    category: "Транспорт",
    date: "28.06.2024",
    amount: 320,
  },
  {
    id: 12,
    description: "Перекресток",
    category: "Еда",
    date: "28.06.2024",
    amount: 1360,
  },
  {
    id: 13,
    description: "Деливери",
    category: "Еда",
    date: "28.06.2024",
    amount: 2320,
  },
  {
    id: 14,
    description: "Вкусвилл",
    category: "Еда",
    date: "27.06.2024",
    amount: 1220,
  },
  {
    id: 15,
    description: "Кофейни №1",
    category: "Еда",
    date: "27.06.2024",
    amount: 920,
  },
  {
    id: 16,
    description: "Вкусвилл",
    category: "Еда",
    date: "26.06.2024",
    amount: 840,
  },
  {
    id: 17,
    description: "Кофейни №1",
    category: "Еда",
    date: "26.06.2024",
    amount: 920,
  },
]);

const addExpense = (expense: Omit<Expense, "id">) => {
  expenses.value.push({ ...expense, id: Date.now() });
};

const deleteExpense = (id: number) => {
  expenses.value = expenses.value.filter((e) => e.id !== id);
};
</script>

<style scoped>
.header {
  background: #fff;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 64px;
  padding: 0 120px;
}

.header__nav {
  display: flex;
  gap: 48px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header__link {
  display: inline-flex;
  flex-direction: column;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  transition: color 0.2s;
}

.header__link::after {
  content: attr(data-text);
  font-weight: 600;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
}

.header__link:hover {
  color: #7334ea;
  font-weight: 600;
}

.header__link--active {
  text-decoration: underline;
}

.header__exit {
  font-weight: 600;
}

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
