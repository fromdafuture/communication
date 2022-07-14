import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserDayDate from "@/components/mytimetable/UserDayDate";
import UserWeekDate from "@/components/mytimetable/UserWeekDate";
import UserMonthDate from "@/components/mytimetable/UserMonthDate";
import UserDayRow from "@/components/mytimetable/UserDayRow";
import UserWeekRow from "@/components/mytimetable/UserWeekRow";
import UserMonthRow from "@/components/mytimetable/UserMonthRow";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      { path: "mytimetable/day/dates", component: UserDayDate },
      { path: "mytimetable/week/dates", component: UserWeekDate },
      { path: "mytimetable/month/dates", component: UserMonthDate },
      { path: "mytimetable/day/rows", component: UserDayRow },
      { path: "mytimetable/week/rows", component: UserWeekRow },
      { path: "mytimetable/month/rows", component: UserMonthRow },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
