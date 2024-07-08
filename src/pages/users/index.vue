<template>
  <div class="container">
    <h1 class="text-center my-5">Felhasználók</h1>

    <div v-if="isError" class="col-lg-8 offset-lg-2 text-center">
      <div class="card text-bg-danger">
        <div class="card-header">Hiba a felhasználók betöltésekor!</div>
        <div class="card-body">
          <h5 class="card-title">Nem sikerült a felhasználói listát betölteni.</h5>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border spinner-border-big" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else v-show="!isError" class="row">
      <div class="col-lg-10 offset-lg-1 col-md-12">
        <div class="d-flex justify-content-end mb-3">
          <button class="btn btn-primary">
            <nuxt-link :to="`/users/0`" class="text-light text-decoration-none">Hozzáad</nuxt-link>
          </button>
        </div>

        <div class="table-responsive">
          <table class="table table-striped mb-5">
            <thead class="table-dark">
              <tr>
                <th scope="col" class="user-select-none cursor-pointer">#</th>

                <!-- Név fejléc -->
                <th scope="col">
                  <span class="d-inline-block align-middle">
                    <span v-if="sortType === SortType.NAME">
                      <img
                        v-if="orderType === OrderType.ASC"
                        src="@/assets/svg/arrow-up-a-z-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = OrderType.DESC"
                      />
                      <img
                        v-else
                        src="@/assets/svg/arrow-up-z-a-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = OrderType.ASC"
                      />
                    </span>
                    <span class="cursor-pointer user-select-none" @click="sortType = SortType.NAME">Név</span>
                  </span>
                </th>

                <!-- Email fejléc -->
                <th scope="col">
                  <span class="d-inline-block align-middle">
                    <span v-if="sortType === SortType.EMAIL">
                      <img
                        v-if="orderType === OrderType.ASC"
                        src="@/assets/svg/arrow-up-a-z-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = OrderType.DESC"
                      />
                      <img
                        v-else
                        src="@/assets/svg/arrow-up-z-a-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = OrderType.ASC"
                      />
                    </span>
                    <span class="cursor-pointer user-select-none" @click="sortType = SortType.EMAIL">E-mail</span>
                  </span>
                </th>

                <!-- Kor fejléc -->
                <th scope="col">
                  <span class="d-inline-block align-middle">
                    <span v-if="sortType === SortType.AGE">
                      <img
                        v-if="orderType === OrderType.ASC"
                        src="@/assets/svg/arrow-up-1-9-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = OrderType.DESC"
                      />
                      <img
                        v-else
                        src="@/assets/svg/arrow-up-9-1-solid.svg"
                        alt="Icon"
                        width="16"
                        height="16"
                        class="me-1 cursor-pointer user-select-none"
                        @click="orderType = OrderType.ASC"
                      />
                    </span>
                    <span class="cursor-pointer user-select-none" @click="sortType = SortType.AGE">Kor</span>
                  </span>
                </th>

                <th scope="col" class="cursor-pointer user-select-none">Törlés</th>
              </tr>
            </thead>
            <tbody>
              <!-- Empty callout -->
              <tr v-if="isEmptyList">
                <th scope="row" colspan="5" class="text-center">Nincs megjeleníthető felhasználó.</th>
              </tr>

              <tr v-for="(user, index) in users" :key="user.id">
                <th scope="row">{{ currentPerPage * (currentPage - 1) + index + 1 }}</th>
                <td class="cursor-pointer">
                  <nuxt-link :to="`/users/${user.id}`" class="text-decoration-none text-black">{{ user.name }}</nuxt-link>
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.age }}</td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    :disabled="isDeleting"
                    @click="setDeletingUserId(user.id)"
                  >
                    Törlés
                  </button>
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td scope="row" colspan="5" class="text-end">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center user-select-none">
                      <span>Oldalméret:</span>
                      <select v-model="currentPerPage" class="form-select form-select-sm w-auto ms-2" @change="onChangePageSize">
                        <option v-for="(pageSize, index) in pageSizes" :key="index" :value="pageSize">
                          {{ pageSize }}
                        </option>
                      </select>
                    </div>
                    <nav aria-label="Page navigation">
                      <ul class="pagination mb-0">
                        <li class="page-item">
                          <a class="page-link text-dark cursor-pointer user-select-none" aria-label="First" @click.prevent="goToFirstPage">
                            <span aria-hidden="true">&laquo;&laquo;</span>
                          </a>
                        </li>
                        <li class="page-item">
                          <a
                            class="page-link text-dark cursor-pointer user-select-none"
                            aria-label="Previous"
                            @click.prevent="goToPreviousPage"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>

                        <!-- Dinamikusan generált oldalszámok -->
                        <template v-if="totalPages > 0">
                          <li
                            v-for="pageNumber in displayedPages"
                            :key="pageNumber"
                            class="page-item"
                            :class="{ active: pageNumber === currentPage }"
                          >
                            <a
                              class="page-link cursor-pointer user-select-none"
                              :class="pageNumber === currentPage ? 'text-white' : 'text-dark'"
                              @click.prevent="goToPage(pageNumber)"
                              >{{ pageNumber }}</a
                            >
                          </li>
                        </template>
                        <li class="page-item">
                          <a class="page-link cursor-pointer user-select-none" aria-label="Next" @click.prevent="goToNextPage">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                        <li class="page-item">
                          <a class="page-link text-dark cursor-pointer user-select-none" aria-label="Last" @click.prevent="goToLastPage">
                            <span aria-hidden="true">&raquo;&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
  <ConfirmModal :id="deletingUserId" @confirmed-delete="deleteUser" />
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useToast } from "vue-toast-notification";
  import UserService from "@/services/UserService";
  import type { User } from "~/models/User";
  import type { ConfirmModal } from "#build/components";
  import { SortType } from "~/enums/SortType";
  import { OrderType } from "~/enums/OrderType";
  import { useState } from "#app";

  const users = ref<User[]>([]);
  const isLoading = ref(true);
  const deletingUserId = ref<string>("");
  const isDeleting = ref(false);
  const isError = ref(false);

  const isEmptyList = ref(false);
  const currentPage = useState<number>("currentPage", () => 1);
  const currentPerPage = useState<number>("currentPerPage", () => 10);
  const orderType = useState<OrderType>("orderType", () => OrderType.ASC);
  const sortType = useState<SortType>("sortType", () => SortType.NAME);
  const totalUserListLength = useState<number>("totalUserListLength", () => 0);

  const pageSizes = [10, 25, 50, 100];
  const toaster = useToast({ duration: 3500 });

  const totalPages = computed(() => Math.ceil(totalUserListLength.value / currentPerPage.value));

  let displayedPages: number[] = [];

  const goToPage = (page: number) => {
    currentPage.value = page;
    fetchUsers();
  };

  const goToFirstPage = () => {
    currentPage.value = 1;
    fetchUsers();
  };

  const goToPreviousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      fetchUsers();
    }
  };

  const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchUsers();
    }
  };

  const goToLastPage = () => {
    currentPage.value = totalPages.value;
    fetchUsers();
  };

  function updateDisplayedPages(): void {
    const maxDisplayedPages = 5;
    const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);
    const startPage = Math.max(1, currentPage.value - halfMaxDisplayedPages);
    const endPage = Math.min(totalPages.value, startPage + maxDisplayedPages - 1);

    displayedPages = [];
    for (let i = startPage; i <= endPage; i++) {
      displayedPages.push(i);
    }
  }

  async function fetchUsers(): Promise<void> {
    try {
      isLoading.value = true;

      const usersResponse = await UserService.getUsers({
        _page: currentPage.value,
        _limit: currentPerPage.value,
        _sort: sortType.value,
        _order: orderType.value,
      });

      // totalUserListLength.value = usersResponse.length;
      totalUserListLength.value = 130; // Beégetve fix tömbméret, mert a JSON szerver régi verziója nem támogatja.
      users.value = usersResponse as User[];
      isError.value = false;

      if (!users.value.length) {
        // isEmptyList.value = true;
      }

      updateDisplayedPages();
    } catch (error) {
      // isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteUser(id: string): Promise<void> {
    try {
      isDeleting.value = true;
      await UserService.deleteUser(id);
      users.value = users.value.filter((user) => user.id !== id);
      fetchUsers();
      toaster.success("Sikeresen törölve lett a felhasználó!");
    } catch (error) {
      toaster.error("Hiba a felhasználó törlésekor!");
    } finally {
      isDeleting.value = false;
      isEmptyList.value = !users.value.length;
    }

    deletingUserId.value = "";
  }

  onMounted(() => {
    fetchUsers();
  });

  function setDeletingUserId(id: string): void {
    deletingUserId.value = id;
  }

  watch(orderType, () => {
    currentPage.value = 1;
    fetchUsers();
  });

  watch(sortType, () => {
    currentPage.value = 1;
    fetchUsers();
  });

  watch(currentPerPage, () => {
    currentPage.value = 1;
    fetchUsers();
  });

  function onChangePageSize(event: Event): void {
    const select = event.target as HTMLSelectElement;
    currentPerPage.value = parseInt(select.value);
  }
</script>

<style lang="scss" scoped>
  .spinner-border {
    margin-top: 50px;
    width: 3rem;
    height: 3rem;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .page-link {
    color: #000;
  }

  .page-link:focus,
  .form-select:focus {
    outline: none;
    box-shadow: none;
  }

  .not-allowed {
    cursor: not-allowed;
    pointer-events: all;
  }
</style>
