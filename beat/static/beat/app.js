// import * as Tone from 'tone'
console.log('Loaded app.js')
const notes = ['B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];

const synth = new Tone.Synth().toDestination();




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

let grid = makeGrid(notes);
//const makeSequencer =  () => {
    
const makeSequencer = () => {

    const sequencer = document.getElementById("sequencer");

    grid.forEach((row, rowIndex) => {
        
    //  console.log(`Value at index ${rowIndex}: ${row}`);
        
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
            button.innerHTML = `${note.isActive} ${note.note}`;

            // Add a event listener to each note
            button.addEventListener('click', () => {
                //console.log(Tone.context.state);

                //console.log(`${note.note}`)
                //synth.triggerAttackRelease(`${note.note}`, '8n');

                if (note.isActive === false) {
                    note.isActive = true;
                    button.classList.remove('note-is-not-active')

                    button.classList.add('note-is-active')
                } else {
                    note.isActive = false;
                    button.classList.add('note-is-not-active')
                    button.classList.remove('note-is-active')


                };          
            button.innerHTML = `${note.isActive} ${note.note}`;

            });
        });

    })

}
let index = 0;

function repeat(time) {

    let step = index % 8;
    const rowLength = grid[1].length;
    //  console.log(step)
    //  console.log(grid[0]);
/*     grid.forEach((row, rowIndex) => {
        console.log(row[index])


    }); */

    for (let i = 0; i < grid.length; i++) {
        let step = (index % 8);
        // console.log('Hello')
        let note = grid[i][step];
        //console.log(note)
        //console.log(note)
        //console.log(index)
        if (note.isActive === true) {
            synth.triggerAttackRelease(note.note, '8n', time)
            console.log(note.note)
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
    makeSequencer();
    //handleclicks();
    const playBTN = document.getElementById("play-btn");

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
});