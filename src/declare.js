import { View } from './classes/camera';
import { Player } from './classes/player'
import { Game } from './classes/game'
import { MapMetaData } from "./meta/maps";
import { PushGameObjectArray } from './store/gameObject';
import { AudioManager } from './classes/audioManager';
import { AudioMetaData } from './meta/audio';
import { EventMaping, eventEmmiter } from './util/eventBinding';

export const Music = new AudioManager();
Music.preloadAudio(AudioMetaData)

eventEmmiter.on(EventMaping.SELECT_CHAR, (_, val) => {
  const Hero = new Player(`./Actor/Characters/${val}/SpriteSheet.png`);
  eventEmmiter.emit(EventMaping.GAME_START, (Hero));
  PushGameObjectArray(Hero)
});
export const Camera = new View();
export const Map = new Game(MapMetaData);
