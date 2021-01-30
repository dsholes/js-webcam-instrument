// SYNTH
const reverb = new Tone.Reverb().toDestination();

const synth = new Tone.DuoSynth({
  vibratoAmount: 0.5,
  vibratoRate: 5,
  portamento: 0.1,
  harmonicity: 1.005,
  volume: 5,
  voice0: {
    oscillator: {
      type: "sawtooth"
    },
    filter: {
      Q: 1,
      type: "lowpass",
      rolloff: -24
    },
    envelope: {
      attack: 0.01,
      decay: 0.25,
      sustain: 0.4,
      release: 1.2
    },
    filterEnvelope: {
      attack: 0.001,
      decay: 0.05,
      sustain: 0.3,
      release: 2,
      baseFrequency: 100,
      octaves: 4
    }
  },
  voice1: {
    oscillator: {
      type: "sawtooth"
    },
    filter: {
      Q: 2,
      type: "bandpass",
      rolloff: -12
    },
    envelope: {
      attack: 0.25,
      decay: 4,
      sustain: 0.1,
      release: 0.8
    },
    filterEnvelope: {
      attack: 0.05,
      decay: 0.05,
      sustain: 0.7,
      release: 2,
      baseFrequency: 5000,
      octaves: -1.5
    }
  }
}).connect(reverb);

const synthNotes = ["C2", "E2", "G2", "A2",
  "C3", "D3", "E3", "G3", "A3", "B3",
  "C4", "D4", "E4", "G4", "A4", "B4", "C5"];

function move(x, y) {
  // use the x and y values to set the note and vibrato
  console.log(typeof x);
  console.log(Math.round(x));
  const note = synthNotes[Math.round(x * (synthNotes.length - 1))];
  console.log(note);
  synth.setNote(note);
  console.log(y);
  synth.vibratoAmount.value = y;
}

function triggerAttack(x, y) {
  // use the x and y values to set the note and vibrato
  const note = synthNotes[Math.round(x * (synthNotes.length - 1))];
  synth.triggerAttack(note);
  synth.vibratoAmount.value = y;
}

//Tone.Transport.bpm.value = 125;