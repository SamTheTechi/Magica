import { InstantConstructor, BackGroundConstructor } from "../util/audioConstructor";

export class AudioManager {
  constructor() {
    this.audios = {};
    this.audioMetaData = {};
  }

  preloadAudio(metaDataArray) {
    metaDataArray.forEach((item) => {
      if (item.type === 'bg') {
        this.audios[item.name] = item.audio.map((audioSrc) =>
          BackGroundConstructor(audioSrc, item.volume, item.loop)
        );
      } else {
        this.audioMetaData[item.name] = item.audio.map((audioSrc) => ({
          src: audioSrc,
          volume: item.volume,
          loop: item.loop,
        }));
      }
    });
  }

  playAudio(name, type) {
    if (type === 'bg' || this.audios[name]) {
      let track = this.audios[name];
      if (!track || track.length === 0) return;
      let sound = track[Math.floor(Math.random() * track.length)];
      if (sound.paused) {
        sound.play().catch((err) => console.error(err));
      }
      return sound;
    } else {
      let metaList = this.audioMetaData[name];
      if (!metaList || metaList.length === 0) return;
      let meta = metaList[Math.floor(Math.random() * metaList.length)];
      return InstantConstructor(meta.src, meta.volume, meta.loop);
    }
  }

  stopAllAudio() {
    Object.values(this.audios).forEach((track) => {
      track.forEach((audio) => {
        audio.pause();
      });
    });
  }
}
