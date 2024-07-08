import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Sampler } from './Sampler';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize Tone.js
    Tone.start();

    // Create a simple synth and connect it to the main output
    const synth = new Tone.Synth().toDestination();

    // Define a simple melody
    const notes = ['C4', 'E4', 'G4', 'B4'];
    let index = 0;

    // Create a loop that plays a note every quarter note
    const loop = new Tone.Loop(time => {
      synth.triggerAttackRelease(notes[index], '8n', time);
      index = (index + 1) % notes.length;
    }, '4n').start(0);

    // Cleanup function
    return () => {
      loop.dispose();
      synth.dispose();
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      Tone.Transport.stop();
    } else {
      Tone.Transport.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h1>Tone.js in React</h1>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <Sampler samples={{'c4': 'lol'}} />
    </div>
  );
};

export default App;