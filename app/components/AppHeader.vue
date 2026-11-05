<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink to="/" class="header__logo">
        <img src="/icons/logo.svg" alt="Skypro.Wallet" />
      </NuxtLink>
      <nav class="header__nav">
        <NuxtLink to="/" class="header__link" data-text="Мои расходы"
          >Мои расходы</NuxtLink
        >
        <NuxtLink
          to="/analysis"
          class="header__link"
          data-text="Анализ расходов"
          >Анализ расходов</NuxtLink
        >
      </nav>
      <NuxtLink to="/login" class="header__link header__exit">Выйти</NuxtLink>
    </div>
  </header>
</template>

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

.header__exit {
  font-weight: 600;
}

.header__link.router-link-active {
  color: #7334ea;
  font-weight: 600;
  text-decoration: underline;
}
</style>
