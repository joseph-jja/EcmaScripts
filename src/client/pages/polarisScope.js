import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';
import {
    utils,
    dateUtils,
    PolarisCalculator
} from 'client/components/polaris';

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

function getFraction(num) {
    const decimals = num - Math.floor(num);
    // we want positive number
    return (decimals < 0 ? decimals + 1 : decimals);
}
function calculateLST( latitude, now ) {

    const julianDate = ( now.getTime() / 86400000 ) + 2440587.5;
    const D = julianDate - 2451545.0; // calculate number of days since January 1, 2000 at 12:00 UT
    const UT = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600; // calculate Universal Time
    const GMST = 6.697374558 + 0.06570982441908 * D + 1.00273790935 * UT; // calculate Greenwich Mean Sidereal Time
    const LST = getFraction((GMST + latitude / 15) / 24); // calculate local sidereal time
    return (24 * LST); // adjust for negative values
}

function hourAngleToDegrees( hour, minute, seconds ) {
    return ( +hour + ( minute / 60 ) + ( seconds / 3600 ) );
}

function getPolarisHourAngle( latitude, _longitude, rightAssention, _declination ) {

    // get utc time
    const now = new Date();

    const localSideRealTime = calculateLST( latitude, now );

    const hourAnglePolaris = (localSideRealTime - rightAssention);
    
    return Number( hourAnglePolaris ).toFixed( 6 );
}

function updateHourAngle() {

    const latitude = document.getElementById('latitude').value || 37.6904826;
    const longitude = document.getElementById('longitude').value || -122.47267;
    const raObj = document.getElementById('polarisRA').value.split(' ');
    const decObj = document.getElementById('polarisDec').value.split(' ');
    const declination = hourAngleToDegrees( decObj[0] || 89, decObj[1] || 27, 0 );
    const rightAssention = hourAngleToDegrees( raObj[0] || 2, raObj[1] || 31, 0 );

    // lat long in degrees
    const polarisHourAngle = getPolarisHourAngle( latitude, longitude, rightAssention, declination );
    const clockTime = utils.hoursMinutesSeconds( polarisHourAngle );
    const pa2x = Number( ( rightAssention * 2 + polarisHourAngle ) % 360 ).toFixed( 6 );

    const now = new Date();
    const utcNow = dateUtils.toUTC(now);
    PolarisCalculator.precessionCorrection(utcNow, latitude);
    const lst = dateUtils.utcToLST(utcNow, latitude);
    const ha = PolarisCalculator.getPolarisHA(lst, latitude);
    const deg = PolarisCalculator.haToDegrees(ha);
    const clockTimeHA = utils.hoursMinutesSeconds( ha );
    const pa3x = Number( ( lst + PolarisCalculator.correctedRA ) % 360 ).toFixed( 6 );

    window.canvasRef.rectangle( 50, 390, 800, 500, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );
    window.canvasRef.rectangle( 50, 410, 800, 500, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );
    window.canvasRef.rectangle( 50, 430, 800, 500, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );

    window.canvasRef.addtext( 50, 410, `Using latitude: ${latitude} / longitude: ${longitude}`, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${polarisHourAngle} | ${ha} deg: ${deg}`, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 450, `Clock time: ${clockTime} | ${clockTimeHA} ha: ${pa3x} | ${pa2x} `, {
        color: 'red'
    } );
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

    updateHourAngle();
    window.setInterval(updateHourAngle, 5000);
}

addOnLoad( setupPolarisHour );
