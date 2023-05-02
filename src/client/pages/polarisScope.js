import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';

function polarScope( x, y, size, anchors = [ '12/6', '24/12', '18/9', '6/3' ] ) {

    window.canvasRef.circle( x, y, size );
    window.canvasRef.line( x, y - size, x, y + size );
    window.canvasRef.line( x - size, y, x + size, y );

    for ( let i = 0; i < 360; i += 15 ) {
        window.canvasRef.line( x - size, y, x + size, y, {
            rotateAngle: i
        } );
    }

    window.canvasRef.circle( x, y, size - 20, {
        color: 'white',
        fillStrokeClear: 'fill'
    } );

    window.canvasRef.line( x, y - size, x, y + size );
    window.canvasRef.line( x - size, y, x + size, y );

    const tleft = 10 * anchors[ 0 ].length / 2;
    const bleft = 10 * anchors[ 1 ].length / 2;
    const lleft = 10 * anchors[ 2 ].length + 5;
    window.canvasRef.addtext( x - tleft, y - size - 10, anchors[ 0 ] );
    window.canvasRef.addtext( x - bleft, y + size + 20, anchors[ 1 ] );
    window.canvasRef.addtext( x - size - lleft, y, anchors[ 2 ] );
    window.canvasRef.addtext( x + size + 10, y, anchors[ 3 ] );
}

const TERRESTRIAL_TIME_DELTA = 32.184;
// TAI - International Atomic Time
function getJ2k() {

    //January 1, 2000, at 12:00 TT (Terrestrial Time)
    // 32.184 s ahead of International Atomic Time (TAI)

    const now = new Date();
    now.setFullYear( 2000 );
    now.setMonth( 0 );
    now.setDate( 1 );
    now.setHours( 12 );
    now.setMinutes();
    now.setSeconds( 0 );
    now.setMilliseconds( 0 );

    now.getTimezoneOffset();

    const delta = now.getTime() - ( TERRESTRIAL_TIME_DELTA * 1000 );

    return delta;
}

/*
//const DEGREES_PER_SOLAR_DAY = 360.985647332;
//const SOLAR_DAYS = 365.2422;

const RIGHT_ASSENTION_POLARIS = '2h 41m 39s';
    //DECLINATION_POLARIS = '+89° 15′ 51';
*/

const GMST_ZERO_OFFSET_Y2K = 100.46;
const DEGREES_PER_DAY = 0.985647;
const EARTH_DEGREES_ROTATION = 15;

function getPolarisHourAngle( latitude, longitude ) {

    window.canvasRef.addtext( 50, 410, `Using latitude: ${latitude} and longitude: ${longitude}` );

    const julianDaysNDegrees = ( DEGREES_PER_DAY * getJ2k() );

    const universalTime = new Date().getTime();

    const latitudeTime = latitude + ( EARTH_DEGREES_ROTATION * universalTime );

    //const rightAssentionPolaris = RIGHT_ASSENTION_POLARIS;

    const localSideRealTime = GMST_ZERO_OFFSET_Y2K + julianDaysNDegrees + longitude;

    const hourAnglePolaris = localSideRealTime; // - rightAssentionPolaris;

    return hourAnglePolaris;
}

function generateFish() {

    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    const _webWin = new WebWindow( 'Canvas Test',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );

    const res = canvas.create( "polaris-hour", "canvas-container", 800, 500 );

    window.canvasRef = res;
    polarScope( 200, 180, 150 );
    polarScope( 550, 180, 100, [ '6', '12', '9', '3' ] );

    // lat long in degrees
    const j2k = new Date();
    j2k.setTime( getJ2k() );
    console.log( j2k );
    console.log( getPolarisHourAngle( 37.6904826, -122.47267 ) );
}

addOnLoad( generateFish );
