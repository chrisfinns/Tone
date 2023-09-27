// import * as Tone from 'tone'


document.addEventListener('DOMContentLoaded', () => {

console.log('Loaded app.js')

const notes = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'];


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
    console.log(rows)

  return rows;
};

let grid = makeGrid(notes);
//const makeSequencer =  () => {
    
    const sequencer = document.getElementById("sequencer");

    grid.forEach((row, rowIndex) => {
        
    //  console.log(`Value at index ${rowIndex}: ${row}`);
        
        const seqRow = document.createElement("div");
        seqRow.id = 'rowIndex';
        seqRow.className = 'sequencer-row';
        
        sequencer.appendChild(seqRow);

        row.forEach((note, noteIndex) => {
            const button = document.createElement('button');
            button.innerHTML = note.note;
            button.className = "note"
            sequencer.appendChild(button)


            //  console.log(note)

        })
    })

});

