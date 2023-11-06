// SYNTH INIT
console.log('Loaded app.js')



export const notes = ['B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
export const drums = ['Kick', 'Snare','Hihat'];

const synth = new Tone.MonoSynth({
    oscillator: {
        type: "square"
    },
    envelope: {
        attack: 0.02
    },

}).toDestination();