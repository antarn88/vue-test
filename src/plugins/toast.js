import ToastPlugin from "vue-toast-notification";
import { defineNuxtPlugin } from "#imports";
import "vue-toast-notification/dist/theme-bootstrap.css";

export default defineNuxtPlugin(() => {
  return ToastPlugin;
});
