// SYNTH INIT
console.log('Loaded app.js')
const notes = ['B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
const drums = ['Kick', 'Snare','Hihat'];

const synth = new Tone.MonoSynth({
    oscillator: {
        type: "square"
    },
    envelope: {
        attack: 0.02
    },

}).toDestination();




// MAKING THE STEPS IN THE SEQUENCER
function makeGrid(notes){

  const rows = [];
  for (const note of notes) {
    const row = [];

    for (let i = 0; i < 8; i++) {
        row.push({
            note: note,
            isActive: false
        });
    }
    rows.push(row);
    }

  return rows;
};

function save(sequence) {
    
}

let index = 0;
let grid = makeGrid(notes);
let drum_grid = makeGrid(drums);


// MAKE THE SEQUENCER IN THE DOM
function makeSequencer(grid) {

    const container = document.getElementById("container");
    const sequencer = document.createElement('div');
    sequencer.className = 'sequencer'

    container.appendChild(sequencer);

    grid.forEach((row, rowIndex) => {
        
        
        const seqRow = document.createElement("div");
        seqRow.id = 'rowIndex';
        seqRow.className = 'sequencer-row';
        
        sequencer.appendChild(seqRow);

        row.forEach((note, noteIndex) => {
            //  
            const button = document.createElement('button');
            button.classList.add('note', 'note-is-not-active')
            // 
            sequencer.appendChild(button)
            button.innerHTML = `${note.isActive}`;

            button.addEventListener('click', () => {


                if (note.isActive === false) {
                    note.isActive = true;
                    button.classList.remove('note-is-not-active')

                    button.classList.add('note-is-active')
                } else {
                    note.isActive = false;
                    button.classList.add('note-is-not-active')
                    button.classList.remove('note-is-active')


                };          
            button.innerHTML = `${note.isActive}`;




            });
        });

    })
}

function repeat(time) {

    let step = index % 8;
    const rowLength = grid[1].length;

    for (let i = 0; i < grid.length; i++) {
        let step = (index % 8);
        // console.log('Hello')
        let note = grid[i][step];
        //console.log(note)
        //console.log(note)
        //console.log(index)
        if (note.isActive === true) {
            synth.triggerAttackRelease(note.note, '8n', time)
            console.log(`Note: ${note.note} at row: ${i} on step ${step}`)
            console.log
        }


    };
    index++;
}







/* const handleclicks = () => {
    // iterate through the  grid
    grid.forEach((row, rowIndex) => {
        //  iterate over each note in a row
        row.forEach((note, noteIndex) => {
            console.log(note.isActive)

        });
    });
}; */

window.addEventListener("DOMContentLoaded", () => {
    makeSequencer(grid);
    makeSequencer(drum_grid)
    const playBTN = document.getElementById("play-btn");
    const saveBTN = document.getElementById("save-btn");



    Tone.Transport.scheduleRepeat(repeat, '8n');


    playBTN.addEventListener('click', () => {
        Tone.start()
            console.log(Tone.Transport.state);
            // Start the Tone.Transport
            if (Tone.Transport.state !== 'started') {
                Tone.Transport.start();
            } else {
                Tone.Transport.stop();
            }
        //});
    });

    saveBTN.addEventListener('click', () => {
        save(grid);
        save(drum_grid);
    })
});