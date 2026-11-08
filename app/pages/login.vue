<template>
  <div class="auth">
    <div class="auth__logo">
      <img src="/icons/logo.svg" alt="Skypro.Wallet" >
    </div>

    <form class="auth__card" @submit.prevent="onSubmit">
      <h1 class="auth__title">Вход</h1>

      <div class="auth__field">
        <input
          v-model.trim="email"
          class="auth__input"
          :class="inputClass(emailTouched, isEmailValid)"
          type="text" 
          autocomplete="email"
          :placeholder="emailInvalid && !email ? 'Эл. почта *' : 'Эл. почта'"
          @blur="emailTouched = true"
        >
        <span v-if="emailInvalid && email" class="auth__star-layer" aria-hidden="true">
          <span class="auth__star-ghost">{{ email }}</span><span class="auth__star">*</span>
        </span>
      </div>

      <div class="auth__field">
        <input
          v-model="password"
          class="auth__input"
          :class="inputClass(passwordTouched, isPasswordValid)"
          type="password" 
          autocomplete="current-password"
          :placeholder="passwordInvalid && !password ? 'Пароль *' : 'Пароль'"
          @blur="passwordTouched = true"
        >
        <span v-if="passwordInvalid && password" class="auth__star-layer" aria-hidden="true">
          <span class="auth__star-ghost">{{ '•'.repeat(password.length) }}</span><span class="auth__star">*</span>
        </span>
      </div>

      <p v-if="hasError" class="auth__error">
        Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.
      </p>

      <button class="auth__button" type="submit" :disabled="isSubmitDisabled">
        Войти
      </button>

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

const emailInvalid = computed(() => emailTouched.value && !isEmailValid.value);
const passwordInvalid = computed(() => passwordTouched.value && !isPasswordValid.value);

const hasError = computed(() => emailInvalid.value || passwordInvalid.value);

const inputClass = (touched: boolean, valid: boolean) => ({
  "auth__input--valid": touched && valid,
  "auth__input--error": touched && !valid,
});

const isSubmitDisabled = computed(() => hasError.value);

const onSubmit = () => {
  emailTouched.value = true;
  passwordTouched.value = true;

  if (isSubmitDisabled.value) return;

  // здесь будет запрос на вход
  navigateTo("/");
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
  padding: 0 12px;
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

.auth__input.auth__input--error {
  border-color: #f25050;
  background-color: #ffebeb;
}
.auth__input.auth__input--error::placeholder {
  color: #f25050;
}

.auth__input--valid {
  border-color: #7334ea;
  background: #f1ebfd;
}

.auth__error {
  font-size: 12px;
  color: #f84d4d;
  line-height: 150%;
  letter-spacing: -1%;
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
  background: #7334ea;
}

.auth__button:disabled {
  background: #999999;
  cursor: not-allowed;
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

.auth__field {
  position: relative;
}

.auth__star-layer {
  position: absolute;
  inset: 0;
  padding: 0 12px;
  display: flex;
  align-items: center;
  font-size: 12px;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
}

.auth__star-ghost {
  visibility: hidden;
  white-space: pre;
}

.auth__star {
  color: #F84D4D;
  margin-left: 5px;
  transform: translateY(-10px);
}

.auth__input:-webkit-autofill,
.auth__input:-webkit-autofill:hover,
.auth__input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 60px #f1ebfd inset;
  -webkit-text-fill-color: #000;
}

.auth__input.auth__input--valid:-webkit-autofill,
.auth__input.auth__input--valid:-webkit-autofill:hover,
.auth__input.auth__input--valid:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 60px #f1ebfd inset;
  -webkit-text-fill-color: #000;
  border-color: #7334ea;
}
</style>
