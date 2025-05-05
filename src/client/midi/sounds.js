import {
    MUSICAL_NOTES,
    EQUIVALENT_MUSICAL_NOTES,
    WAVEFORM_TYPES
} from '/js/client/midi/Constants.js';

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

    getFrequenceOfNote( note = 'A', octave = 4 ) {

        const noteValue = note[0].toUpperCase() + (note[1] ? note[1].toLowerCase() : '');
        const realNote = EQUIVALENT_MUSICAL_NOTES[ noteValue ] || noteValue;

        const noteFrequencies = MUSICAL_NOTES[ realNote ];
        if ( !noteFrequencies ) {
            throw Error( 'Invalid note!' );
            return;
        }
        return noteFrequencies[ octave ];
    }

    setNote( waveform, note, octave ) {
    	
    	  const oscillator = this.getOscillator(waveform);
    	  const gainNode = this.audioContext.createGain();
    	
        // Set the frequency of the oscillator (in Hz)
        oscillator.frequency.value = this.getFrequenceOfNote( note, octave );

        // Connect the oscillator to the audio context destination (speakers)
        oscillator.connect( this.audioContext.destination );
        gainNode.connect(this.audioContext.destination);
        
        return { oscillator, gainNode };
    }

    playNotes( notes = [], duration ) {
    	
    	  notes.forEach( note => {
    	  	   const { oscillator, gainNode } = note;
            oscillator.start();
  		      gainNode.gain.setValueAtTime(duration, this.audioContext.currentTime);
  		      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);
            oscillator.stop(this.audioContext.currentTime + duration);
    	  });
    }
}
