<template>
  <div class="greeting">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-6">
        <!-- Input adatként megadjuk a labelt, colort és size-ot -->
        <!-- A click eseményre pedig a handleClick fog lefutni a bejövő adatokkal. -->
        <BootstrapButton label="Klikk ide!" color="primary" size="md" @click="handleClick" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { ClickData } from '~/models/ClickData';

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

// Eseménykezelő
function handleClick(outputData: ClickData): void {
  console.log('A gombra klikkeltél, a bejövő adat:', outputData);
}
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
