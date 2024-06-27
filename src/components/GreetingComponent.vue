<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-6">
        <button class="btn btn-primary" @click="toggleVisibility">Toggle Visibility</button>

        <!-- v-if -> Ha nem látszik, akkor a DOM-ból is eltűnik az elem! Angularban ez ngIf -->
        <p v-if="isVisible">Ez egy feltételesen megjelenített szöveg.</p>

        <!-- v-show -> Ha nem látszik, a DOM-ban ettől még megjelenik! Angularban ez hidden -->
        <p v-show="isVisible">Ez egy feltételesen elrejtett szöveg.</p>
      </div>

      <div class="col-6">
        <ul>
          <h5>Nevek kiírása ciklussal</h5>
          <!--v-for -> Angularban ez az ngFor -->
          <p v-for="name in names" :key="name.id" class="mb-0">{{ name.name }}</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isVisible = ref(true);
const names = ref([
  { id: '1', name: 'Gipsz Jakab' },
  { id: '2', name: 'Nagy Béla' },
  { id: '3', name: 'Kiss Zsolt' },
  { id: '4', name: 'Szabó Ernő' },
]);

function toggleVisibility(): void {
  isVisible.value = !isVisible.value;
}
</script>
