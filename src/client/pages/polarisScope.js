import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';
import {
    utils,
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

function updateHourAngle() {

    const latitude = document.getElementById( 'latitude' ).value || 37.6904826;
    const _longitude = document.getElementById( 'longitude' ).value || -122.47267;
    const raObj = document.getElementById( 'polarisRA' ).value.split( ' ' );
    const decObj = document.getElementById( 'polarisDec' ).value.split( ' ' );
    const declination = utils.hourAngleToDegrees( decObj[ 0 ] || 89, decObj[ 1 ] || 27, 0 );
    const rightAssention = utils.hourAngleToDegrees( raObj[ 0 ] || 2, raObj[ 1 ] || 31, 0 );

    // lat long in degrees
    const {
        hourAnglePolaris,
        hourAnglePolarisDST,
        plusHourAnglePolaris
    } = PolarisCalculator.getPolarisHourAngle( latitude, rightAssention );
    const clockTime = utils.hoursMinutesSeconds( hourAnglePolaris );
    const plusClockTime = utils.hoursMinutesSeconds( plusHourAnglePolaris );
    const dstClockTime = utils.hoursMinutesSeconds( hourAnglePolarisDST );

    const now = new Date();

    const {
        ha,
        haDST,
        pha
    } = PolarisCalculator.getPolarisHA( now, latitude );
    const clockTimeHA = utils.hoursMinutesSeconds( ha );
    const clockTimePHA = utils.hoursMinutesSeconds( pha );
    const clockTimeDSTHA = utils.hoursMinutesSeconds( haDST );

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
    window.canvasRef.rectangle( 50, 450, 800, 500, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );

    const displaySix = ( inVal ) => {
        return Number( inVal ).toFixed( 6 );
    };

    window.canvasRef.addtext( 50, 410, `Using RA, Dec: ${displaySix(rightAssention)} / ${displaySix(declination)} or: ${displaySix(PolarisCalculator.correctedRA)} / ${displaySix(PolarisCalculator.correctedDEC)}`, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${displaySix(hourAnglePolaris)} | ${displaySix(plusHourAnglePolaris)} or ${displaySix(ha)} | ${displaySix(pha)}`, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 450, `Polaris hour angle + DST: ${displaySix(hourAnglePolarisDST)} or ${displaySix(haDST)} `, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 470, `Clock time: ${clockTime} | ${plusClockTime} | ${dstClockTime} or ${clockTimeHA} | ${clockTimePHA} | ${clockTimeDSTHA}`, {
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
    window.setInterval( updateHourAngle, 5000 );
}

addOnLoad( setupPolarisHour );
