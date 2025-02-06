import { BackgroundAudio } from "./audio/background"
import { PlayerAudio } from "./audio/player"
import { MenuAudio } from "./audio/menu"

export const AudioMetaData = [
  ...BackgroundAudio,
  ...PlayerAudio,
  ...MenuAudio,
  {
    name: 'coin',
    audio: [
      `/Sound/Additional/Coin1.wav`,
      `/Sound/Additional/Coin3.wav`,
      `/Sound/Additional/Coin2.wav`,
    ],
    volume: 0.8,
    loop: false,
  },
  {
    name: 'kill',
    audio: [
      `/Sound/Additional/Kill.wav`,
    ],
    volume: 0.7,
    loop: false,
  },
  {
    name: 'hit',
    audio: [
      `/Sound/Additional/Hit1.wav`,
      `/Sound/Additional/Hit2.wav`,
    ],
    volume: 0.3,
    loop: false,
  },
  {
    name: 'alert',
    audio: [
      `/Sound/Additional/Alert.wav`,
    ],
    volume: 0.4,
    loop: false,
  },
  {
    name: 'npc',
    audio: [
      `/Sound/Additional/Voice1.wav`,
      `/Sound/Additional/Voice2.wav`,
      `/Sound/Additional/Voice3.wav`,
      `/Sound/Additional/Voice4.wav`,
    ],
    volume: 0.5,
    loop: false,
  },
]
