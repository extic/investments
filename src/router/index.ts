import SecurityListView from "@/views/SecurityListView.vue";
import PortfolioView from "@/views/PortfolioView.vue";
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
    path: "/portfolio",
    name: "portfolio",
    component: PortfolioView,
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
