<template>
  <form class="form-card" @submit.prevent="addExpense">
    <h2 class="form-card__title">Новый расход</h2>

    <label class="form-card__label">Описание</label>
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
        :key="category"
        class="category-chip"
        :class="{ 'category-chip--active': form.category === category }"
      >
        <input
          v-model="form.category"
          type="radio"
          name="category"
          :value="category"
          class="category-chip__input"
        />
        {{ category }}
      </label>
    </div>

    <label class="form-card__label" for="expense-date">Дата</label>
    <input
      id="expense-date"
      v-model="form.date"
      type="date"
      class="form-card__input"
    />

    <label class="form-card__label">Сумма</label>
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
const emit = defineEmits<{ (e: "add", expense: unknown): void }>();

const categories = [
  "Еда",
  "Транспорт",
  "Жилье",
  "Развлечения",
  "Образование",
  "Другое",
];

const form = reactive({
  description: "",
  category: "",
  date: "",
  amount: null as number | null,
});

const addExpense = () => {
  if (!form.description || !form.category || !form.date || !form.amount) return;
  emit("add", { ...form });
  form.description = "";
  form.category = "";
  form.date = "";
  form.amount = null;
};
</script>

<style scoped>
.form-card {
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
}

.form-card__title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.form-card__label {
  font-size: 14px;
  font-weight: 600;
  margin: 16px 0 8px;
}

.form-card__input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.form-card__input:focus {
  border-color: #8a78ff;
}

.form-card__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 100px;
  font-size: 13px;
  cursor: pointer;
}

.category-chip__input {
  accent-color: #8a78ff;
}

.category-chip--active {
  border-color: #8a78ff;
  background: #f3f0ff;
}

.form-card__submit {
  margin-top: 24px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: #8a78ff;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.form-card__submit:hover {
  background: #7360d6;
}
</style>
