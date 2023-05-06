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

const DEFAULT_RA = '2:29:48';
const DEFAULT_DEC = '89:27:48';

let polarSP,
    polarSP24H;

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

    // user input RA and dec or we use default values?
    const raHoursObj = document.getElementById( 'polarisRAHour' ).value;
    const raMinutesObj = document.getElementById( 'polarisRAMinute' ).value;
    const raSecondsObj = document.getElementById( 'polarisRASecond' ).value;
    const decHoursObj = document.getElementById( 'polarisDecHour' ).value;
    const decMinutesObj = document.getElementById( 'polarisDecMinute' ).value;
    const decSecondsObj = document.getElementById( 'polarisDecSecond' ).value;
    const rightAssentionDefault = DEFAULT_RA.split( ':' );
    const declinationDefault = DEFAULT_DEC.split( ':' );

    const raHours = ( raHoursObj && !isNaN( parseInt( raHoursObj ) ) ? raHoursObj : rightAssentionDefault[ 0 ] );
    const raMinutes = ( raMinutesObj && !isNaN( parseInt( raMinutesObj ) ) ? raMinutesObj : rightAssentionDefault[ 1 ] );
    const raSeconds = ( raSecondsObj && !isNaN( parseInt( raSecondsObj ) ) ? raSecondsObj : rightAssentionDefault[ 2 ] );
    const decHours = ( decHoursObj && !isNaN( parseInt( decHoursObj ) ) ? decHoursObj : declinationDefault[ 0 ] );
    const decMinutes = ( decMinutesObj && !isNaN( parseInt( decMinutesObj ) ) ? decMinutesObj : declinationDefault[ 1 ] );
    const decSeconds = ( decSecondsObj && !isNaN( parseInt( decSecondsObj ) ) ? decSecondsObj : declinationDefault[ 2 ] );

    const declination = PolarScopeUtilitiesInstance.hourAngleToDegrees( decHours, decMinutes, decSeconds );
    const rightAssention = PolarScopeUtilitiesInstance.hourAngleToDegrees( raHours, raMinutes, raSeconds );

    const isDefaultRA = ( +raHours === +rightAssentionDefault[ 0 ] && +raMinutes === +rightAssentionDefault[ 1 ] && +raSeconds === +rightAssentionDefault[ 2 ] );

    window.canvasRef.rectangle( 40, 20, 700, 300, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );

    // future we can have user change this default date is now
    const now = new Date();

    polarScope( 200, 180, 150 );
    polarScope( 550, 180, 100, [ '0', '6', '9', '3' ] );

    let pos = 0,
        pos24H;
    const centerPoints = {
            x: 550,
            y: 180
        },
        centerPoints24H = {
            x: 200,
            y: 180
        };
    if ( !polarSP ) {
        polarSP = new PolarScope( {
            color: '#fff',
            radius: 6,
            clockType: 12,
            isFixedCenter: true,
            clockTime: now,
            centerPoints: centerPoints,
            xRadius: 75,
            yRadius: 75,
            startAngle: 0,
            latitude,
            longitude,
            rightAssention
        } );
    }
    if ( !polarSP24H ) {
        polarSP24H = new PolarScope( {
            color: '#fff',
            radius: 6,
            clockType: 24,
            isFixedCenter: true,
            clockTime: now,
            centerPoints: centerPoints24H,
            xRadius: 120,
            yRadius: 120,
            startAngle: 0,
            latitude,
            longitude,
            rightAssention
        } );
    }

    if ( polarSP ) {
        polarSP.latitude = latitude;
        polarSP.longitude = longitude;
        polarSP.rightAssention = rightAssention;
        pos = polarSP.getNextPosition( centerPoints ).visable;
        window.canvasRef.circle( pos.x, pos.y, pos.radius, {
            color: pos.color,
            fillStrokeClear: 'fill'
        } );
    }

    if ( polarSP24H ) {
        polarSP24H.latitude = latitude;
        polarSP24H.longitude = longitude;
        polarSP24H.rightAssention = rightAssention;
        pos24H = polarSP24H.getNextPosition( centerPoints24H ).visable;
        window.canvasRef.circle( pos24H.x, pos24H.y, pos24H.radius, {
            color: pos24H.color,
            fillStrokeClear: 'fill'
        } );
    }

    // first is user defined or default
    // second is internally calculated
    const hourAnglePolaris = ( polarSP24H ? polarSP24H.userDefinedHourAngle : 0 );
    const plusHourAnglePolaris = ( polarSP24H ? polarSP24H.hourAngle : 0 );
    const clockTime = PolarScopeUtilitiesInstance.hoursMinutesSeconds( hourAnglePolaris );
    const clockTimePlus = PolarScopeUtilitiesInstance.hoursMinutesSeconds( plusHourAnglePolaris );

    // this is using alt method to do calculations for LST 
    const {
        ha
    } = PolarisCalculatorInstance.getPolarisHA( now, latitude, longitude, longitude );
    const clockTimeHA = PolarScopeUtilitiesInstance.hoursMinutesSeconds( ha );


    window.polarSPref = polarSP;;
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

    if ( isDefaultRA ) {
        window.canvasRef.addtext( 50, 410, `Using corrected RA, Dec values: ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(PolarisCalculatorInstance.correctedRA)} / ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(PolarisCalculatorInstance.correctedDEC)}`, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${displaySix(plusHourAnglePolaris)} alt calculation: ${displaySix(ha)} `, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 450, `Clock time: ${clockTimePlus} or ${clockTimeHA} `, {
            color: 'red'
        } );
    } else {
        window.canvasRef.addtext( 50, 410, `Using User Defined RA, Dec: ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(rightAssention)} / ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(declination)}`, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 430, `Polaris hour angle: ${displaySix(plusHourAnglePolaris)} alt calculation: ${displaySix(ha)} `, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 450, `Clock time: ${clockTime} ${clockTimeHA} `, {
            color: 'red'
        } );
    }
    window.canvasRef.addtext( 50, 470, `Polaris position time: ${polarSP.angle}  ${polarSP24H.angle}`, {
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
