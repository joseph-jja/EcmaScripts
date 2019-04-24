import {
    add,
    subtract,
    divide,
    multiply,
    getRectangleCenter,
    getRectangleCorner,
    getCurrentPosition,
    distanceBetweenCirclesCenters,
    getEllipsePoints,
    getCirclePoints,
    square
} from 'utils/mathFunctions';

export class CelestialBody {

    constructor( color, radius, options = {} ) {

        this.color = color || 'red';
        this.radius = radius || 5;
        this.hiddenRadius = add( this.radius, 1 );
        this.direction = options.direction && options.direction === 'clockwise' ? add : subtract;
        this.angle = options.startAngle || 0;
        this.speed = options.speed || 1;
    }

    setupPoints( xRadius = 30, yRadius ) {

        if ( xRadius !== yRadius && yRadius ) {
            this.points = getEllipsePoints( xRadius, yRadius );
        } else {
            this.points = getCirclePoints( xRadius );
        }
    }

    increment() {
        this.angle = this.direction( this.angle, this.speed );
        if ( this.angle < 0 ) {
            this.angle = 360;
        } else if ( this.angle > 360 ) {
            this.angle = 0;
        }
    }

    getCurrentPosition( centerPoints, isShown ) {

        return {
            x: ( this.direction( centerPoints.x, this.points[ this.angle ].x ) ),
            y: ( this.direction( centerPoints.y, this.points[ this.angle ].y ) ),
            radius: ( isShown ? this.radius : this.hiddenRadius ),
            color: ( isShown ? this.color : 'black' )
        };
    }

    getHiddenPosition( centerPoints ) {
        return this.getCurrentPosition( centerPoints, false );
    }

    getVisablePosition( centerPoints ) {
        return this.getCurrentPosition( centerPoints, true );
    }
}

// a simplified star implementation
export class Star extends CelestialBody {

    constructor( color, radius, options = {} ) {
        super( color, radius, options );

        if ( options.xRadius ) {
            this.setupPoints( options.xRadius, options.yRadius );
        }

        // a star can have a fixed center of rotation like the center of the canvas
        // stars can also orbit another star so .... there is that
        if ( options.isFixedCenter && options.centerPoints ) {
            this.centerPts = options.centerPoints;
        }
    }

    getNextPosition( centerPoints ) {

        const center = ( this.centerPts ? this.centerPts : centerPoints );

        const hidden = this.getHiddenPosition( center, false );

        this.increment();

        const visable = this.getVisablePosition( center, false );

        return {
            hidden,
            visable
        };
    }

    getPoint( centerPoints ) {

        const center = ( this.centerPts ? this.centerPts : centerPoints );

        const visable = this.getVisablePosition( center, false );

        return {
            x: visable.x,
            y: visable.y
        };
    }
}
