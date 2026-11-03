<template>
  <div class="card period">
    <h2 class="period__title">Период</h2>
    <ExpenseCalendar />
  </div>
</template>


<style scoped>
.card {
  background: #fff;
  border-radius: 30px;
  padding: 32px 32px 6px 32px;
  height: 540px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0px 20px 67px -12px #00000021;
}

.period__title {
  font-size: 24px;
  font-weight: 700;
  line-height: 150%;
}

.period :deep(.calendar) {
  flex: 1;
  min-height: 0;
  margin: 24px -32px 0;
}
</style>
