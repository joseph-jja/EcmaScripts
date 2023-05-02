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

// get local sidereal time
function calculateLST( longitude, utcTime ) {
    const now = new Date( utcTime );
    const timeInMilliseconds = now.getTime();
    const timeInSeconds = timeInMilliseconds / 1000;
    const julianDate = ( timeInSeconds / 86400 ) + 2440587.5;
    const T = ( julianDate - 2451545.0 ) / 36525;
    const LST = ( 100.46 + 0.985647 * julianDate + longitude + ( 15 * T ) ) % 360;
    return LST;
}

//RA in degrees = (RA in hours + RA in minutes/60 + RA in seconds/3600) * 15 
// at latitude about 37.70 => RA of polaris is about 02h 59m08.4 = 44.785
function getPolarisRightAssention( _latitude ) {

    return 44.785;
}

function getPolarisHourAngle( latitude, longitude ) {

    // get utc time
    const now = new Date();
    const utcTime = Date.UTC( now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(),
        now.getUTCMilliseconds() );

    const localSideRealTime = calculateLST( longitude, utcTime );

    const polarisRightAssention = getPolarisRightAssention( latitude );

    let hourAnglePolaris = ( localSideRealTime - polarisRightAssention + 360 ) % 360;
    if ( hourAnglePolaris > 180 ) {
        hourAnglePolaris = hourAnglePolaris - 360;
    }

    return hourAnglePolaris;
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
    polarScope( 550, 180, 100, [ '6', '12', '9', '3' ] );

    const latitude = 37.6904826;
    const longitude = -122.47267;
    // lat long in degrees
    const polarisHourAngle = getPolarisHourAngle( latitude, longitude );
    console.log( polarisHourAngle );

    window.canvasRef.addtext( 50, 410, `Using latitude: ${latitude} and longitude: ${longitude} hour angle: ${polarisHourAngle}` );

}

addOnLoad( setupPolarisHour );
