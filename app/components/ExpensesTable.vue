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

const props = defineProps<{ expenses: Expense[] }>(); 

const emit = defineEmits<{ (e: "delete", id: number): void }>();

const deleteExpense = (id: number) => {
  emit("delete", id);
};
</script>

<style scoped>
.table-card {
  background: #fff;
  border-radius: 30px;
  padding: 32px 32px 7px 34px;
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

/* сама полоса скролла */
.table-card__scroll::-webkit-scrollbar {
  width: 6px;   /* для вертикального */
  /* height: 8px; — если нужен горизонтальный */
}

/* дорожка, по которой бегает ползунок */
.table-card__scroll::-webkit-scrollbar-track {
  background: #FFFFFF;
  border-radius: 3px;
}

/* ползунок */
.table-card__scroll::-webkit-scrollbar-thumb {
  background: #D9D9D9;
  border-radius: 3px;
}

.table-card__scroll::-webkit-scrollbar-thumb:hover {
  background: #D9D9D9;
}

/* убрать стрелочки на концах */
.table-card__scroll::-webkit-scrollbar-button {
  display: none;
}

/* убрать уголок на стыке двух скроллбаров (если есть оба) */
.table-card__scroll::-webkit-scrollbar-corner {
  display: none;
}


.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
}

.table th {
  text-align: left;
  color: #999999;
  font-weight: 400;
  padding: 0 32px 6px;
  border-bottom: 1px solid #999999;
}

.table th:nth-child(1) { width: 173px; }
.table th:nth-child(2) { width: 173px; }
.table th:nth-child(3) { width: 174px; }
.table th:nth-child(4) { width: 166px; }

.table td {
  padding: 7px 32px;
}

.table tbody tr:first-child td {
  padding-top: 18px;
}

.table th:first-child,
.table td:first-child { padding-left: 32px; }
.table th:last-child,
.table td:last-child { padding-right: 32px; }

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
