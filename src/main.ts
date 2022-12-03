import { createApp } from "vue";
import App from "./App.vue";
import "./samples/node-api";
import draggable from "./components/draggable.directive";

createApp(App)
  .directive("draggable", draggable)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
