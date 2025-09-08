import { Howl } from "howler";

const sounds: Record<string, Howl> = {
  kokiriForest: new Howl({
    src: ["/assets/audio/kokiri-forest.mp3"],
    loop: true,
    volume: 1,
    autoplay: true,
  }),
  skullKidLaugh: new Howl({
    src: ["/assets/audio/skull-kid-laugh.mp3"],
    loop: false,
    volume: 1,
  }),
  spinning: new Howl({
    src: ["/assets/audio/slot-machine-sound.wav"],
    loop: false,
    volume: 1,
  }),
};

// Funtions to interact with audios
export const playSound = (name: keyof typeof sounds) => {
  sounds[name]?.play();
};

export const stopSound = (name: keyof typeof sounds) => {
  sounds[name]?.stop();
};

export const setVolume = (name: keyof typeof sounds, volume: number) => {
  sounds[name]?.volume(volume);
};

export default sounds;
