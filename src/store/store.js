import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import { settings } from "./settings.js";
import { game } from "./game.js";
import { engine } from "./engine.js";
import { analysisSettings } from "./analysisSettings.js";
import { auth } from "./auth.js";

export const store = createStore({
  modules: {
    settings,
    game,
    engine,
    analysisSettings,
    auth,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
