<template>
  <div class="auth">
    <div class="auth__logo">
      <img src="/icons/logo.svg" alt="Skypro.Wallet" >
    </div>

    <form class="auth__card" @submit.prevent="onSubmit">
      <h1 class="auth__title">Регистрация</h1>

      <div class="auth__field">
        <input
          v-model.trim="name"
          class="auth__input"
          :class="inputClass(nameTouched, isNameValid)"
          type="text"
          autocomplete="name"
          :placeholder="nameInvalid && !name ? 'Ваш Имя *' : 'Ваш Имя'"
          @blur="nameTouched = true"
        >
        <span
          v-if="nameInvalid && name"
          class="auth__star-layer"
          aria-hidden="true"
        >
          <span class="auth__star-ghost">{{ name }}</span
          ><span class="auth__star">*</span>
        </span>
      </div>

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
        <span
          v-if="emailInvalid && email"
          class="auth__star-layer"
          aria-hidden="true"
        >
          <span class="auth__star-ghost">{{ email }}</span
          ><span class="auth__star">*</span>
        </span>
      </div>

      <div class="auth__field">
        <input
          v-model="password"
          class="auth__input"
          :class="inputClass(passwordTouched, isPasswordValid)"
          type="password"
          autocomplete="new-password"
          :placeholder="passwordInvalid && !password ? 'Пароль *' : 'Пароль'"
          @blur="passwordTouched = true"
        >
        <span
          v-if="passwordInvalid && password"
          class="auth__star-layer"
          aria-hidden="true"
        >
          <span class="auth__star-ghost">{{ "•".repeat(password.length) }}</span
          ><span class="auth__star">*</span>
        </span>
      </div>

      <p v-if="hasError" class="auth__error">
        Упс! Введенные вами данные некорректны. Введите данные корректно и
        повторите попытку.
      </p>
      <p v-if="serverError" class="auth__error">{{ serverError }}</p>

      <button class="auth__button" type="submit" :disabled="isSubmitDisabled">
        Зарегистрироваться
      </button>

      <p class="auth__hint">Уже есть аккаунт?</p>
      <NuxtLink class="auth__link" to="/login">Войдите здесь</NuxtLink>
    </form>
  </div>
</template>

<script setup lang="ts">
import { signUp } from "~/api/auth";

const {
  name,
  email,
  password,
  nameTouched,
  emailTouched,
  passwordTouched,
  isNameValid,
  isEmailValid,
  isPasswordValid,
  nameInvalid,
  emailInvalid,
  passwordInvalid,
  hasError,
  inputClass,
  isSubmitDisabled,
  serverError,
  onSubmit,
} = useAuthForm(
  (fields) => signUp(fields),
  "Не удалось зарегистрироваться",
);

</script>

<style scoped>
@import "~/assets/css/auth.css";

.auth__card {
  margin-top: 143px;
}

.auth__button {
  font-size: 12px;
}
</style>
