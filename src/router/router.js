import { createWebHistory, createRouter } from "vue-router";

import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import Profile from "../views/Profile.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import Analysis from "../views/Analysis.vue";
import Play from "../views/Play.vue";
import ChessGame from "../components/ChessGame.vue";
import Training from "../views/Training.vue";
import RandomPuzzles from "../views/RandomPuzzles.vue";
import Settings from "../views/Settings.vue";
import { store } from "../store/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      alias: "/",
    },
    // {
    //   path: "/profile",
    //   name: "profile",
    //   component: Profile,
    // },
    {
      path: "/log-in",
      name: "profile",
      component: LogIn,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
    },
    {
      path: "/play",
      name: "play",
      component: Play,
    },
    {
      path: "/training",
      name: "training",
      component: Training,
    },
    {
      path: "/random-puzzles",
      name: "random-puzzles",
      component: RandomPuzzles,
    },
    {
      path: "/analysis",
      name: "analysis",
      component: Analysis,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    // {
    //   path: "/settings",
    //   name: "settings",
    //   component: ChessGame,
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
  ],
});

router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
}).href; // '/not/found'

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["auth/isAuthenticated"]) {
      next();
    }
  } else {
    next();
  }
});

export { router };
