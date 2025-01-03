import { BackgroundAudio } from "./audio/background"
import { PlayerAudio } from "./audio/player"

export const AudioMetaData = [
  ...BackgroundAudio,
  ...PlayerAudio,
  {
    name: 'coin',
    audio: [
      `../../public/Sounds/Game/Coin.wav`,
      `../../public/Sounds/Game/Gold2.wav`,
      `../../public/Sounds/Game/Gold1.wav`
    ],
    volume: 0.8,
    loop: false,
  },
  {
    name: 'kill',
    audio: [
      `../../public/Sounds/Game/Kill.wav`,
    ],
    volume: 0.7,
    loop: false,
  },
  {
    name: 'hit',
    audio: [
      `../../public/Sounds/Game/Hit4.wav`,
      `../../public/Sounds/Game/Hit.wav`,
    ],
    volume: 0.3,
    loop: false,
  },
  {
    name: 'alert',
    audio: [
      `../../public/Sounds/Game/Alert2.wav`,
    ],
    volume: 0.4,
    loop: false,
  },
]
