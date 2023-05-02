import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';

import {
    julian,
    sexa,
    sidereal,
    coord
} from 'astronomia';

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

function getPolarisHourAngle( latitude, longitude ) {

    // get utc time
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart( 2, '0' );
    const dayOfMonth = `${now.getDate() + 1}`.padStart( 2, '0' );

    const date = new Date( `${year}-${month}-${dayOfMonth}T00:00:00Z` );
    const jd = new julian.CalendarGregorian().fromDate( date ).toJD();

    const gst = sidereal.apparentGreenwich( jd );
    const lst = ( gst + longitude / 360 ) * 24;
    const lstHour = new sexa.HourAngle( lst );

    const polarisEcliptic = new coord.Ecliptic( latitude, longitude );
    const polarisEquatorial = coord.equatorial.fromEcliptic( jd, polarisEcliptic );
    const polarisRAHour = new sexa.HourAngle( polarisEquatorial.ra ).toString();
    const polarisHA = new sexa.HourAngle( lstHour.sub( polarisRAHour ).hourAngle );
    return polarisHA;
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
    const clockTime = '12'; //getHourAngleClockTime( polarisHourAngle );

    window.canvasRef.addtext( 50, 410, `Using latitude: ${latitude} and longitude: ${longitude}` );
    window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${polarisHourAngle} and clock time: ${clockTime}` );

}

addOnLoad( setupPolarisHour );
