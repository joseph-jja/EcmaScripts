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
    polarSP24H,
    polarisClock;

const POLAR_HOUR_ANGLE_CENTER = {
    x: 300,
    y: 300
};
const POLAR_SCOPE_24_HOUR_CENTER = {
    x: 300,
    y: 680
};
const POLAR_SCOPE_12_HOUR_CENTER = {
    x: 300,
    y: 1000
};

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

function drawScopes() {
    window.canvasRef.addtext( 0, POLAR_HOUR_ANGLE_CENTER.y - 160, 'Polaris Clock', {
        color: 'red'
    } );
    polarScope( POLAR_HOUR_ANGLE_CENTER.x, POLAR_HOUR_ANGLE_CENTER.y, 150, [ '0/24', '12', '6', '18' ] );

    window.canvasRef.addtext( 0, POLAR_SCOPE_24_HOUR_CENTER.y - 160, 'KStars 24h Polaris Clock', {
        color: 'red'
    } );
    polarScope( POLAR_SCOPE_24_HOUR_CENTER.x, POLAR_SCOPE_24_HOUR_CENTER.y, 150, [ '12', '0/24', '18', '6' ] );

    window.canvasRef.addtext(0, POLAR_SCOPE_12_HOUR_CENTER.y - 90, 'KStars 12h Polaris Clock', {
        color: 'red'
    } );
    polarScope( POLAR_SCOPE_12_HOUR_CENTER.x, POLAR_SCOPE_12_HOUR_CENTER.y, 100, [ '0/12', '6', '9', '3' ] );
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

    window.canvasRef.rectangle( 0, 0, 600, 1200, {
        color: 'black',
        fillStrokeClear: 'fill'
    } );

    drawScopes();

    // future we can have user change this default date is now
    const now = new Date();

    let pos = 0,
        pos24H = 0,
        polarisPos = 0;
    const centerPoints = {
            x: POLAR_SCOPE_12_HOUR_CENTER.x,
            y: POLAR_SCOPE_12_HOUR_CENTER.y
        },
        centerPoints24H = {
            x: POLAR_SCOPE_24_HOUR_CENTER.x,
            y: POLAR_SCOPE_24_HOUR_CENTER.y
        },
        polarisCenterPoints = {
            x: POLAR_HOUR_ANGLE_CENTER.x,
            y: POLAR_HOUR_ANGLE_CENTER.y
        };
    if (!polarisClock) {
        polarisClock = new PolarScope( {
            color: '#fff',
            radius: 6,
            isFixedCenter: true,
            clockTime: now,
            centerPoints: polarisCenterPoints,
            xRadius: 115,
            yRadius: 115,
            startAngle: 0,
            latitude,
            longitude,
            rightAssention
        } );
    }
    if ( !polarSP ) {
        polarSP = new PolarScope( {
            color: '#fff',
            radius: 6,
            isFixedCenter: true,
            clockTime: now,
            centerPoints: centerPoints,
            xRadius: 70,
            yRadius: 70,
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
            isFixedCenter: true,
            clockTime: now,
            centerPoints: centerPoints24H,
            xRadius: 115,
            yRadius: 115,
            startAngle: 0,
            latitude,
            longitude,
            rightAssention
        } );
    }

    if ( polarisClock ) {
        polarisClock.latitude = latitude;
        polarisClock.longitude = longitude;
        polarisClock.rightAssention = rightAssention;
        polarisPos = polarisClock.getNextPosition( polarisCenterPoints ).visable;
        window.canvasRef.circle( polarisPos.x, polarisPos.y, polarisPos.radius, {
            color: polarisPos.color,
            fillStrokeClear: 'fill'
        } );
        window.polarisClockref = polarisClock;
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
        window.polarSPref = polarSP;
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
        window.polarSP24Href = polarSP24H;
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

    const displaySix = ( inVal ) => {
        return Number( inVal ).toFixed( 6 );
    };

    if ( isDefaultRA ) {
        window.canvasRef.addtext( 50, 20, `Using corrected RA, Dec values: ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(PolarisCalculatorInstance.correctedRA)} / ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(PolarisCalculatorInstance.correctedDEC)}`, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 40, `Polaris hour angle: ${displaySix(plusHourAnglePolaris)} alt calculation: ${displaySix(ha)} `, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 60, `Clock time: ${clockTimePlus} or ${clockTimeHA} `, {
            color: 'red'
        } );
    } else {
        window.canvasRef.addtext( 50, 20, `Using User Defined RA, Dec: ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(rightAssention)} / ${PolarScopeUtilitiesInstance.hoursMinutesSeconds(declination)}`, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 40, `Polaris hour angle: ${displaySix(plusHourAnglePolaris)} alt calculation: ${displaySix(ha)} `, {
            color: 'red'
        } );
        window.canvasRef.addtext( 50, 60, `Clock time: ${clockTime} ${clockTimeHA} `, {
            color: 'red'
        } );
    }
    window.canvasRef.addtext( 50, 80, `Degrees: ${polarSP.angle}  ${polarSP24H.angle}`, {
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

    const res = canvas.create( "polaris-hour", "canvas-container", 600, 1200 );

    window.canvasRef = res;

    updateHourAngle();
    window.setInterval( updateHourAngle, 5000 );
}

addOnLoad( setupPolarisHour );
