<template>
  <section class="table-card">
    <h2 class="table-card__title">Таблица расходов</h2>

    <div class="table-card__scroll">
      <table class="table">
        <thead>
          <tr>
            <th>Описание</th>
            <th>Категория</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense.id">
            <td>{{ expense.description }}</td>
            <td>{{ expense.category }}</td>
            <td>{{ expense.date }}</td>
            <td>{{ expense.amount.toLocaleString("ru-RU") }} ₽</td>
            <td class="table__cell--action">
              <button class="table__delete" @click="deleteExpense(expense.id)">
                <img
                  src="/icons/bag.svg"
                  alt="Удалить"
                  class="table__delete-icon"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
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

const deleteExpense = (id: number) => {
  expenses.value = expenses.value.filter((e) => e.id !== id);
};
</script>

<style scoped>
.table-card {
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  height: 100%;
}

.table-card__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
}

.table-card__scroll {
  overflow-y: auto;
  max-height: 620px;
  margin: 0 -32px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.table th {
  text-align: left;
  color: #999999;
  font-weight: 400;
  padding: 0 32px 6px;
  border-bottom: 1px solid #999999;
}

.table td {
  padding: 7px 32px;
}

.table tbody tr:first-child td {
  padding-top: 18px;
}

.table__cell--action {
  text-align: center;
}

.table__delete {
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.6;
}

.table__delete:hover {
  opacity: 1;
}

.table__delete-icon {
  width: 12px;
  height: 12px;
  display: block;
}
</style>
