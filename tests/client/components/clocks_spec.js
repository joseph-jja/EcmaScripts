import {
    DigitalClock,
    BinaryClock
} from 'client/components/clocks';

describe( 'testing some clocks', () => {

    const clockHolder = document.createElement( 'div' );
    clockHolder.id = 'clock-holder';

    document.body.appendChild( clockHolder );

    it( 'DigitalClock  test', () => {
        const Digital = new DigitalClock();
        const digitalClockHolder = document.createElement( 'div' );
        digitalClockHolder.id = 'digital-holder';
        clockHolder.appendChild( digitalClockHolder );
        Digital.setId( 'digital-holder' );

        Digital.runClock();
        expect( digitalClockHolder.innerHTML.length ).toEqual( 14 );
        Digital.stopClock();
    } );

    it( 'BinaryClock  test', () => {
        const Binary = new BinaryClock();
        const binaryClockHolder = document.createElement( 'div' );
        binaryClockHolder.id = 'binary-holder';
        clockHolder.appendChild( binaryClockHolder );
        Binary.setId( 'binary-holder' );
        console.log( 'clock is ticking ' + Binary.runClock() );

        Binary.render();
        Binary.runClock();
        expect( binaryClockHolder.querySelectorAll('tr td').length ).toEqual( 24 );
        Binary.stopClock();
    } );
} );
