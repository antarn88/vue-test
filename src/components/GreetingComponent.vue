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
          <!-- v-for -> Angularban ez az ngFor -->
          <p v-for="name in names" :key="name.id" class="mb-0">
            {{ name.name }}
          </p>
        </ul>
      </div>
    </div>

    <!-- Összegek szekció -->
    <div class="row mt-5">
      <div class="col">
        <ul>
          <h5>Összegek (pipe szerű cuccal megoldva)</h5>
          <p v-for="(amount, index) in formattedAmounts" :key="index" class="mb-0">{{ amount }}</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue";

  const isVisible = ref(true);
  const names = ref([
    { id: "1", name: "Gipsz Jakab" },
    { id: "2", name: "Nagy Béla" },
    { id: "3", name: "Kiss Zsolt" },
    { id: "4", name: "Szabó Ernő" },
  ]);

  const amounts = ref([145, 787, 1215, 1219, 78787]);
  const formattedAmounts = computed(() => amounts.value.map((amount: number) => formatMoney(amount)));

  const formatMoney = (amount: number) => {
    if (amount >= 1000 && amount < 10000) {
      return `${amount.toString()[0]} ${amount.toString().slice(-3)} Ft`;
    }

    const formatter = new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    });

    return formatter.format(amount);
  };

  function toggleVisibility(): void {
    isVisible.value = !isVisible.value;
  }
</script>
