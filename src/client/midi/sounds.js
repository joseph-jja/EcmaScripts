import {
    MUSICAL_NOTES,
    EQUIVALENT_MUSICAL_NOTES,
    WAVEFORM_TYPES
} from 'client/midi/Constants.js';

export class MakeSound {

    constructor() {
        this.audioContext = new AudioContext();
    }

    // Set the type of wave (sine, triangle, square, sawtooth)
    getOscillator( waveform ) {
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = WAVEFORM_TYPES.includes( waveform ) ? waveform : 'sawtooth';
        return oscillator;
    }

    #getFrequenceOfNote( note = 'A', octave = 4 ) {

        const noteValue = note.toUpperCase();
        const realNote = EQUIVALENT_MUSICAL_NOTES[ noteValue ] || noteValue;

        const noteFrequencies = MUSICAL_NOTES[ realNote ];
        if ( !noteFrequencies ) {
            throw Error( 'Invalid note!' );
            return;
        }
        return noteFrequencies[ octave ];
    }

    setNote( oscillator, note, octave ) {
        // Set the frequency of the oscillator (in Hz)
        oscillator.frequency.value = this.getFrequenceOfNote( note, octave );

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
