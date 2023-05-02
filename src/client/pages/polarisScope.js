import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';

import {
    julian,
    sexagesimal,
    sidereal,
    nutation,
    coord
} from 'astronomia';

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

function getPolarisHourAngle( latitude, longitude ) {

    // get utc time
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart( 2, '0' );
    const dayOfMonth = `${now.getDate() + 1}`.padStart( 2, '0' );

    const date = new Date( `${year}-${month}-${dayOfMonth}T00:00:00Z` );
    const jd = julian.DateToJD( date );

    const gst = sidereal.apparent0UT( jd );

    const lst = ( gst + longitude / 360 ) * 24;
    const lstHour = new sexagesimal.HourAngle( lst ); //eslint-disable-line

    const polarisEcliptic = new coord.Ecliptic( latitude, longitude );
    const epsi = nutation.meanObliquity( jd );
    const polarisEquatorial = polarisEcliptic.toEquatorial( epsi );

    // this is the polaris hour angle at GMT and need to convert to local 
    const polarisRAHour = new sexagesimal.HourAngle( polarisEquatorial.ra );
    let degreeDiff = lstHour.deg() - polarisRAHour.deg();
    if (degreeDiff < 0) {
        degreeDiff = +degreeDiff + 360;
    }
    const x = new sexagesimal.HourAngle(degreeDiff);
    console.log(degreeDiff, x.toString(), lstHour.toString(), polarisRAHour.toString());
    //const polarisHA = new sexagesimal.HourAngle( lstHour.sub( polarisRAHour ).hourAngle );

    return polarisRAHour.toString();
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
    // lat long in degrees
    const polarisHourAngle = getPolarisHourAngle( latitude, longitude );
    const clockTime = '12'; //getHourAngleClockTime( polarisHourAngle );

    window.canvasRef.addtext( 50, 410, `Using latitude: ${latitude} and longitude: ${longitude}`, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${polarisHourAngle} and clock time: ${clockTime}`, {
        color: 'red'
    } );

}

addOnLoad( setupPolarisHour );
