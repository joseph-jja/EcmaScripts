import * as typeCheck from 'utils/typeCheck';
import * as css from 'client/dom/CSS';
import * as dom from 'client/dom/DOM';
import * as events from 'client/dom/events';
import * as storage from 'client/browser/webStorage';
import * as metrics from 'client/browser/performance';
import selector from 'client/dom/selector';

//try to declare global variables 
var loc = document.location.href,
    splitstr = loc.split( '/' ),
    commandline = loc.split( "?" ),
    urlpadding = "",
    currentpage,
    allLinks;

if ( typeCheck.isArray( commandline ) && commandline.length > 1 ) {
    // here we can parse the command line options
    // and maybe set the style sheet
    urlpadding = "?" + commandline[ 1 ];
}

currentpage = splitstr[ splitstr.length - 1 ];
if ( currentpage === "" ) {
    currentpage = "index.html";
}

allLinks = [
    [ "index.html", "Main Page", "The index page" ],
    //["about_me.html", "About Me", "A page about me"],
    [ "tropical_fish.html", "Tropical Fish", "My tropical fish information page" ],
    [ "fish_pictures/index.html", "Fish Pictures", "My tropical fish picture page" ],
    [ "fish_log.html", "Fish Log", "An attempt at a fish keeping log" ],
    //                  ["computers.html", "Computers", "Some computer stuff"],
    [ "programs.html", "Software", "Some programs that I have written" ],
    [ "programming_languages.html", "Programming", "My little writeup on how programming languages are similar" ],
    //   ["FreeBSD_cdrom.html", "FreeBSD CDROM", "My HOWTO on creating a FreeBSD live CDROM"], 
    [ "resume_default.html", "Resume", "An ActiveX / Mozilla XSLTProcessor / AJAX version of my resume" ],
    //["resume_bstg.html", "Alternate AJAX Resume", "An ActiveX / Mozilla XSLTProcessor / AJAX version of my resume"], 
    [ "email_form.html", "Email Me", "How you can email me" ],
    [ "helloworld.html", "Hello World", "Cool Hello World" ],
    [ "canvas_test.html", "Canvas Test", "If your browser supports the Canvas Object" ],
    //["javascript:changeStyles(];", "Change Style", "Change CSS Files"], 
    [ "my_links.html", "Offsite Links", "Some of the off site links related to this site." ]
];

if ( storage.sessionEnabled &&
    JSON && JSON.stringify && JSON.parse ) {

    allLinks.push( [ "performance.html", "Metrics", "Performance Metrics Obtained About Your Visit To This Site." ] );

    function getCurrentKey() {
        var key, url, path;

        path = window.location.pathname;
        url = path.substring( path.lastIndexOf( "/" ) + 1 );
        if ( path.indexOf( "fish_pictures" ) ) {
            url += "_fish";
        }
        key = url.substring( 0, url.indexOf( "." ) );

        return key;
    };

    function addMetrics( optns ) {
        var key, prop, mix = [],
            i, len, data = "",
            store, sdata, render, xtitle;

        key = optns.key;
        xtitle = optns.title;

        prop = metrics.metrics;

        mix.push( {
            'name': "Dom Content Load Start",
            'value': prop[ 'domContentLoadStart' ]
        } );
        mix.push( {
            'name': "Dom Content Load Event Length",
            'value': prop[ 'domContentLoadTime' ]
        } );
        mix.push( {
            'name': "Dom OnLoad Start",
            'value': prop[ 'domLoadStart' ]
        } );
        mix.push( {
            'name': "Dom OnLoad Event Time",
            'value': prop[ 'domLoadTime' ]
        } );
        mix.push( {
            'name': "Your Network Latency",
            'value': prop[ 'networkLatency' ]
        } );
        mix.push( {
            'name': "Total Page Load Time",
            'value': prop[ 'pageLoadTime' ]
        } );

        len = mix.length;

        data = JSON.stringify( mix );

        store = storage.sessionStore;
        store.setItem( key, data );
        store.setItem( key + "TITLE", xtitle );

        if ( key === 'performance' ) {
            function render() {
                var x, xlen, xkey, xdata, xresult = "",
                    xjson, xitem, y, xdlen, element, ytitle,
                    store = storage.sessionStore;
                xlen = store.length;
                for ( x = 0; x < xlen; x += 1 ) {
                    xkey = store.key( x );
                    if ( xkey.indexOf( "TITLE" ) === -1 ) {
                        xdata = JSON.parse( store.getItem( xkey ) );
                        ytitle = store.getItem( xkey + "TITLE" );
                        xresult += "<table class=\"performance-data\"><tr><th colspan=\"2\">" + ytitle + "</th></tr>";
                        xdlen = xdata.length;
                        for ( y = 0; y < xdlen; y += 1 ) {
                            xresult += "<tr><td>" + xdata[ y ].name + "</td><td>" + xdata[ y ].value + "</td></tr>";
                        }
                        xresult += "</table>";
                    }
                }
                element = selector( "#container" ).get( 0 );
                if ( element ) {
                    element.innerHTML = xresult;
                }
            };
            render();
        }
    };
    if ( metrics.hasPerformanceMetrics && typeof metrics.getMetrics !== 'undefined' ) {
        metrics.getMetrics( addMetrics, {
            key: getCurrentKey(),
            title: document.title
        } );
    }
}


//new location thig for select items
function changeLocation() {
    var optionsindex = document.forms[ 0 ].altSubject.selectedIndex;
    var loc = allLinks[ optionsindex - 1 ][ 0 ];
}

function render( menuArray ) {
    var i, menu = "",
        mlen;
    mlen = menuArray.length;
    for ( i = 0; i < mlen; i++ ) {
        var type = typeof menuArray[ i ][ 0 ];
        if ( type.toLowerCase() !== "object" ) {
            if ( currentpage !== menuArray[ i ][ 0 ] ) {
                menu += '<a href="' + menuArray[ i ][ 0 ] + urlpadding + '" title="' + menuArray[ i ][ 2 ] + '">' + menuArray[ i ][ 1 ] + '</a>';
            } else {
                menu += '<div id="url-menu-active">' + menuArray[ i ][ 1 ] + '</div>';
            }
        }
    }
    return menu;
}

export function basicMenu() {
    var nav = document.getElementById( "nav_bar" );
    if ( nav ) {
        nav.innerHTML = render( allLinks );
    }
}

//extended menu 
export function extendedMenu() {
    var i, menu = "",
        mlen,
        subdirpage = splitstr[ splitstr.length - 2 ] + "/" + currentpage;
    mlen = allLinks.length;
    for ( i = 0; i < mlen; i++ ) {
        if ( subdirpage !== allLinks[ i ][ 0 ] ) {
            menu += '<a href="../' + allLinks[ i ][ 0 ] + urlpadding + '" title="' + allLinks[ i ][ 2 ] + '">' + allLinks[ i ][ 1 ] + '</a>';
        } else {
            menu += '<div id="url-menu-active">' + allLinks[ i ][ 1 ] + '</div>';
        }
    }
    return menu;
}

function showMenu() {
    var nav = document.getElementById( "nav_bar" );
    if ( nav.style.display === 'none' ) {
        nav.style.display = 'block';
        css.addClass( nav, "moved-menu" );
    } else {
        nav.style.display = 'none';
        css.removeClass( nav, "moved-menu" );
    }
}

export function makeIcon() {
    var icon;
    icon = dom.createElement( "span",
        document.body, {
            "id": "nav_menu_mini"
        } );
    icon.innerHTML = "Navigation";
    events.addEvent( icon, 'click', showMenu );
}
events.addOnLoad( makeIcon );
