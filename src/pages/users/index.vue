<template>
  <div class="container">
    <h1 class="text-center my-5">Felhasználók</h1>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-8 offset-2">
        <div class="d-flex justify-content-end mb-3">
          <button class="btn btn-primary">
            <nuxt-link :to="`/users/0`" class="text-light text-decoration-none">Hozzáad</nuxt-link>
          </button>
        </div>

        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Név</th>
              <th scope="col">E-mail</th>
              <th scope="col">Kor</th>
              <th scope="col">Törlés</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <th scope="row">{{ index + 1 }}</th>
              <td class="cursor-pointer">
                <nuxt-link :to="`/users/${user.id}`" class="text-decoration-none text-black">{{ user.name }}</nuxt-link>
              </td>
              <td>{{ user.email }}</td>
              <td>{{ user.age }}</td>
              <td>
                <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modal" @click="setDeletingUserId(user.id)">
                  Törlés
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ConfirmModal :id="deletingUserId" @confirmed-delete="deleteUser" />
</template>

<script lang="ts" setup type="module">
  import { ref, onMounted } from "vue";
  import UserService from "@/services/UserService";
  import type { User } from "~/models/User";
  import type { ConfirmModal } from "#build/components";

  const users = ref<User[]>([]);
  const isLoading = ref(true);
  const deletingUserId = ref<string>("");

  async function fetchUsers(): Promise<void> {
    try {
      users.value = await UserService.getUsers();
    } catch (error) {
      console.error("Hiba a felhasználók lekérésekor:", error);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteUser(id: string): Promise<void> {
    try {
      await UserService.deleteUser(id);
      users.value = users.value.filter((user) => user.id !== id);
    } catch (error) {
      console.error("Hiba a felhasználó törlésekor:", error);
    }

    deletingUserId.value = "";
  }

  onMounted(() => {
    fetchUsers();
  });

  function setDeletingUserId(id: string): void {
    deletingUserId.value = id;
  }
</script>

<style scoped>
  .spinner-border {
    margin-top: 50px;
    width: 3rem;
    height: 3rem;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>
