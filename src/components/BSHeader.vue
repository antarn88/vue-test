<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand cursor-pointer" exact-active-class="active">Vue.js teszt alkalmazás</NuxtLink>
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
          <!-- exact-active-class="active" Így aktív marad mindig a menüpont, amin jelenleg állunk-->
          <NuxtLink to="/" class="nav-link" exact exact-active-class="active">Kezdőlap</NuxtLink>
          <NuxtLink to="/users" class="nav-link" exact exact-active-class="active">Felhasználók</NuxtLink>
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
