// import * as Tone from 'tone'


document.addEventListener('DOMContentLoaded', () => {

const playBTN = document.getElementById("play-btn");
const synth = new Tone.Synth().toDestination();

const notes = [
    'C4', 'C4', 'G4',
    'E5', 'F5', 'G5',
];



var index = 0;



function repeat(time) {
    let note = notes[index % notes.length];
    synth.triggerAttackRelease(note, '8n', time);
    index++
    console.log(index % notes.length);

}

Tone.Transport.scheduleRepeat(time => {
    repeat(time);
}, '8n')
 Tone.Transport.bpm.value = 80
playBTN.addEventListener('click', () => {
    if (Tone.context.state !== "running") {
        Tone.start();
    }
    Tone.Transport.start();
});




});

