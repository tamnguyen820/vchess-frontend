import axios from "axios";

const explorerBase = axios.create({
  baseURL: import.meta.env.VITE_LICHESS_API_BASE_URL,
});

export default {
  // Get opening info from lichess/masters databases
  getOpeningInfo(play, from = "lichess") {
    return explorerBase.get(from + "?play=" + play);
  },
};
