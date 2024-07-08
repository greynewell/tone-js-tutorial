import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

interface SamplerProps {
  samples: Record<string, string>;
}

export const Sampler: React.FC<SamplerProps> = ({ samples }) => {
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);

  useEffect(() => {
    const newSampler = new Tone.Sampler({
      urls: samples,
      onload: () => {
        console.log('Sampler loaded');
      },
    }).toDestination();

    setSampler(newSampler);

    return () => {
      newSampler.dispose();
    };
  }, [samples]);

  const playSample = (note: string) => {
    if (sampler) {
      sampler.triggerAttack(note);
    }
  };

  return (
    <div>
      {Object.keys(samples).map((note) => (
        <button key={note} onClick={() => playSample(note)}>
          Play {note}
        </button>
      ))}
    </div>
  );
};