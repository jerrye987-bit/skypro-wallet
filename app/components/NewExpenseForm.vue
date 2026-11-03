<template>
  <form class="form-card" @submit.prevent="addExpense">
    <h2 class="form-card__title">Новый расход</h2>

    <label 
      class="form-card__label" 
      for="expense-description"
      :class="{ 'is-invalid': touched.description && errors.description }"  
    >Описание</label>
    <input
      id="expense-description"
      v-model="form.description"
      type="text"
      class="form-card__input"
      :class="{ 'is-invalid': touched.description && errors.description }"
      placeholder="Введите описание"
      @blur="touched.description = true"
    />

    <span 
      class="form-card__label"
      :class="{ 'is-invalid': touched.category && errors.category }"  
    >Категория</span>
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
          @change="touched.category = true"
        />
        <CategoryIcon :name="category.name" class="category-chip__icon" />
        {{ category.name }}
      </label>
    </div>

    <label 
      class="form-card__label" 
      for="expense-date"
      :class="{ 'is-invalid': touched.date && errors.date }"
    >Дата</label>
    <div class="form-card__date-wrapper">
      <input
        id="expense-date"
        v-model="form.date"
        type="date"
        class="form-card__input"
        :class="{ 
          'form-card__input--empty': !form.date,
          'is-invalid': touched.date && errors.date,
        }"
        @blur="touched.date = true"
      />
      <span 
        v-if="!form.date" 
        class="form-card__date-placeholder"
      >Введите дату</span>
    </div>

    <label 
      class="form-card__label" 
      for="expense-amount"
      :class="{ 'is-invalid': touched.amount && errors.amount }"
    >Сумма</label>
    <input
      id="expense-amount"
      v-model="form.amount"
      type="number"
      class="form-card__input"
      :class="{ 'is-invalid': touched.amount && errors.amount }"
      placeholder="Введите сумму"
      @blur="touched.amount = true"
    />

    <button 
      type="submit"
      class="form-card__submit"
      :disabled="!isFormValid"
      >Добавить новый расход
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";

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

const touched = reactive({
  description: false,
  category: false,
  date: false,
  amount: false,
});

const errors = computed(() => ({
  description: form.description.trim() === "",
  category: form.category === "",
  date: form.date === "",
  amount: form.amount === null || form.amount <= 0,
}));

const isFormValid = computed(() =>
  Object.values(errors.value).every((hasError) => !hasError)
);

const addExpense = () => {
  if (!isFormValid.value) return;
  if (form.amount === null) return;

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

  touched.description = false;
  touched.category = false;
  touched.date = false;
  touched.amount = false;
};
</script>

<style scoped>
.form-card {
  background: #fff;
  border-radius: 30px;
  padding: 32px 32px 32px 31px;
  display: flex;
  flex-direction: column;
  max-width: 380px;
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

.form-card__label.is-invalid::after {
  content: " *";
  color: #F25050;
  font-weight: 700;
}

.form-card__input {
  width: 100%;
  padding: 12px 12px;
  border: 0.5px solid #999999;
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

.form-card__input--empty::-webkit-datetime-edit {
  color: transparent;
}

.form-card__input.is-invalid {
  background-color: #FFEBEB;
  border-color: #F25050;
  outline: none;
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

.form-card__submit:disabled {
  background-color: #999999;
  cursor: not-allowed;
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

.form-card__date-wrapper:focus-within .form-card__date-placeholder {
  opacity: 0;
}

.form-card__date-wrapper .form-card__input {
  margin-bottom: 0;
}
</style>
