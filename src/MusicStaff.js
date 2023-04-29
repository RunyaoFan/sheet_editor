import React, { useState } from 'react';
import Draggable from 'react-draggable';

// full note: 0, half note stem up: 1, quarter note stem up: 2, full rest: 3, half rest: 4, quarter rest: 5, half note stem down: 6, quarter note stem down: 7
// notes stores for each note its x and y value and its note type

const MusicStaff = () => {
  const [notes, setNotes] = useState([]);
  const noteTypes = [0, 1, 2, 3, 4, 5, 6, 7];

  const handleNoteDrag = (index, position) => {
    const { x, y } = position;
    let snappedY = Math.round(y / 25) * 25; // Snap to 25-pixel increments
    // set boundary for the note
    if (snappedY < 175) { 
        snappedY = 175;
    }
    if (snappedY > 375) {
        snappedY = 375;
    }
    const newNotes = [...notes];
    newNotes[index].y = snappedY;
    setNotes(newNotes);
  };

  const addNote = (note) => {
    let currNoteCnt = notes.length;
    if (currNoteCnt === 0) {
      if (note === 3) {
        setNotes([{ x: 70, y: 225, noteType: note }]);
      } else if (note === 4) {
        setNotes([{ x: 70, y: 250, noteType: note }]);
      } else if (note === 5) {
        setNotes([{ x: 70, y: 275, noteType: note }]);
      } else {
        setNotes([{ x: 70, y: 350, noteType: note }]);
      }
    } else if (currNoteCnt < 4) {
      const newNotes = [...notes];
      if (note === 3) {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 225, noteType: note }]);
      } else if (note === 4) {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 250, noteType: note }]);
      } else if (note === 5) {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 275, noteType: note }]);
      } else {
        setNotes([...newNotes, { x: newNotes[newNotes.length - 1].x + 180, y: 350, noteType: note }]);
      }
    }
  };

  const resetMeasure = () => {
    setNotes([]);
  }

  const getNoteSymbol = (noteType) => {
    switch (noteType) {
      case 0: return '𝅝'; // Full note
      case 1: return '𝅗𝅥'; // Half note
      case 2: return '𝅘𝅥'; // Quarter note
      case 3: return '𝄻'; // Full rest
      case 4: return '𝄼'; // Half rest
      case 5: return '𝄽'; // Quarter rest
      default: return '';
    }
  };

  return (
    <div className="music-staff">
      {/* Render staff lines */}
      <div className="staff">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="staff-line" />
        ))}
      </div>
      {/* <div className="note">{getNoteSymbol(6)}</div> */}
      {/* Render draggable note */}
      {notes.map(({ x, y, noteType }, index) => (
        (noteType < 3 || noteType > 5) ? 
        <Draggable
          key={index}
          axis="y"
          bounds="parent"
          position={{ x, y }}
          onDrag={(e, position) => handleNoteDrag(index, position, noteType)}
        >
          <div className="note">{getNoteSymbol(noteType)}</div>

        </Draggable> : <Draggable
          key={index}
          axis="y"
          bounds="parent"
          position={{ x, y }}
          onDrag={(e, position) => handleNoteDrag(index, position, noteType)}
          disabled={true}
        >
          <div className="note">{getNoteSymbol(noteType)}</div>

        </Draggable>
      ))}

      {/* Render buttons */}
      <div className="note-buttons">
        {noteTypes.map((note, index) => (
          <button key={index} onClick={() => addNote(note)}>
            {note}
          </button>
        ))}
      </div>

      <div className="reset-button">
          <button onClick={() => resetMeasure()}>
            Reset
          </button>
      </div>
      
    </div>
  );
};

export default MusicStaff;