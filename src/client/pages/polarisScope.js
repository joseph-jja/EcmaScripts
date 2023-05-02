import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';

function polarScope( x, y, size, anchors = [ '12/6', '0/0', '18/9', '6/3' ] ) {

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

// get local sidereal time
function calculateLST( longitude, now ) {

    const julianDate = ( now.getTime() / 86400000 ) + 2440587.5;

    const T = ( julianDate - 2451545.0 ) / 36525;
    const LST = ( 100.46 + 0.985647 * julianDate + longitude + ( 15 * T ) ) % 360;
    return Number( LST ).toFixed( 6 );
}

/*function hourAngleToDegrees(hour, minute, seconds) {
    return ( +hour + ( minute / 60 ) + ( seconds / 3600 ) );
}*/

// this function calculated the right assention of polaris
// we return the value to 4 decimal places
// this is generally good enough for polar alignent 
function getPolarisRightAssention( latitude, longitude, now ) {
    const declination = 89.3619;

    const julianDate = ( now.getTime() / 86400000 ) + 2440587.5;
    const d = julianDate - 2451545;

    const h = now.getUTCHours();
    const m = now.getUTCMinutes();
    const s = now.getUTCSeconds();

    const GMST = 6.697375 + 0.0657098242 * d + h + ( m / 60 ) + ( s / 3600 );
    const LST = GMST + ( longitude / 15 );

    const polarisHourAngle = 2.53030128; // Hour Angle of Polaris at Greenwich on January 1, 2000, 12:00 UT

    const HA = 15 * ( LST - polarisHourAngle );
    const RA = Math.atan2( Math.sin( HA ), ( Math.cos( HA ) * Math.sin( latitude ) ) - ( Math.tan( declination ) * Math.cos( latitude ) ) );

    return Number( RA ).toFixed( 6 );
}

function getPolarisHourAngle( latitude, longitude ) {

    // get utc time
    const now = new Date();

    const localSideRealTime = calculateLST( longitude, now );

    const polarisRightAssention = getPolarisRightAssention( latitude, longitude, now );

    let hourAnglePolaris = ( localSideRealTime - polarisRightAssention + 360 ) % 360;
    if ( hourAnglePolaris > 180 ) {
        hourAnglePolaris = hourAnglePolaris - 360;
    }

    return Number( hourAnglePolaris ).toFixed( 6 );
}

function getHourAngleClockTime( hourAnglePolaris ) {
    return 24 - Number( hourAnglePolaris / 15 ).toFixed( 4 );
}

function setupPolarisHour() {

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
    polarScope( 550, 180, 100, [ '6', '0', '9', '3' ] );

    const latitude = 37.6904826;
    const longitude = -122.47267;
    // lat long in degrees
    const polarisHourAngle = getPolarisHourAngle( latitude, longitude );
    const clockTime = getHourAngleClockTime( polarisHourAngle );

    window.canvasRef.addtext( 50, 410, `Using latitude: ${latitude} and longitude: ${longitude}` );
    window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${polarisHourAngle} and clock time: ${clockTime}` );

}

addOnLoad( setupPolarisHour );
