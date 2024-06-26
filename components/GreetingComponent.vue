<template>
  <div class="greeting">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const title = ref<string>('Üdvözöljük a Vue.js-ban!');
const message = ref<string>('Ez egy egyszerű komponens példája.');

// Angularban az ngOnInit
onMounted(() => {
  console.log('onMounted lefutott');

  setTimeout(() => {
    title.value = 'Lecserélt title!';
  }, 5000);
});

// Angularban az ngOnDestroy
onBeforeUnmount(() => {
  console.log('onBeforeUnmount lefutott');
});
</script>

<style lang="scss" scoped>
.greeting {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #42b983;
}

p {
  color: #35495e;
}
</style>
