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

/**
 * add(x,y, ...)                Returns x + y [can handle more than 2 parameters ]
 */
function add() {
    let result = 0;
    for ( let x = 0; x < arguments.length; x += 1 ) {
        result += ( +arguments[ x ] );
    }
    return result;
};

/**
 * subtract(x,y)        Returns x - y
 */
function subtract( x, y ) {
    return ( ( +x ) - ( +y ) );
};

/**
 * multiply(x,y, ...)         Returns x * y   [can handle more than 2 parameters ]
 */
function multiply() {
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
function divide( x, y ) {
    return ( ( +x ) / ( +y ) );
};

/**
 * squares a number
 * x * x or Math.pow(x,2)
 */
function square( x ) {
    return Math.pow( x, 2 );
};

/**
 * cubes a number
 * x * x * x or Math.pow(x,3)
 */
function cube( x ) {
    return Math.pow( x, 3 );
};

/**
 * computes the length of a line in an X-Y plane
 * using the pythagorean theorem ( x^2 + y^2 = z^2) and solving for z
 */
function computeLineLength( x1, y1, x2, y2 ) {
    let xdiff = subtract( x2, x1 );
    let ydiff = subtract( y2, y1 );
    let total = add( square( xdiff ), square( ydiff ) );
    return Math.sqrt( total );
};

/**
 * computes the perimeter of a 4 sided object, given 4 points
 */
function computePerimeter( x1, y1, x2, y2, x3, y3, x4, y4 ) {
    let line1 = computeLineLength( x1, y1, x2, y2 );
    let line2 = computeLineLength( x2, y2, x3, y3 );
    let line3 = computeLineLength( x3, y3, x4, y4 );
    let line4 = computeLineLength( x4, y4, x1, y1 );
    return computePerimeterByLength( line1, line2, line3, line4 );
};

/**
 * computes the perimeter of a 4 sided object
 */
function computePerimeterByLength( side1, side2, side3, side4 ) {
    return add( side1, side2, side3, side4 );
};

/**
 * computes the perimeter of a square
 */
function computePerimeterOfSquare( side ) {
    return multiply( side, 4 );
};

/* compute area of a triangle */
function areaOfTriangle( base, height ) {
    return multiply( base, height, .5 );
};

/* compute area of a trapizoid */
function areaOfTrapizoid( height, abase, bbase ) {
    let a1, a2;
    a1 = add( abase, bbase );
    a2 = divide( a1, 2 );
    return multiply( height, a2 );
};

function pythagorean( a, b ) {
    // return C given a^2 + b^2 = c^2
    return Math.sqrt( square( a ) + square( b ) );
};

/* compute average */
function average() {
    let sum = 0;
    Object.keys( arguments ).forEach( ( e ) => {
        sum = add( sum, arguments[ e ] );
    } );
    return divide( sum, arguments.length );
};

/* compute area of a circle */
function areaOfCircle( radius ) {
    return multiply( Math.PI, square( radius ) );
};

/* compute the circumference of a circle */
function circumferenceOfACircle( radius ) {
    return multiply( 2, Math.PI, radius );
};

/* compute the surface area of a cone */
function surfaceAreaCone( radius, height ) {
    let sqrtTotal = Math.sqrt( multiply( Math.PI, square( radius ) ) );
    let sumtotal = add( square( radius ), square( height ) );
    let radiuisTotal = multiply( radius, Math.PI, sumtotal );
    return add( sqrtTotal, radiuisTotal );
};

/* compute volume of a cone */
function volumeCone( radius, height ) {
    return multiply( ( 1 / 3 ), Math.PI, square( radius ), height );
};

/* compute the surface area of a cylinder */
function surfaceAreaCylinder( radius, height ) {
    let radiusTotal = multiply( 2, Math.PI, square( radius ) );
    let heightTotal = multiply( 2, Math.PI, radius, height );
    return add( radiusTotal, heightTotal );
};

/* compute the volume of a cylinder */
function volumeCylinder( radius, height ) {
    return multiply( Math.PI, square( radius ), height );
};

/* compute the surface area of a sphere */
function surfaceAreaSphere( radius ) {
    return multiply( 4, Math.PI, square( radius ) );
};

/* compute the volume of a sphere */
function volumeSphere( radius ) {
    return multiply( ( 4 / 3 ), Math.PI, cube( radius ) );
};

/* invert a value */
function inverse( x ) {
    return multiply( -1, x );
};

function oneOver( x ) {
    return divide( 1, x );
};

/* compute a factorial */
function factorial( x ) {
    if ( ( +x ) <= 1 ) {
        return 1;
    }
    let f = ( +x ) - 1;
    return multiply( x, factorial( f ) );
};

const hexidecimal = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ];

/* convert from base ten to base x
 * not so good at converting from base 10 to base 10
 * up to base 16 or HEX */
function convertFromBaseTenToBaseX( xbase, inval ) {

    return inval.toString( xbase ).toUpperCase();

    /* let xinval = inval;
    let remainder = hexidecimal[ xinval % xbase ];
    while ( xinval >= xbase ) {
        let r1 = subtract( xinval, ( xinval % xbase ) );
        xinval = divide( r1, xbase );
        // in this case we do not want to add we want to append the strings together
        if ( xinval >= xbase ) {
            remainder = hexidecimal[ xinval % xbase ] + remainder;
        } else {
            remainder = hexidecimal[ xinval ] + remainder;
        }
    }
    return remainder; */
};

/* convert from base x to base ten
 * up to base 16 or HEX */
function convertFromBaseXToBaseTen( xbase, inval ) {
    let remainder = 0;
    let num = 1;

    function valueToInt( x ) {
        let result = '';
        for ( let p = 0, end = hexidecimal.length; p < end; p += 1 ) {
            if ( hexidecimal[ p ] === x ) {
                result = p;
                break;
            }
        }
        return result;
    }

    while ( num <= inval.length ) {
        let incount = Math.pow( xbase, subtract( num, 1 ) );
        let ivlen = subtract( inval.length, num );
        let sschar = valueToInt( inval.charAt( ivlen ) );
        remainder = add( remainder, multiply( sschar, incount ) );
        num++;
    }
    return remainder;
};

// given an x and y radius and angle get the x, y point on the ellipse
function getEllipsePoint( xr, yr, angle ) {
    const rAngle = degreesToRadians( angle ),
        x = multiply( xr, Math.cos( rAngle ) ),
        y = multiply( yr, Math.sin( rAngle ) );

    return {
        x: Math.round( x ),
        y: Math.round( y )
    };
};

// give a radius get ALL the points on the circle
function getEllipsePoints( xr, yr ) {
    const points = [];
    for ( let startPoint = 0; startPoint <= 360; startPoint++ ) {
        const nextPoints = getEllipsePoint( xr, yr, startPoint );
        points.push( nextPoints );
    }
    return points;
};

// given a radius and angle get the x, y point on the circle
function getCirclePoint( r, angle ) {
    const rAngle = degreesToRadians( angle ),
        x = multiply( r, Math.cos( rAngle ) ),
        y = multiply( r, Math.sin( rAngle ) );

    return {
        x: Math.round( x ),
        y: Math.round( y )
    };
};

// give a radius get ALL the points on the circle
function getCirclePoints( r ) {
    const points = [];
    for ( let startPoint = 0; startPoint <= 360; startPoint++ ) {
        const nextPoints = getCirclePoint( r, startPoint );
        points.push( nextPoints );
    }
    return points;
};

function distanceBetweenCirclesCenters( x1, y1, x2, y2 ) {
    const diffXSqr = square( subtract( x1, x2 ) ),
        diffYSqr = square( subtract( y1, y2 ) );

    return Math.sqrt( add( diffXSqr, diffYSqr ) );
};

function getRectangleCenter( width, height ) {
    return {
        x: Math.floor( divide( width, 2 ) ),
        y: Math.floor( divide( height, 2 ) )
    };
};

function getRectangleCorner( width, height ) {
    const center = getRectangleCenter( width, height );
    const p1 = Math.ceil( divide( center.x, 2 ) ),
        p2 = Math.ceil( divide( center.y, 2 ) );
    return ( p1 < p2 ? p1 : p2 );
};

function degreesToRadians( x ) {
    return x * Math.PI / 180;
};

function radiansToDegrees( x ) {
    return x * 180 / Math.PI;
};

function generateGUID() {
    const timenow = new Date().getTime() * 1000000,
        hexval = convertFromBaseTenToBaseX( 16, timenow );

    let guid = '';
    for ( let i = 0, l = hexval.length; i < l; i += 1 ) {
        guid += ( hexval[ i ] << 1 ); // eslint-disable-line
    }

    guid = hexval + convertFromBaseTenToBaseX( 16, guid );
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

const MathFunctions = {
    add,
    subtract,
    multiply,
    divide,
    square,
    cube,
    computeLineLength,
    computePerimeter,
    computePerimeterByLength,
    computePerimeterOfSquare,
    areaOfTriangle,
    areaOfTrapizoid,
    pythagorean,
    average,
    areaOfCircle,
    circumferenceOfACircle,
    surfaceAreaCone,
    volumeCone,
    surfaceAreaCylinder,
    volumeCylinder,
    surfaceAreaSphere,
    volumeSphere,
    inverse,
    oneOver,
    factorial,
    convertFromBaseTenToBaseX,
    convertFromBaseXToBaseTen,
    getEllipsePoint,
    getEllipsePoints,
    getCirclePoint,
    getCirclePoints,
    distanceBetweenCirclesCenters,
    getRectangleCenter,
    getRectangleCorner,
    degreesToRadians,
    radiansToDegrees,
    generateGUID
};

export {
    add,
    subtract,
    multiply,
    divide,
    square,
    cube,
    computeLineLength,
    computePerimeter,
    computePerimeterByLength,
    computePerimeterOfSquare,
    areaOfTriangle,
    areaOfTrapizoid,
    pythagorean,
    average,
    areaOfCircle,
    circumferenceOfACircle,
    surfaceAreaCone,
    volumeCone,
    surfaceAreaCylinder,
    volumeCylinder,
    surfaceAreaSphere,
    volumeSphere,
    inverse,
    oneOver,
    factorial,
    convertFromBaseTenToBaseX,
    convertFromBaseXToBaseTen,
    getEllipsePoint,
    getEllipsePoints,
    getCirclePoint,
    getCirclePoints,
    distanceBetweenCirclesCenters,
    getRectangleCenter,
    getRectangleCorner,
    degreesToRadians,
    radiansToDegrees,
    generateGUID
};

export default MathFunctions;
