<template>
  <!-- ':class' = dinamikus class hozzárendelés, akár feltételesen is -->
  <button class="btn" :class="['btn-' + color, 'btn-' + size]" @click="emitClick">{{ label }}</button>
</template>

<script lang="ts" setup>
  const emit = defineEmits(["click"]); // defineEmits(['click', 'hover', 'focus']);

  // Input propok, amiket definiálunk
  defineProps({
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "md",
    },
  });

  function emitClick(): void {
    const customData = {
      message: "Output adat szövege",
      timestamp: new Date().toISOString(),
    };

    emit("click", customData);
  }
</script>

<style scoped>
  /* Itt lehet egyedi stílusokat hozzáadni, ha szükséges */
</style>
