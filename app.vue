<template>
  <div class="greeting">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref<string>('Üdvözöljük a Vue.js-ban!')
const message = ref<string>('Ez egy egyszerű komponens példája.')
</script>

<style scoped>

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
