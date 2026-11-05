<template>
  <div class="auth">
    <div class="auth__logo">
      <img src="/icons/logo.svg" alt="Skypro.Wallet" />
    </div>

    <form class="auth__card" @submit.prevent="onSubmit">
      <h1 class="auth__title">Вход</h1>

      <input
        v-model.trim="email"
        class="auth__input"
        :class="inputClass(emailTouched, isEmailValid)"
        type="text"
        placeholder="Эл. почта"
        @blur="emailTouched = true"
      />
      <p v-if="emailError" class="auth__error">{{ emailError }}</p>

      <input
        v-model="password"
        class="auth__input"
        :class="inputClass(passwordTouched, isPasswordValid)"
        type="password"
        placeholder="Пароль"
        @blur="passwordTouched = true"
      />
      <p v-if="passwordError" class="auth__error">{{ passwordError }}</p>

      <button class="auth__button" type="submit">Войти</button>

      <p class="auth__hint">Нужно зарегистрироваться?</p>
      <NuxtLink class="auth__link" to="/register"
        >Регистрируйтесь здесь</NuxtLink
      >
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const emailTouched = ref(false);
const passwordTouched = ref(false);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmailValid = computed(() => emailPattern.test(email.value));
const isPasswordValid = computed(() => password.value.length >= 6);

const emailError = computed(() => {
  if (!emailTouched.value || isEmailValid.value) return "";
  return email.value
    ? "Проверьте адрес эл. почты — кажется, в нём ошибка"
    : "Введите эл. почту";
});

const passwordError = computed(() => {
  if (!passwordTouched.value || isPasswordValid.value) return "";
  return password.value
    ? "Пароль должен быть не короче 6 символов"
    : "Введите пароль";
});

const inputClass = (touched: boolean, valid: boolean) => ({
  "auth__input--valid": touched && valid,
  "auth__input--error": touched && !valid,
});

const onSubmit = () => {
  emailTouched.value = true;
  passwordTouched.value = true;

  if (!isEmailValid.value || !isPasswordValid.value) return;

  // здесь будет запрос на вход — добавим, когда подключим бэкенд
  navigateTo("/analysis");
};
</script>

<style scoped>
.auth {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth__logo {
  width: 100%;
  padding: 22px 120px;
  background: #fff;
  display: flex;
  align-items: center;
}

.auth__logo img {
  height: 19px;
}

.auth__card {
  margin-top: 169px;
  width: 379px;
  background: #fff;
  border-radius: 30px;
  padding: 32px 32px 32px 33px;
  box-shadow: 0px 20px 67px -12px #00000021;
  display: flex;
  flex-direction: column;
}

.auth__title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
}

.auth__input {
  width: 100%;
  height: 39px;
  padding: 12px 12px;
  margin-bottom: 12px;
  border: 0.5px solid #999999;
  border-radius: 6px;
  font-size: 12px;
  color: #000;
  outline: none;
}

.auth__input::placeholder {
  color: #999;
}

.auth__input--error {
  border-color: #e53935;
}

.auth__error {
  font-size: 12px;
  color: #e53935;
  margin-top: 6px;
}

.auth__button {
  margin-top: 12px;
  margin-bottom: 24px;
  height: 39px;
  border: none;
  border-radius: 6px;
  background: #7334ea;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.auth__button:hover {
  background: #5f26c7;
}

.auth__hint {
  margin-top: 0;
  font-size: 12px;
  line-height: 150%;
  color: #999;
  text-align: center;
}

.auth__link {
  margin-top: 6px;
  font-size: 12px;
  line-height: 150%;
  color: #999;
  text-align: center;
  text-decoration: underline;
}
</style>
