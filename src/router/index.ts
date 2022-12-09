import SecurityListView from "@/views/SecurityListView.vue";
import HoldingsView from "@/views/HoldingsView.vue";
import TrackingView from "@/views/TrackingView.vue";
import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/security-list",
  },
  {
    path: "/security-list",
    name: "securityList",
    component: SecurityListView,
  },
  {
    path: "/holdings",
    name: "holdings",
    component: HoldingsView,
  },
  {
    path: "/tracking",
    name: "tracking",
    component: TrackingView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/security-list"
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
