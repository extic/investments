import { createApp } from "vue";
import App from "./App.vue";
import "./samples/node-api";
import { createPinia } from "pinia";
import draggable from "./components/draggable.directive";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .directive("draggable", draggable)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
