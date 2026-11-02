<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, { 'btn--active': active }]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary";
  active?: boolean;
}>();

defineEmits<{ (e: "click"): void }>();
</script>

<style module>
.btn {
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s;
}
.btn--primary {
  background: #8a78ff;
  color: #fff;
  padding: 10px 20px;
}
.btn--primary:hover {
  background: #7360d6;
}
.btn--secondary {
  background: transparent;
  color: #333;
  padding: 10px 20px;
}
.btn--active {
  color: #8a78ff;
  text-decoration: underline;
  font-weight: 600;
}
</style>
