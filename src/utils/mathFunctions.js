/** Math object gives us
 * abs(x) 		Returns the absolute value of a number
 * acos(x) 		Returns the arccosine of a number
 * asin(x) 		Returns the arcsine of a number
 * atan(x) 		Returns the arctangent of x as a numeric value between -PI/2 and PI/2 radians
 * atan2(y,x) 	Returns the angle theta of an (x,y) point as a numeric value between -PI and PI radians
 * ceil(x) 		Returns the value of a number rounded upwards to the nearest integer
 * cos(x) 		Returns the cosine of a number
 * exp(x) 		Returns the value of Ex
 * floor(x) 		Returns the value of a number rounded downwards to the nearest integer
 * log(x) 		Returns the natural logarithm (base E) of a number
 * max(x,y) 		Returns the number with the highest value of x and y
 * min(x,y) 		Returns the number with the lowest value of x and y
 * pow(x,y) 		Returns the value of x to the power of y
 * random() 		Returns a random number between 0 and 1
 * round(x) 		Rounds a number to the nearest integer
 * sin(x) 		Returns the sine of a number
 * sqrt(x) 		Returns the square root of a number
 * tan(x) 		Returns the tangent of an angle
 * toSource() 	Represents the source code of an object
 * valueOf() 	Returns the primitive value of a Math object
 * and more
 * extend the Math object in JavaScript
 * the Math object is static, so you do not call new on it, just set a reference to it
 */
const MathFunctions = {};

/**
 * add(x,y, ...)                Returns x + y [can handle more than 2 parameters ]
 */
MathFunctions.add = function () {
    let result = 0;
    for ( let x = 0; x < arguments.length; x += 1 ) {
        result += ( +arguments[ x ] );
    }
    return result;
};

/**
 * subtract(x,y)        Returns x - y
 */
MathFunctions.subtract = function ( x, y ) {
    return ( ( +x ) - ( +y ) );
};

/**
 * multiply(x,y, ...)         Returns x * y   [can handle more than 2 parameters ]
 */
MathFunctions.multiply = function () {
    let result = 1;
    for ( let x = 0; x < arguments.length; x += 1 ) {
        let y = result;
        result = ( +y ) * ( +arguments[ x ] );
    }
    return result;
};

/**
 * divide(x,y)            Returns x / y
 */
MathFunctions.divide = function ( x, y ) {
    return ( ( +x ) / ( +y ) );
};

/**
 * squares a number
 * x * x or Math.pow(x,2)
 */
MathFunctions.square = function ( x ) {
    return Math.pow( x, 2 );
};

/**
 * cubes a number
 * x * x * x or Math.pow(x,3)
 */
MathFunctions.cube = function ( x ) {
    return Math.pow( x, 3 );
};

/**
 * computes the length of a line in an X-Y plane
 * using the pythagorean theorem ( x^2 + y^2 = z^2) and solving for z
 */
MathFunctions.computeLineLength = function ( x1, y1, x2, y2 ) {
    let xdiff = MathFunctions.subtract( x2, x1 );
    let ydiff = MathFunctions.subtract( y2, y1 );
    let total = MathFunctions.add( MathFunctions.square( xdiff ), MathFunctions.square( ydiff ) );
    return Math.sqrt( total );
};

/**
 * computes the perimeter of a 4 sided object, given 4 points
 */
MathFunctions.computePerimeter = function ( x1, y1, x2, y2, x3, y3, x4, y4 ) {
    let line1 = MathFunctions.computeLineLength( x1, y1, x2, y2 );
    let line2 = MathFunctions.computeLineLength( x2, y2, x3, y3 );
    let line3 = MathFunctions.computeLineLength( x3, y3, x4, y4 );
    let line4 = MathFunctions.computeLineLength( x4, y4, x1, y1 );
    return MathFunctions.computePerimeterByLength( line1, line2, line3, line4 );
};

/**
 * computes the perimeter of a 4 sided object
 */
MathFunctions.computePerimeterByLength = function ( side1, side2, side3, side4 ) {
    return MathFunctions.add( side1, side2, side3, side4 );
};

/**
 * computes the perimeter of a square
 */
MathFunctions.computePerimeterOfSquare = function ( side ) {
    return MathFunctions.multiply( side, 4 );
};

/* compute area of a triangle */
MathFunctions.areaOfTriangle = function ( base, height ) {
    return MathFunctions.multiply( base, height, .5 );
};

/* compute area of a trapizoid */
MathFunctions.areaOfTrapizoid = function ( height, abase, bbase ) {
    let a1, a2;
    a1 = MathFunctions.add( abase, bbase );
    a2 = MathFunctions.divide( a1, 2 );
    return MathFunctions.multiply( height, a2 );
};

MathFunctions.pythagorean = function ( a, b ) {
    // return C given a^2 + b^2 = c^2
    return Math.sqrt( MathFunctions.square( a ) + MathFunctions.square( b ) );
};

/* compute average */
MathFunctions.average = function () {
    let sum = 0;
    Object.keys( arguments ).forEach( ( e ) => {
        sum = MathFunctions.add( sum, arguments[ e ] );
    } );
    return MathFunctions.divide( sum, arguments.length );
};

/* compute area of a circle */
MathFunctions.areaOfCircle = function ( radius ) {
    return MathFunctions.multiply( Math.PI, MathFunctions.square( radius ) );
};

/* compute the circumference of a circle */
MathFunctions.circumferenceOfACircle = function ( radius ) {
    return MathFunctions.multiply( 2, Math.PI, radius );
};

/* compute the surface area of a cone */
MathFunctions.surfaceAreaCone = function ( radius, height ) {
    let sqrtTotal = Math.sqrt( MathFunctions.multiply( Math.PI, MathFunctions.square( radius ) ) );
    let sumtotal = MathFunctions.add( MathFunctions.square( radius ), MathFunctions.square( height ) );
    let radiuisTotal = MathFunctions.multiply( radius, Math.PI, sumtotal );
    return MathFunctions.add( sqrtTotal, radiuisTotal );
};

/* compute volume of a cone */
MathFunctions.volumeCone = function ( radius, height ) {
    return MathFunctions.multiply( ( 1 / 3 ), Math.PI, MathFunctions.square( radius ), height );
};

/* compute the surface area of a cylinder */
MathFunctions.surfaceAreaCylinder = function ( radius, height ) {
    let radiusTotal = MathFunctions.multiply( 2, Math.PI, MathFunctions.square( radius ) );
    let heightTotal = MathFunctions.multiply( 2, Math.PI, radius, height );
    return MathFunctions.add( radiusTotal, heightTotal );
};

/* compute the volume of a cylinder */
MathFunctions.volumeCylinder = function ( radius, height ) {
    return MathFunctions.multiply( Math.PI, MathFunctions.square( radius ), height );
};

/* compute the surface area of a sphere */
MathFunctions.surfaceAreaSphere = function ( radius ) {
    return MathFunctions.multiply( 4, Math.PI, MathFunctions.square( radius ) );
};

/* compute the volume of a sphere */
MathFunctions.volumeSphere = function ( radius ) {
    return MathFunctions.multiply( ( 4 / 3 ), Math.PI, MathFunctions.cube( radius ) );
};

/* invert a value */
MathFunctions.inverse = function ( x ) {
    return MathFunctions.multiply( -1, x );
};

MathFunctions.oneOver = function ( x ) {
    return MathFunctions.divide( 1, x );
};

/* compute a factorial */
MathFunctions.factorial = function ( x ) {
    if ( ( +x ) <= 1 ) {
        return 1;
    }
    let f = ( +x ) - 1;
    return MathFunctions.multiply( x, MathFunctions.factorial( f ) );
};

MathFunctions.hexidecimal = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ];

/* convert from base ten to base x
 * not so good at converting from base 10 to base 10
 * up to base 16 or HEX */
MathFunctions.convertFromBaseTenToBaseX = function ( xbase, inval ) {
    let xinval = inval;
    let remainder = MathFunctions.hexidecimal[ xinval % xbase ];
    while ( xinval >= xbase ) {
        let r1 = MathFunctions.subtract( xinval, ( xinval % xbase ) );
        xinval = MathFunctions.divide( r1, xbase );
        // in this case we do not want to add we want to append the strings together
        if ( xinval >= xbase ) {
            remainder = MathFunctions.hexidecimal[ xinval % xbase ] + remainder;
        } else {
            remainder = MathFunctions.hexidecimal[ xinval ] + remainder;
        }
    }
    return remainder;
};

/* convert from base x to base ten
 * up to base 16 or HEX */
MathFunctions.convertFromBaseXToBaseTen = function ( xbase, inval ) {
    let remainder = 0;
    let num = 1;

    function valueToInt( x ) {
        for ( let p = 0; p < MathFunctions.hexidecimal.length; p += 1 ) {
            if ( MathFunctions.hexidecimal[ p ] === x ) {
                return p;
            }
        }
        return '';
    }
    while ( num <= inval.length ) {
        let incount = Math.pow( xbase, MathFunctions.subtract( num, 1 ) );
        let ivlen = MathFunctions.subtract( inval.length, num );
        let sschar = valueToInt( inval.charAt( ivlen ) );
        remainder = MathFunctions.add( remainder, MathFunctions.multiply( sschar, incount ) );
        num++;
    }
    return remainder;
};

MathFunctions.degreesToRadians = function ( x ) {
    return x * Math.PI / 180;
};

MathFunctions.radiansToDegrees = function ( x ) {
    return x * 180 / Math.PI;
};

MathFunctions.generateGUID = function () {
    const timenow = new Date().getTime() * 1000000,
        hexval = MathFunctions.convertFromBaseTenToBaseX( 16, timenow );

    let guid = '';
    for ( let i = 0, l = hexval.length; i < l; i += 1 ) {
        guid += ( hexval[ i ] << 1 );
    }

    guid = hexval + MathFunctions.convertFromBaseTenToBaseX( 16, guid );
    let result = '';
    for ( let i = 0, l = guid.length; i < l; i += 1 ) {
        result += guid[ i ];
        if ( i > 0 && i % 5 === 0 && i % 10 !== 0 ) {
            result += "-";
        }
        if ( i > 0 && i % 9 === 0 ) {
            result += "-";
        }
    }
    if ( result.substring( result.length - 1 ) === "-" ) {
        result = result.substring( 0, result.length - 1 );
    }
    return result;

};

export default MathFunctions;
