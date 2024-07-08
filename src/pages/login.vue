<template>
  <div class="container my-5 d-flex justify-content-center">
    <div class="card login-card" style="width: 30rem">
      <img src="@/assets/image/logo.jpg" class="align-self-center" alt="..." />
      <div class="card-body">
        <h5 class="card-title text-center mb-4">Bejelentkezés</h5>
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail cím *</label>
            <Field v-slot="{ errors, field }" name="email">
              <input v-bind="field" id="email" type="email" name="email" class="form-control" :class="{ 'is-invalid': errors[0] }" />
            </Field>
            <ErrorMessage name="email" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Jelszó *</label>
            <Field v-slot="{ errors, field }" name="password">
              <input
                v-bind="field"
                id="password"
                type="password"
                name="password"
                class="form-control"
                :class="{ 'is-invalid': errors[0] }"
              />
            </Field>
            <ErrorMessage name="password" class="invalid-feedback" />
          </div>

          <div class="">
            <button class="btn btn-primary w-100" @click="onSubmit">Bejelentkezés</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as yup from "yup";
  import { useForm, ErrorMessage, Field, configure } from "vee-validate";
  import { useToast } from "vue-toast-notification";
  import { useState } from "#app";
  import type { User } from "~/models/User";
  import { login } from "~/middleware/auth";
  import { navigateTo } from "#app";

  const toast = useToast({ duration: 5000 });

  const loggedInUser = useState<User | undefined>("loggedInUser", () => undefined);

  const schema = yup.object({
    email: yup.string().email("Érvénytelen e-mail!").required("Az e-mail megadása kötelező!"),
    password: yup.string().required("A jelszó megadása kötelező!"),
  });

  const { handleSubmit, meta } = useForm({
    validationSchema: schema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  configure({
    validateOnInput: true,
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!meta.value.valid) {
      return;
    }

    const response = await login(values);
    if (response?.status === 200 && response.data.accessToken) {
      loggedInUser.value = response.data.user;
      document.cookie = `accessToken=${response.data.accessToken}`;
      localStorage.setItem("accessToken", response.data.accessToken);
      navigateTo("/");
    } else if (response?.status === 400) {
      toast.error("Rossz felhasználónév vagy jelszó!");
    } else {
      toast.error("Ismeretlen hiba történt!");
    }
  });
</script>
