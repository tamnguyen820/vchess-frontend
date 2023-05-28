import axios from "axios";

const vchessBase = axios.create({
  baseURL: import.meta.env.VITE_VCHESS_API_BASE_URL,
  withCredentials: true,
});

export default {
  register(payload) {
    return vchessBase.post("/auth/register", payload);
  },
  login(payload) {
    return vchessBase.post("/auth/login", payload);
  },
  logout() {
    return vchessBase.post("/auth/logout");
  },
};
