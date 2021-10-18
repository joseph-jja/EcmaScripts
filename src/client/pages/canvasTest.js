import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';

events.addOnLoad( () => {

    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    return new WebWindow( 'Canvas Test',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );


    var res = canvas.create( "canvasTest", "canvas-container", 800, 600 );
    if ( res && res.canvas && res.ctx ) {
        res.circle( 50, 50, 75, {
            "color": "orange"
        } );

        res.halfCircle( 200, 50, 50, {
            "color": "blue"
        } );

        res.hexagon( 50, 50, 75, {
            "color": "red"
        } );

        res.octagon( 50, 50, 75, {
            "color": "purple"
        } );

        res.square( 100, 200, 75, {
            "color": "green"
        } );

        res.equilateralTriangle( 500, 150, 75, {
            "color": "blue"
        } );
        res.equilateralTriangle( 500, 150, 75, {
            "color": "blue",
            "rotateAngle": 180
        } );

        res.equilateralTriangle( 500, 250, 75, {
            "color": "blue"
        } );
        res.equilateralTriangle( 500, 250, 75, {
            "color": "blue",
            "rotateAngle": 72
        } );
        res.equilateralTriangle( 500, 250, 75, {
            "color": "blue",
            "rotateAngle": 144
        } );
        res.equilateralTriangle( 500, 250, 75, {
            "color": "blue",
            "rotateAngle": 216
        } );
        res.equilateralTriangle( 500, 250, 75, {
            "color": "blue",
            "rotateAngle": 288
        } );

        res.equilateralTriangle( 250, 250, 75, {
            "color": "blue"
        } );

        res.equilateralTriangle( 250, 275, 75, {
            "color": "black",
            "orientation": "down",
            "fillStrokeClear": "fill"
        } );

        res.triangle( 325, 300, 355, 425, 400, 250, {
            "color": "black"
        } );

        res.triangle( 425, 300, 455, 425, 500, 250, {
            "color": "black",
            "rotateAngle": 45,
            "fillStrokeClear": "fill"
        } );

        res.circle( 50, 30, 75, {
            "color": "blue"
        } );

        //         (function() {
        //         	var timeout = 250, max = 360, incr = 5, angle = 0;

        //         	window.setInterval(function() {
        //         		   res.ctx.clearRect(20, 290, 130, 400);
        //         		   angle += (+incr);
        //         		   if ( angle > max ) { angle = 0; }
        //         		   res.hexagon(75, 350, 50, {"color": "#00cf88", "rotateAngle": angle});
        //         	}, timeout);
        //         })();

    } else {
        var msg = dom.createElement( "div", "container" );
        if ( msg ) {
            msg.innerHTML = "I guess your browser does not support the canvas object!";
        }
    }
} );
