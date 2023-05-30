import io from "socket.io-client";
import { store } from "../store/store";

const EVENTS = {
  SERVER: {
    joinQueue: "joinQueue",
    color: "color",
    seeMove: "seeMove",
  },
  joinedRoom: "joinedRoom",
  move: "move",
};

const socket = io(import.meta.env.VITE_VCHESS_API_BASE_URL);
socket.disconnect();

socket.on(EVENTS.joinedRoom, ({ roomId, color }) => {
  store.commit("game/setRoomId", roomId);
  store.commit("game/setPlayerColor", color);
});

// So goofy
socket.on(EVENTS.SERVER.seeMove, ({ move }) => {
  const reviewLength = store.getters["game/isInReview"];
  if (reviewLength) {
    store.commit("game/goForward", reviewLength);
  }
  store.commit("game/pushMove", move);
});

export default {
  connect() {
    socket.disconnect();
    socket.connect();
  },
  disconnect() {
    socket.disconnect();
  },
  joinQueue() {
    socket.emit(EVENTS.SERVER.joinQueue);
  },

  move(payload) {
    socket.emit(EVENTS.move, payload);
  },
};
