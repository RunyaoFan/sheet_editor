import React, { useState } from 'react';
import Draggable from 'react-draggable';

const MusicStaff = () => {
  const [notePosition, setNotePosition] = useState({ x: 0, y: -525 });

  const handleNoteDrag = (e, position) => {
    const { x, y } = position;
    let snappedY = Math.round(y / 25) * 25; // Snap to 25-pixel increments
    // set boundary for the note
    if (snappedY < -700) { 
        snappedY = -700;
    }
    if (snappedY > -500) {
        snappedY = -500;
    }
    setNotePosition({ x, y: snappedY });
  };

  return (
    <div className="music-staff">
      {/* Render staff lines */}
      <div className="staff">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="staff-line" />
        ))}
      </div>

      {/* Render draggable note */}
      <Draggable
        axis="y"
        bounds="parent"
        position={notePosition}
        onDrag={handleNoteDrag}
      >
        {/* <div className="note">&#9833;</div> */}
        <div className="note">&#xE1D7;</div>
      </Draggable>
      
    </div>
  );
};

export default MusicStaff;

