export const BackGroundConstructor = (audio, volume = 1, loop = false) => {
  const sound = Object.assign(new Audio(), { src: audio, loop: loop, preload: 'auto', volume: volume });
  sound.play();
  return sound;
};

export const InstantConstructor = (audioSrc, volume = 1, loop = false) => {
  const sound = new Audio(audioSrc);
  sound.volume = volume;
  sound.loop = loop;
  sound.preload = 'auto';
  sound.play().catch((err) => console.error(err));
  return sound;
};
