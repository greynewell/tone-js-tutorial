// Create an oscillator
const oscillator = new Tone.Oscillator().start();

// Create a channel
const channel = new Tone.Channel().toDestination();

// Connect the oscillator to the channel
oscillator.connect(channel);
