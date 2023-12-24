import { store } from "../store/store"

const audioSrc = "assets/sounds/"
const audios = {}
const audioMapping = {
  "click": "Click.ogg",
  "move": "Move.mp3",
  "capture": "Capture.mp3"
}

for (const name in audioMapping) {
  const fullSrc = audioSrc + audioMapping[name]
  audios[name] = new Audio(fullSrc)
}

export default function playSound(name) {
  if (store.getters["settings/getSoundOn"]) {
    const audio = audios[name]
    audio.play()
  }
}
