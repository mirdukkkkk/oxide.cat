let audioReady = false;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const SOUNDS = [
    "meow_1.wav",
    "meow_2.wav",
    "meow_3.wav",
    "meow_4.wav"
];

function initAudio() {
    audioReady = true;
    preloadSounds();
}

function preloadSounds() {
    SOUNDS.forEach(sound => {
        new Audio(sound.file);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const oxide = document.getElementById('oxide');

    if(isIOS) {
        document.body.addEventListener('touchstart', initAudio, { once: true });
        document.body.addEventListener('click', initAudio, { once: true });
    } else initAudio();

    oxide.addEventListener('click', playRandomSound, { passive:true });

    async function playRandomSound(event) {
        if (!audioReady) return;

        const file = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];

        const audio = new Audio(`static/${file}`);
        audio.volume = 0.7;
        await audio.play();
    }
})