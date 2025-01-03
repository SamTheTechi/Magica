export const AudioConstructor = (audio, volume = 1, loop = false) => {
  let sound = Object.assign(new Audio(), { src: audio, loop: loop, preload: 'auto', volume: volume });
  sound.onended = () => {
    sound = null;
  }
  return sound;
};
