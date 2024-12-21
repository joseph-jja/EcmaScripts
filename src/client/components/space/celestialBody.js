import {
    add,
    subtract,
    getEllipsePoints,
    getCirclePoints
} from '/js/utils/mathFunctions';

export class CelestialBody {

    constructor( options = {} ) {

        // color of the object
        this.color = options.color || 'red';

        // radius of the object
        this.radius = options.radius || 5;

        // hiddent radius, which is usually black 
        this.hiddenRadius = add( this.radius, 1 );

        // direction of movement
        this.direction = options.direction && options.direction === 'clockwise' ? add : subtract;

        // start angle of object
        this.angle = options.startAngle || 0;

        // how fast is this object moving
        // useful for stars and planet to have them move at different speeds
        this.speed = options.speed || 1;
    }

    // gets a list of 360 degree points as to where the object is
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

    constructor( options = {} ) {
        super( options );

        if ( options.xRadius ) {
            this.setupPoints( options.xRadius, options.yRadius );
        }

        // a star can have a fixed center of rotation like the center of the canvas
        // stars can also orbit another star so .... there is that
        if ( options.isFixedCenter && options.centerPoints ) {
            this.centerPts = options.centerPoints;
        }
    }

    getInitialPosition( centerPoints ) {

        const center = ( this.centerPts ? this.centerPts : centerPoints );

        return this.getVisablePosition( center );
    }

    getNextPosition( centerPoints ) {

        const center = ( this.centerPts ? this.centerPts : centerPoints );

        this.hidden = this.getHiddenPosition( center );

        this.increment();

        this.visable = this.getVisablePosition( center );

        return {
            hidden: this.hidden,
            visable: this.visable
        };
    }

    getPoint() {

        return {
            hidden: {
                x: this.hidden.x,
                y: this.hidden.y
            },
            visable: {
                x: this.visable.x,
                y: this.visable.y
            }
        };
    }
}

export class Planet extends CelestialBody {

    constructor( options = {} ) {
        super( options );

        if ( options.xRadius ) {
            this.setupPoints( options.xRadius, options.yRadius );
        }

        // a star can have a fixed center of rotation like the center of the canvas
        // stars can also orbit another star so .... there is that
        if ( options.parentStar ) {
            this.parentStar = options.parentStar;
        }
    }

    getNextPosition( centerPoints ) {

        const center = ( this.parentStar ? this.parentStar.getPoint() : centerPoints );

        const hidden = this.getHiddenPosition( center.hidden );

        this.increment();

        const visable = this.getVisablePosition( center.visable );

        return {
            hidden,
            visable
        };
    }
}
