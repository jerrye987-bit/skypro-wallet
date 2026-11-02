<template>
  <form class="form-card" @submit.prevent="addExpense">
    <h2 class="form-card__title">Новый расход</h2>

    <label class="form-card__label" for="expense-description">Описание</label>
    <input
      v-model="form.description"
      type="text"
      class="form-card__input"
      placeholder="Введите описание"
    />

    <span class="form-card__label">Категория</span>
    <div class="form-card__categories">
      <label
        v-for="category in categories"
        :key="category.name"
        class="category-chip"
        :class="{ 'category-chip--active': form.category === category.name }"
      >
        <input
          v-model="form.category"
          type="radio"
          name="category"
          :value="category.name"
          class="category-chip__input"
        />
        <CategoryIcon :name="category.name" class="category-chip__icon" />
        {{ category.name }}
      </label>
    </div>

    <label class="form-card__label" for="expense-date">Дата</label>
    <div class="form-card__date-wrapper">
      <input
        id="expense-date"
        v-model="form.date"
        type="date"
        class="form-card__input"
        :class="{ 'form-card__input--empty': !form.date }"
      />
      <span v-if="!form.date" class="form-card__date-placeholder"
        >Введите дату</span
      >
    </div>

    <label class="form-card__label" for="expense-amount">Сумма</label>
    <input
      v-model="form.amount"
      type="number"
      class="form-card__input"
      placeholder="Введите сумму"
    />

    <button type="submit" class="form-card__submit">
      Добавить новый расход
    </button>
  </form>
</template>

<script setup lang="ts">
interface ExpensePayload {
  description: string;
  category: string;
  date: string;
  amount: number;
}

const emit = defineEmits<{ (e: "add", expense: ExpensePayload): void }>();

const categories = [
  { name: "Еда" },
  { name: "Транспорт" },
  { name: "Жилье" },
  { name: "Развлечения" },
  { name: "Образование" },
  { name: "Другое" },
];

const form = reactive({
  description: "",
  category: "",
  date: "",
  amount: null as number | null,
});

const addExpense = () => {
  if (!form.description || !form.category || !form.date || form.amount === null) return;

  emit("add", {
    description: form.description,
    category: form.category,
    date: form.date,
    amount: form.amount,
  });

  form.description = "";
  form.category = "";
  form.date = "";
  form.amount = null;
};

</script>

<style scoped>
.form-card {
  background: #fff;
  border-radius: 30px;
  padding: 32px 32px 32px 31px;
  display: flex;
  flex-direction: column;
}

.form-card__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.form-card__label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.form-card__input {
  width: 100%;
  padding: 12px 12px;
  border: 1px solid #999999;
  border-radius: 6px;
  font-size: 12px;
  line-height: 100%;
  outline: none;
  margin-bottom: 24px;
}

.form-card__input:focus {
  border-color: #7334ea;
  background-color: #f1ebfd;
}

.form-card__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 24px;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 12px;
  cursor: pointer;
  background-color: #f4f5f6;
}

.category-chip__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.category-chip--active {
  border-color: #f1ebfd;
  background: #f1ebfd;
  color: #7334ea;
}

.form-card__submit {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #7334ea;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.form-card__submit:hover {
  background: #7360d6;
}

.form-card__date-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.form-card__date-placeholder {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 12px;
  pointer-events: none;
}

.form-card__input--empty::-webkit-datetime-edit {
  color: transparent;
}

.form-card__date-wrapper:focus-within .form-card__date-placeholder {
  opacity: 0;
}

.form-card__date-wrapper .form-card__input {
  margin-bottom: 0;
}
</style>
