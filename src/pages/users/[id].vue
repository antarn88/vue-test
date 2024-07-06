<template>
  <div class="container">
    <h1 class="text-center my-5">{{ userId === "0" ? "Felhasználó hozzáadása" : "Felhasználó szerkesztése" }}</h1>

    <div v-if="!isFormLoaded" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-lg-8 offset-lg-2">
        <form @submit="onSubmit">
          <!-- Név -->
          <div class="mb-3">
            <label for="name" class="form-label">Név</label>
            <Field v-slot="{ errors, field }" name="name">
              <input v-bind="field" id="name" type="text" name="name" class="form-control" :class="{ 'is-invalid': errors[0] }" />
            </Field>
            <ErrorMessage name="name" class="invalid-feedback" />
          </div>

          <!-- E-mail -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field v-slot="{ errors, field }" name="email">
              <input v-bind="field" id="email" type="email" name="email" class="form-control" :class="{ 'is-invalid': errors[0] }" />
            </Field>
            <ErrorMessage name="email" class="invalid-feedback" />
          </div>

          <!-- Kor -->
          <div class="mb-3">
            <label for="age" class="form-label">Kor</label>
            <Field v-slot="{ errors, field }" name="age">
              <input v-bind="field" id="age" type="number" name="age" class="form-control" :class="{ 'is-invalid': errors[0] }" />
            </Field>
            <ErrorMessage name="age" class="invalid-feedback" />
          </div>

          <div class="d-flex justify-content-center mt-3">
            <div class="d-flex gap-3">
              <!-- Loading gomb -->
              <button v-if="isSaving" class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status"> Mentés...</span>
              </button>

              <button v-else type="submit" class="btn btn-primary" :disabled="!meta.valid || isSaving">Mentés</button>

              <button type="button" class="btn btn-secondary" :disabled="isSaving" @click="$router.push('/users')">Vissza</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import UserService from "@/services/UserService";
  import * as yup from "yup";
  import { useForm, ErrorMessage, Field, configure } from "vee-validate";
  import { useToast } from "vue-toast-notification";

  const toaster = useToast({ duration: 3500 });

  const isFormLoaded = ref(false);
  const isSaving = ref(false);

  const route = useRoute();
  const router = useRouter();
  const userId = ref<string | null>(route.params.id as string);

  // Validációs séma létrehozása
  const schema = yup.object({
    name: yup.string().required("A név megadása kötelező!").min(3, "Minimum karakter: 3").max(50, "Maximum karakter: 50"),
    email: yup.string().email("Érvénytelen e-mail!").required("Az e-mail megadása kötelező!"),
    age: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === undefined ? undefined : value;
      })
      .nullable()
      .required("A kor megadása kötelező!")
      .min(1, "Minimum érték: 1")
      .max(150, "Maximum érték: 150")
      .typeError("A kor megadása kötelező!"),
  });

  // Form kezelése
  const { handleSubmit, setValues, setErrors, meta } = useForm({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      age: undefined,
    },
  });

  configure({
    validateOnInput: true,
  });

  const goBack = () => {
    router.push("/users");
  };

  onMounted(async () => {
    if (userId.value === "0") {
      isFormLoaded.value = true;

      return;
    }

    try {
      const userData = await UserService.getUserById(userId.value);

      setErrors({
        name: undefined,
        email: undefined,
        age: undefined,
      });

      setValues({
        ...userData,
        age: userData.age !== undefined ? Number(userData.age) : undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      isFormLoaded.value = true;
    } catch (error) {
      toaster.error("Hiba a felhasználó adatainak lekérésekor!");
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!meta.value.valid) {
      return;
    }

    if (userId.value === "0") {
      try {
        isSaving.value = true;
        await UserService.createUser({ ...values, age: Number(values.age) });

        toaster.success("Sikeresen létrejött a felhasználó!");

        goBack();
      } catch (error) {
        isSaving.value = false;
        toaster.error("Hiba a felhasználó létrehozásakor!");
      }
    } else {
      try {
        isSaving.value = true;
        await UserService.updateUser(userId.value || "", values);
        toaster.success("Sikeresen frissült a felhasználó!");
        goBack();
      } catch (error) {
        isSaving.value = false;
        toaster.error("Hiba a felhasználó frissítésekor!");
      }
    }
  });
</script>
