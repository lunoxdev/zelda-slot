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
export const playSound = (name: string) => {
  sounds[name]?.play();
};

export const stopSound = (name: string) => {
  sounds[name]?.stop();
};

export default sounds;
