const WAVEFORM_TYPES = [
    'sine',
    'triangle',
    'square',
    'sawtooth'
];

class MakeSound {

    constructor() {
        this.audioContext = new AudioContext();
    }

    // Set the type of wave (sine, triangle, square, sawtooth)
    getOscillator( waveform ) {
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = WAVEFORM_TYPES.includes( waveform ) ? waveform : 'sawtooth';
        return oscillator;
    }

    setNote( oscillator, note ) {
        // Set the frequency of the oscillator (in Hz)
        oscillator.frequency.value = 60; // A3 note

        // Connect the oscillator to the audio context destination (speakers)
        oscillator.connect( audioContext.destination );
    }

    playNote( oscillator, duration ) {
        // Start the oscillator
        oscillator.start();
        setTimeout( () => {
            oscillator.stop();
        }, duration );
    }
}

export {
    WAVEFORM_TYPES,
    MakeSound
};
