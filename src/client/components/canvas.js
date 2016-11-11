import * as dom from 'client/dom/DOM';
import {
    exists
} from 'utils/typeCheck';
import MF from "utils/mathFunctions";

function setProperties( canvas ) {

    console.log( MF );
    canvas.clear = function () {
        this.ctx.clearRect( 0, 0, this.width, this.height );
    };

    canvas.line = function ( startX, startY, endX, endY, options ) {

        var cx, offsetX = 0,
            offsetY = 0,
            ox, oy,
            color, rotateAngle;

        cx = this.ctx;

        if ( options ) {
            color = options[ 'color' ];
            rotateAngle = options[ 'rotateAngle' ];
        }

        cx.save();
        cx.beginPath();

        // FIX ME
        // allow us to rotate the arc
        if ( rotateAngle ) {
            // to do this need to find center 
            // then rotate around that point
            ox = Math.abs( startX - endX ) / 2;
            oy = Math.abs( startY - endY ) / 2;
            offsetX = startX + ox;
            offsetY = startY + oy;
            cx.translate( offsetX, offsetY );
            // take degrees and convert to radians
            cx.rotate( MF.degreesToRadians( rotateAngle ) );
        }
        cx.moveTo( startX - offsetX, startY - offsetY );
        cx.lineTo( endX - offsetX, endY - offsetY );

        cx.fillStyle = ( ( color ) ? color : "black" );
        cx.fill();
        cx.strokeStyle = ( ( color ) ? color : "black" );
        cx.stroke();
        cx.restore();
    };

    canvas.circle = function ( x, y, radius, options ) {

        var stroke, cx, color, fillStrokeClear;

        cx = this.ctx;

        if ( options ) {
            color = options[ 'color' ];
            fillStrokeClear = options[ 'fillStrokeClear' ];
        }

        cx.beginPath();
        // this line is for a konqueror bug in circle and arc 
        // where konqueror starts from point 0,0 so you need to moveTo
        cx.moveTo( x + radius, y );
        cx.arc( x, y, radius, 0, Math.PI * 2, true );

        stroke = ( ( fillStrokeClear ) ? fillStrokeClear : "stroke" );
        cx[ stroke + "Style" ] = ( ( color ) ? color : "black" );
        cx[ stroke ]();
    };

    canvas.halfCircle = function ( x, y, radius, options ) {

        var stroke, cx, offsetX = 0,
            offsetY = 0,
            color, rotateAngle, fillStrokeClear, openTop;

        cx = this.ctx;

        if ( options ) {
            color = options[ 'color' ];
            rotateAngle = options[ 'rotateAngle' ];
            openTop = options[ 'openTop' ];
            fillStrokeClear = options[ 'fillStrokeClear' ];
        }

        cx.save();
        cx.beginPath();

        // allow us to rotate the arc
        if ( rotateAngle ) {
            offsetX = x;
            offsetY = y;
            cx.translate( offsetX, offsetY );
            // take degrees and convert to radians
            cx.rotate( MF.degreesToRadians( rotateAngle ) );
        }
        // this line is for a konqueror bug in circle and arc 
        // where konqueror starts from point 0,0 so you need to moveTo
        cx.moveTo( x - radius - offsetX, y - offsetY );
        cx.arc( x - offsetX, y - offsetY, radius, Math.PI, Math.PI * 2, true );
        if ( !openTop ) {
            cx.lineTo( x - radius - offsetX, y - offsetY );
        }
        cx.closePath();

        stroke = ( ( fillStrokeClear ) ? fillStrokeClear : "stroke" );
        cx[ stroke + "Style" ] = ( ( color ) ? color : "black" );
        cx[ stroke ]();
        cx.restore();
    };

    canvas.oval = function ( xi, yi, w, h, options ) {

        // the bezierCurve code and kappa was taken from stack overflow
        // rotation has been added
        // also we adjust the x and y to be the middle of the oval instead of the top left and right positions
        var stroke, cx, color, fillStrokeClear, rotateAngle, offsetX = 0,
            offsetY = 0,
            kappa = .5522848,
            x = xi - w / 2, // adjust x to be the real middle
            y = yi - h / 2, // adjust y to be the real middle
            ox = ( w / 2 ) * kappa, // control point offset horizontal
            oy = ( h / 2 ) * kappa, // control point offset vertical
            xe = x + w, // x-end
            ye = y + h, // y-end
            xm = x + w / 2, // x-middle
            ym = y + h / 2; // y-middle


        cx = this.ctx;

        cx.save();
        if ( options ) {
            color = options[ 'color' ];
            fillStrokeClear = options[ 'fillStrokeClear' ];
            rotateAngle = options[ 'rotateAngle' ];
        }

        cx.beginPath();

        if ( rotateAngle ) {
            offsetX = xm;
            offsetY = ym;
            cx.translate( offsetX, offsetY );
            // take degrees and convert to radians
            cx.rotate( MF.degreesToRadians( rotateAngle ) );
        }

        // this line is for a konqueror bug in circle and arc
        // where konqueror starts from point 0,0 so you need to moveTo
        cx.moveTo( x - offsetX, ym - offsetY );
        cx.bezierCurveTo( x - offsetX, ym - oy - offsetY, xm - ox - offsetX, y - offsetY, xm - offsetX, y - offsetY );
        cx.bezierCurveTo( xm + ox - offsetX, y - offsetY, xe - offsetX, ym - oy - offsetY, xe - offsetX, ym - offsetY );
        cx.bezierCurveTo( xe - offsetX, ym + oy - offsetY, xm + ox - offsetX, ye - offsetY, xm - offsetX, ye - offsetY );
        cx.bezierCurveTo( xm - ox - offsetX, ye - offsetY, x - offsetX, ym + oy - offsetY, x - offsetX, ym - offsetY );

        cx.restore();

        stroke = ( ( fillStrokeClear ) ? fillStrokeClear : "stroke" );
        cx[ stroke + "Style" ] = ( ( color ) ? color : "black" );
        cx[ stroke ]();

    };

    // fillStrokeClear is either fill stroke or clear
    canvas.rectangle = function ( x, y, width, height, options ) {

        var stroke, cx, offsetX = 0,
            offsetY = 0,
            color, rotateAngle, fillStrokeClear;

        cx = this.ctx;

        if ( options ) {
            color = options[ 'color' ];
            rotateAngle = options[ 'rotateAngle' ];
            fillStrokeClear = options[ 'fillStrokeClear' ];
        }

        cx.save();
        cx.beginPath();

        // allow us to rotate the arc
        if ( rotateAngle ) {
            offsetX = Math.round( x + ( width / 2 ) );
            offsetY = Math.round( y + ( height / 2 ) );
            cx.translate( offsetX, offsetY );
            // take degrees and convert to radians
            cx.rotate( MF.degreesToRadians( rotateAngle ) );
        }

        stroke = ( ( fillStrokeClear ) ? fillStrokeClear : "stroke" );
        cx[ stroke + "Style" ] = ( ( color ) ? color : "black" );
        cx[ stroke + "Rect" ]( x - offsetX, y - offsetY, width, height );
        cx[ stroke ]();
        cx.restore();
    };

    // fillStrokeClear is either fill stroke or clear
    canvas.square = function ( x, y, size, options ) {

        this.rectangle( x, y, size, size, options );
    };

    canvas.triangle = function ( ax, ay, bx, by, cx, cy, options ) {

        var ctx, stroke,
            offsetX = 0,
            offsetY = 0,
            color, rotateAngle, fillStrokeClear;

        ctx = this.ctx;

        if ( options ) {
            color = options[ 'color' ];
            rotateAngle = options[ 'rotateAngle' ];
            fillStrokeClear = options[ 'fillStrokeClear' ];
        }

        ctx.save();
        ctx.beginPath();
        // allow us to rotate the triangle, 
        // FIX ME find center
        if ( rotateAngle ) {
            offsetX = ( ax + bx + cx ) / 3;
            offsetY = ( ay + by + cy ) / 3;
            ctx.translate( offsetX, offsetY );
            // take degrees and convert to radians
            ctx.rotate( MF.degreesToRadians( rotateAngle ) );
        }

        stroke = ( ( fillStrokeClear ) ? fillStrokeClear : "stroke" );


        ctx.moveTo( ax - offsetX, ay - offsetY );
        ctx.lineTo( bx - offsetX, by - offsetY );
        ctx.lineTo( cx - offsetX, cy - offsetY );
        ctx.lineTo( ax - offsetX, ay - offsetY );
        ctx.closePath();

        ctx[ stroke + "Style" ] = ( ( color ) ? color : "black" );
        ctx[ stroke ]();
        ctx.restore();
    };

    canvas.equilateralTriangle = function ( ax, ay, size, options ) {
        var c, psize, orientation;

        if ( options ) {
            orientation = options[ 'orientation' ];
        }

        psize = size / 2;
        // from a^2 + b^2 = c^2 solve for c
        c = MF.pythagorean( size, psize );

        if ( orientation === "down" ) {
            this.triangle( ax, ay, ax + size, ay, ax + psize, ay + c, options );
        } else {
            this.triangle( ax, ay, ax + size, ay, ax + psize, ay - c, options );
        }
    };

    // x,y is center and size is the size of the side 
    canvas.hexagon = function ( ax, ay, size, options ) {
        var cx,
            c, psize, stroke,
            fillStrokeClear, color, rotateAngle,
            offsetX = 0,
            offsetY = 0;

        cx = this.ctx;

        if ( options ) {
            color = options[ 'color' ];
            rotateAngle = options[ 'rotateAngle' ];
            fillStrokeClear = options[ 'fillStrokeClear' ];
        }

        psize = size / 2;
        stroke = ( ( fillStrokeClear ) ? fillStrokeClear : "stroke" );

        // from a^2 + b^2 = c^2 solve for c 
        c = MF.pythagorean( size, psize );

        cx.save();
        cx.beginPath();

        if ( rotateAngle ) {
            offsetX = ax;
            offsetY = ay;
            cx.translate( offsetX, offsetY );
            cx.rotate( MF.degreesToRadians( rotateAngle ) );
        }
        // move to starting postion from center
        cx.moveTo( ax + psize - size - offsetX, ay - c - offsetY );
        // draw top
        cx.lineTo( ax + psize - offsetX, ay - c - offsetY );

        // draw right side 
        cx.lineTo( ax + size - offsetX, ay - offsetY );
        cx.lineTo( ax + psize - offsetX, ay + c - offsetY );

        // draw bottom line 
        cx.lineTo( ax + psize - size - offsetX, ay + c - offsetY );

        // draw left side 
        cx.lineTo( ax - size - offsetX, ay - offsetY );
        cx.lineTo( ax - size + psize - offsetX, ay - c - offsetY );

        cx.closePath();
        cx[ stroke + "Style" ] = ( ( color ) ? color : "black" );
        cx[ stroke ]();
        cx.restore();
    };


    // x,y is center and size is the size of the side 
    canvas.octagon = function ( x, y, size, options ) {
        var cx,
            c, psize, stroke,
            fillStrokeClear, color, rotateAngle, offsetX = 0,
            offsetY = 0;

        if ( options ) {
            color = options[ 'color' ];
            rotateAngle = options[ 'rotateAngle' ];
            fillStrokeClear = options[ 'fillStrokeClear' ];
        }

        stroke = ( ( fillStrokeClear ) ? fillStrokeClear : "stroke" );

        psize = size / 2;
        c = Math.sqrt( Math.pow( size, 2 ) + Math.pow( psize, 2 ) );

        cx = this.ctx;
        cx.save();
        if ( rotateAngle ) {
            offsetX = x;
            offsetY = y;
            cx.translate( offsetX, offsetY );
            cx.rotate( MF.degreesToRadians( rotateAngle ) );
        }

        cx.beginPath();
        cx.moveTo( x - psize - offsetX, y - c - offsetY );
        // draw top
        cx.lineTo( x + psize - offsetX, y - c - offsetY );

        // right side 
        cx.lineTo( x + c - offsetX, y - psize - offsetY );
        cx.lineTo( x + c - offsetX, y + psize - offsetY );
        cx.lineTo( x + psize - offsetX, y + c - offsetY );

        // bottom line
        cx.lineTo( x - psize - offsetX, y + c - offsetY );

        // left size 
        cx.lineTo( x - c - offsetX, y + psize - offsetY );
        cx.lineTo( x - c - offsetX, y - psize - offsetY );
        cx.lineTo( x - psize - offsetX, y - c - offsetY );

        cx.closePath();
        cx[ stroke + "Style" ] = ( ( color ) ? color : "black" );
        cx[ stroke ]();
        cx.restore();
    };

};

// setup canvas and context
// will set up all the methods on this object
export function create( id, parent, width, height ) {
    var cvs = {
            canvas: null,
            ctx: null,
            width: 0,
            height: 0
        },
        result;
    console.log( MF );

    cvs.canvas = dom.createElement( "canvas", parent, {
        "id": id
    } );
    if ( !cvs.canvas ) {
        return null;
    }
    if ( width ) {
        cvs.canvas.width = width;
    }
    if ( height ) {
        cvs.canvas.height = height;
    }
    cvs.width = cvs.canvas.width;
    cvs.height = cvs.canvas.height;
    if ( exists( cvs.canvas.getContext ) ) {
        cvs.ctx = cvs.canvas.getContext( '2d' );
        setProperties( cvs );
        result = cvs;
    }
    return result;
}
