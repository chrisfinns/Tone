
// SYNTH INIT
console.log('Loaded app.js')
const notes = ['B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
const drums = ['Kick', 'Snare','Hihat'];

const synth = new Tone.MonoSynth({
    oscillator: {
        type: "triangle"
    }
 

}).toDestination();
synth.volume.value = -6;



const drumSamples = new Tone.Sampler({
    urls: {
        A1: kickUrl,
        B1: snareUrl,
        C1: hihatUrl
    },
    onload: () => {
        sampler.triggerAttackRelease(["A1"]);
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

function save(notes, drums) {
    beat = [notes, drums];
    console.log(beat)

    fetch('/savebeat', {
    method: 'POST',
    body: JSON.stringify({
        melody: beat[0],
        drums: beat[1]
    })
});    
}


// MAKE THE SEQUENCER IN THE DOM
function makeSequencer(array) {

    const container = document.getElementById("container");
    const sequencer = document.createElement('div');
    sequencer.className = 'sequencer'

    container.appendChild(sequencer);

    array.forEach((row, rowIndex) => {
        
        
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
            button.innerHTML = `${note.note}`;

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
            button.innerHTML = `${note.note}`;




            });
        });

    })
}

let index = 0;
let grid = makeGrid(notes);
let drumGrid = makeGrid(drums);

function repeat(time) {

    let step = index % 8;
    const rowLength = grid[1].length;

    for (let i = 0; i < grid.length; i++) {
        let step = (index % 8);
        let note = grid[i][step];
        console.log(i)

        if ( i < drumGrid.length) {
            let drum = drumGrid[i][step]; // ** This array only have 3 rows so 'i' will return an error 
        
            if (drum.isActive === true) {
                // Trigger the corresponding drum sound based on the drum type
                switch (drum.note) {
                    case 'Kick':
                        drumSamples.triggerAttackRelease('A1', );
                        break;
                    case 'Snare':
                        drumSamples.triggerAttackRelease('B1');
                        break;
                    case 'Hihat':
                        drumSamples.triggerAttackRelease('C1');
                        break;
                    // Add more cases for other drum types if needed
                }
            }
        }



        if (note.isActive === true) {

            synth.triggerAttackRelease(note.note, '8n', time);
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

// For the home page
const homePage = {
    init: function () {
        //console.log(${melody_json})
        
    },
    // Other functions specific to the home page
};

console.log('Current pathname:', window.location.pathname);


if (window.location.pathname === '/') {
    console.log('Initializing home page code');
    homePage.init();
}
else if (window.location.pathname === '/beat/1') {
    
    console.log("This is the beat/1 page")

    fetch('/beat/1')
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        })
}  

window.addEventListener("DOMContentLoaded", () => {


    makeSequencer(grid);
    makeSequencer(drumGrid)
    const playBTN = document.getElementById("play-btn");
    const saveBTN = document.getElementById("save-btn");

    Tone.Transport.scheduleRepeat(repeat, '8n');

    playBTN.addEventListener('click', () => {
        Tone.start()
        //drumSamples.triggerAttackRelease('A1', 0.5)

        //drums.triggerAttackRelease('B1', 0.5)

        //snare.triggerAttackRelease('B1', 0.5)

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
        save(grid, drumGrid)
    

    })

    
});