import { View } from './classes/camera';
import { Player } from './classes/player'
import { Game } from './classes/game'
import { MapMetaData } from "./meta/maps";
import { PushGameObjectArray } from './store/gameObject';
import { AudioManager } from './classes/audioManager';
import { AudioMetaData } from './meta/audio';

export const Music = new AudioManager();
Music.preloadAudio(AudioMetaData)

export const Camera = new View();
export const Map = new Game(MapMetaData)
export const Hero = new Player('./Actor/Characters/Princess/SpriteSheet.png');
PushGameObjectArray(Hero)
