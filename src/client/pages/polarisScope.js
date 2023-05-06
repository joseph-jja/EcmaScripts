import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';
import {
    PolarScopeUtilitiesInstance,
    PolarisCalculatorInstance
} from 'client/components/space/PolarScopeCalculator';

import PolarScope from 'client/components/space/PolarScope';

let polarSP;

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
    const longitude = document.getElementById( 'longitude' ).value || -122.47267;
    const raObj = document.getElementById( 'polarisRA' ).value.split( ' ' );
    const decObj = document.getElementById( 'polarisDec' ).value.split( ' ' );
    const declination = PolarScopeUtilitiesInstance.hourAngleToDegrees( decObj[ 0 ] || 89, decObj[ 1 ] || 27, 0 );
    const rightAssention = PolarScopeUtilitiesInstance.hourAngleToDegrees( raObj[ 0 ] || 2, raObj[ 1 ] || 31, 0 );

    const now = new Date();

    // lat long in degrees
    const {
        hourAnglePolaris,
        plusHourAnglePolaris
    } = PolarisCalculatorInstance.getPolarisHourAngle( now, latitude, longitude, rightAssention );
    const clockTime = PolarScopeUtilitiesInstance.hoursMinutesSeconds( hourAnglePolaris );
    const clockTimePlus = PolarScopeUtilitiesInstance.hoursMinutesSeconds( plusHourAnglePolaris );

    const {
        ha
    } = PolarisCalculatorInstance.getPolarisHA( now, latitude, longitude, longitude );
    const clockTimeHA = PolarScopeUtilitiesInstance.hoursMinutesSeconds( ha );

    window.canvasRef.rectangle( 40, 20, 700, 300, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );

    polarScope( 200, 180, 150 );
    polarScope( 550, 180, 100, [ '0', '6', '9', '3' ] );

    let pos = 0;
    const centerPoints = {
        x: 200,
        y: 180
    };
    if ( !polarSP ) {
        polarSP = new PolarScope( {
            color: '#fff',
            radius: 6,
            direction: 'counterClockwise',
            isFixedCenter: true,
            clockTimme: now,
            centerPoints: {
                x: 550,
                y: 180
            },
            xRadius: 80,
            yRadius: 80,
            startAngle: 0,
            latitude,
            longitude,
            rightAssention
        } );
    }

    if ( polarSP ) {
        pos = polarSP.getNextPosition( centerPoints ).visable;
        window.canvasRef.circle( pos.x, pos.y, pos.radius, {
            color: pos.color,
            fillStrokeClear: 'fill'
        } );
    }

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

    window.canvasRef.addtext( 50, 410, `Using RA, Dec: ${displaySix(rightAssention)} / ${displaySix(declination)} corrected: ${displaySix(PolarisCalculatorInstance.correctedRA)} / ${displaySix(PolarisCalculatorInstance.correctedDEC)}`, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${displaySix(hourAnglePolaris)} | ${displaySix(plusHourAnglePolaris)} or ${displaySix(ha)} `, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 450, `Clock time: ${clockTime} | ${clockTimePlus} or ${clockTimeHA} `, {
        color: 'red'
    } );
    window.canvasRef.addtext( 50, 470, `Polaris position time: ${ polarSP.angle}`, {
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

    updateHourAngle();
    window.setInterval( updateHourAngle, 5000 );
}

addOnLoad( setupPolarisHour );
