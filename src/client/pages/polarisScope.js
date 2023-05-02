import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';

function polarScope( x, y, size, anchors = [ '12/6', '0/0', '18/9', '6/3' ] ) {

    window.canvasRef.circle( x, y, size, {
        color: 'red'
    } );
    window.canvasRef.line( x, y - size, x, y + size, {
        color: 'red'
    } );
    window.canvasRef.line( x - size, y, x + size, y, {
        color: 'red'
    } );

    for ( let i = 0; i < 360; i += 15 ) {
        window.canvasRef.line( x - size, y, x + size, y, {
            rotateAngle: i,
            color: 'red'
        } );
    }

    window.canvasRef.circle( x, y, size - 20, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );

    window.canvasRef.line( x, y - size, x, y + size, {
        color: 'red'
    } );
    window.canvasRef.line( x - size, y, x + size, y, {
        color: 'red'
    } );

    const tleft = 10 * anchors[ 0 ].length / 2;
    const bleft = 10 * anchors[ 1 ].length / 2;
    const lleft = 10 * anchors[ 2 ].length + 5;
    window.canvasRef.addtext( x - tleft, y - size - 10, anchors[ 0 ], {
        color: 'red'
    } );
    window.canvasRef.addtext( x - bleft, y + size + 20, anchors[ 1 ], {
        color: 'red'
    } );
    window.canvasRef.addtext( x - size - lleft, y, anchors[ 2 ], {
        color: 'red'
    } );
    window.canvasRef.addtext( x + size + 10, y, anchors[ 3 ], {
        color: 'red'
    } );
}

function calculateLST( longitude, now ) {

    const julianDate = ( now.getTime() / 86400000 ) + 2440587.5;
    const D = julianDate - 2451545.0; // calculate number of days since January 1, 2000 at 12:00 UT
    const UT = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600; // calculate Universal Time
    const GMST = 6.697374558 + 0.06570982441908 * D + 1.00273790935 * UT; // calculate Greenwich Mean Sidereal Time
    const LST = GMST + longitude / 15; // calculate local sidereal time
    return LST < 0 ? LST + 24 : LST; // adjust for negative values
}

function hourAngleToDegrees( hour, minute, seconds ) {
    return ( +hour + ( minute / 60 ) + ( seconds / 3600 ) );
}

function getPolarisRightAssention( latitude, longitude, now, declination ) {

    const LST = calculateLST( longitude, now );

    const polarisHourAngle = 2.53030128; // Hour Angle of Polaris at Greenwich on January 1, 2000, 12:00 UT

    const HA = 15 * ( LST - polarisHourAngle );
    const RA = Math.atan2( Math.sin( HA ), ( Math.cos( HA ) * Math.sin( latitude ) ) - ( Math.tan( declination ) * Math.cos( latitude ) ) );

    return Number( RA ).toFixed( 6 );
}

function getPolarisHourAngle( latitude, longitude, declination ) {

    // get utc time
    const now = new Date();

    const localSideRealTime = calculateLST( latitude, now );

    const polarisRightAssention = getPolarisRightAssention( latitude, longitude, now, declination );

    let hourAnglePolaris = ( localSideRealTime - polarisRightAssention + 360 ) % 360;
    if ( hourAnglePolaris > 180 ) {
        hourAnglePolaris = hourAnglePolaris - 360;
    }

    return Number( hourAnglePolaris ).toFixed( 6 );
}

function setupPolarisHour() {

    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    const _webWin = new WebWindow( 'Polaris Hour Angle',
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
    const declination = hourAngleToDegrees( 89, 27, 48 );

    // lat long in degrees
    const polarisHourAngle = getPolarisHourAngle( latitude, longitude, declination );
    const clockTime = '12'; //getHourAngleClockTime( polarisHourAngle );

    window.canvasRef.addtext( 50, 410, `Using latitude: ${latitude} and longitude: ${longitude}`, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${polarisHourAngle} and clock time: ${clockTime}`, {
        color: 'red'
    } );

}

addOnLoad( setupPolarisHour );
