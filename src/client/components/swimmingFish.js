// this is our fish object that gets created,
// we no longer support Netscape 4
// also this object REQUIRES the UserAgent.js object
// as it creates and uses an instance of the object
// name space
import {
    screen
} from 'client/dom/DOM';
import selector from '/js/client/dom/selector';

const SWIMMING_FISH_IMAGE = '<img src="fish_swim_template.gif">';
const REV_SWIMMING_FISH_IMAGE = '<img src="fish_swim_template_rev.gif">';
const FISH_IMAGE_WIDTH = 175;
const FISH_IMAGE_HEIGHT = 175;
const FISH_IMAGE_ZINDEX = "5";
const FISH_IMAGE_DEFAULT_BROWSER_WIDTH = 800;
const FISH_IMAGE_DEFAULT_BROWSER_HEIGHT = 600;
const SWIMMING_FISH_TIMEOUT = 100;

//
// here we are creating our browser fish object
//
function BrowserFish( name ) {

    this.get = selector;

    this.xcount = 0;
    this.ycount = 0;

    // initial positions
    this.x = 0;
    this.y = 40;
    this.xpos = 0;
    this.ypos = 0;

    // image width && height
    this.iw = FISH_IMAGE_WIDTH;
    this.ih = FISH_IMAGE_HEIGHT;

    // default max positions
    this.maxx = ( screen.maxx() > 0 ) ? screen.maxx() : FISH_IMAGE_DEFAULT_BROWSER_WIDTH;
    this.maxy = ( screen.maxy() > 0 ) ? screen.maxy() : FISH_IMAGE_DEFAULT_BROWSER_HEIGHT;

    this.runningfish = true;
    this.runtimerid = '';

    // direction is true for forward false for reverse
    this.lrDirection = true;

    // movement from top to bottom
    this.tbDirection = true;

    // internal reference to the fish
    this.fishObj = "";

    // the fish id name
    this.idName = name;
    this.getId = function () {
        return this.idName;
    };

    this.setId = function ( name ) {
        this.idName = name;
    };

    return this;
};

// get the fish based on direction
BrowserFish.prototype.getFish = function () {

    // mozilla / netscape 5.0 later
    // then IE
    // then netscape earlier
    if ( !document.getElementById ) {
        alert( "Sorry, your browser is completely unsupported!" );
        return false;
    }

    this.fishObj = this.get( "#" + this.getId() ).get( 0 );
    if ( this.lrDirection ) {
        this.fishObj.innerHTML = SWIMMING_FISH_IMAGE;
        return true;
    } else if ( !this.lrDirection ) {
        this.fishObj.innerHTML = REV_SWIMMING_FISH_IMAGE;
        return true;
    }
    return false;
};

// get the count to be added for the left right positioning
BrowserFish.prototype.getXPos = function () {

    if ( this.xpos > this.maxx - this.iw ) {
        this.xcount = -2;
        this.hideFish();
        this.lrDirection = false;
        this.ypos += this.getYPos();
    } else if ( this.xpos < 0 ) {
        this.xcount = 2;
        this.hideFish();
        this.lrDirection = true;
        this.ypos += this.getYPos();
    } else if ( this.xpos <= this.maxx - this.iw ) {
        if ( this.lrDirection ) {
            this.xcount = 2;
        } else {
            this.xcount = -2;
        }
    }
    return this.xcount;
};

// get the count to be added for the top and bottom positioning
BrowserFish.prototype.getYPos = function () {
    if ( this.ypos > this.maxy - this.ih ) {
        this.ycount = -30;
        this.tbDirection = false;
    } else if ( this.ypos < 0 ) {
        this.ycount = 30;
        this.tbDirection = true;
    } else if ( this.ypos <= this.maxy - this.ih ) {
        if ( this.tbDirection ) {
            this.ycount = 30;
        } else {
            this.ycount = -30;
        }
    }
    return this.ycount;
};

// set the new position of the fish object
BrowserFish.prototype.setPosition = function () {

    // no fish just return
    if ( !this.getFish() ) {
        return;
    }

    this.xpos += this.getXPos();

    // this sets the left / right positioning
    if ( this.fishObj && this.fishObj.style && this.xpos ) {
        this.fishObj.style.left = this.xpos + "px";
    }

    // this sets the top / bottom positioning
    if ( window.pageYOffset ) {
        this.fishObj.style.top = this.ypos + window.pageYOffset + "px";
    } else if ( ( document.documentElement ) && ( document.documentElement.scrollTop ) ) {
        this.fishObj.style.top = this.ypos + document.documentElement.scrollTop + "px";
    } else if ( document.body.scrollTop ) {
        this.fishObj.style.top = this.ypos + document.body.scrollTop + "px";
    } else {
        this.fishObj.style.top = this.ypos + "px";
    }
};

// this function hides the fish no matter which direction
BrowserFish.prototype.hideFish = function () {

    if ( !this.getFish() ) {
        return;
    }
    if ( this.fishObj.style ) {
        this.fishObj.style.visibility = "hidden";
    }
};

// this function shows the fish no matter which direction
BrowserFish.prototype.showFish = function () {
    if ( !this.getFish() ) {
        return;
    }
    if ( this.fishObj.style ) {
        this.fishObj.style.visibility = "visible";
    }
};

// this function stops the fish no matter which direction it is going
BrowserFish.prototype.stopfish = function () {

    if ( this.runningfish ) {
        this.runningfish = false;
        this.hideFish();
        // works now!
        window.clearTimeout( this.runtimerid );
        this.runtimerid = '';
    }
    return true;
};

// this starts the fish, but the caller must call setTimeout on
// thier own
BrowserFish.prototype.runfish = function () {

    // create the fish when you create the object
    if ( document.getElementById && document.createElement ) {
        //var fishLeft = dom.createOrGetElement("div", this.getId(), document.body)
        var fishLeft = this.get( "#" + this.getId() ).get( 0 );
        if ( !fishLeft ) {
            // fish does not exist, so create fish,
            fishLeft = document.createElement( "div" );
            fishLeft.id = this.getId();
            fishLeft.style.position = "absolute";
            fishLeft.style.visibility = "visible";
            fishLeft.style.zIndex = FISH_IMAGE_ZINDEX;
            // now append to the body
            var docBody = document.getElementsByTagName( "body" );
            docBody[ 0 ].appendChild( fishLeft );
        }
        fishLeft.innerHTML = SWIMMING_FISH_IMAGE;

        // save the old direction
        var initdirection = this.lrDirection;

        // no fish return
        if ( !this.getFish() ) {
            return false;
        }

        this.setPosition();
        this.runningfish = true;

        if ( initdirection === this.lrDirection ) {
            this.showFish();
        }
        return true;
    }
    return false;
};

BrowserFish.prototype.startfish = function () {

    // get a reference to this object
    var swimfishObj = this;

    // now make a function poiter
    var swimfn = function () {
        swimfishObj.runfish();
    };

    // now call timeout function.  this works
    this.runtimerid = window.setInterval( swimfn, SWIMMING_FISH_TIMEOUT );
};

export default BrowserFish;
