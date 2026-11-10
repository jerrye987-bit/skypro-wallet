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
      <p v-if="serverError" class="auth__error">{{ serverError }}</p>

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
import { signIn } from "~/api/auth";

const {
  email,
  password,
  emailTouched,
  passwordTouched,
  isEmailValid,
  isPasswordValid,
  emailInvalid,
  passwordInvalid,
  hasError,
  inputClass,
  isSubmitDisabled,
  serverError,
  onSubmit,
} = useAuthForm(
  ({ login, password: pwd }) => signIn({ login, password: pwd }),
  "Неверный логин или пароль",
  { withName: false },
);

</script>

<style scoped>
@import "~/assets/css/auth.css";

.auth__card {
  margin-top: 169px;
}

.auth__button {
  font-size: 14px;
}
</style>
