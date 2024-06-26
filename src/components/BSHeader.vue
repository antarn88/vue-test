<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand cursor-pointer">Vue.js teszt alkalmazás</NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <div class="navbar-nav">
          <NuxtLink to="/" class="nav-link" exact>Home</NuxtLink>
          <NuxtLink to="/features" class="nav-link">Features</NuxtLink>
          <NuxtLink to="/pricing" class="nav-link">Pricing</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
  user-select: none;
}
</style>
