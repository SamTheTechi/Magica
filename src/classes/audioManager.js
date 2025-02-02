import { AudioConstructor } from "../util/audioConstructor";

export class AudioManager {
  constructor() {
    this.audios = {};
  }

  preloadAudio(MetaData) {
    MetaData.forEach((item) => {
      this.audios[item.name] = item.audio.map((audioSrc) =>
        AudioConstructor(audioSrc, item.volume, item.loop)
      );
    })
  }

  playAudio(name) {
    let track = this.audios[name]
    let sound = track[Math.floor(Math.random() * track.length)];
    sound.play().catch((err) => err)
  }

  stopAllAudio() {
    Object.values(this.audios).forEach((track) => {
      track.forEach((audio) => {
        audio.pause();
      });
    });
  }
}
