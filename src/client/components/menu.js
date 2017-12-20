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
    [ "index.html", "The Main Page" ],
    //["about_me.html", "About Me", "A page about me"],
    [ "tropical_fish.html", "My Tropical Fish Information Page" ],
    [ "fish_pictures/index.html", "My tropical Fish Pictures Page" ],
    [ "fish_log.html", "An attempt at a fish keeping log" ],
    //                  ["computers.html", "Computers", "Some computer stuff"],
    [ "programs.html", "Some programs that I have written" ],
    [ "programming_languages.html", "My little writeup on how programming languages are similar" ],
    //   ["FreeBSD_cdrom.html", "FreeBSD CDROM", "My HOWTO on creating a FreeBSD live CDROM"], 
    [ "resume_default.html", "An ActiveX / Mozilla XSLTProcessor / AJAX version of my resume" ],
    //["resume_bstg.html", "Alternate AJAX Resume", "An ActiveX / Mozilla XSLTProcessor / AJAX version of my resume"], 
    [ "email_form.html", "How you can email me" ],
    [ "helloworld.html", "Cool-ish :P Hello World" ],
    [ "canvas_test.html", "If your browser supports the Canvas Object" ],
    //["javascript:changeStyles(];", "Change Style", "Change CSS Files"], 
    [ "my_links.html", "Some of the off site links related to this site." ]
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


//new location thing for select items
function changeLocation() {
    let selectOption = document.getElementById( 'url-navigation' ),
        optionsindex = selectOption.selectedIndex,
        loc = selectOption[ optionsindex ].value;
    document.location = loc;
}

function render( menuArray ) {
    let i, menu = '<div class="url-wrapper"><select id="url-navigation">',
        mlen;
    mlen = menuArray.length;
    for ( i = 0; i < mlen; i++ ) {
        let type = typeof menuArray[ i ][ 0 ];
        if ( type.toLowerCase() !== "object" ) {
            if ( currentpage !== menuArray[ i ][ 0 ] ) {
                menu += `<option value="${menuArray[ i ][ 0 ]}${urlpadding}">${menuArray[ i ][ 1 ]}</option>`;
            } else {
                menu += `<option selected>${menuArray[ i ][ 1 ]}</option>`;
            }
        }
    }
    menu += '</select></div>';
    return menu;
}

export function basicMenu() {
    var nav = document.getElementById( "nav_bar" );
    if ( nav ) {
        nav.innerHTML = render( allLinks );
        let selectObj = document.getElementById( 'url-navigation' );
        if ( selectObj ) {
            events.addEvent( selectObj, 'change', changeLocation );
        }
    }
}

//extended menu 
export function extendedMenu() {
    var i, menu = '<div class="url-wrapper"><select id="url-navigation">',
        mlen,
        subdirpage = splitstr[ splitstr.length - 2 ] + "/" + currentpage;
    mlen = allLinks.length;
    for ( i = 0; i < mlen; i++ ) {
        if ( subdirpage !== allLinks[ i ][ 0 ] ) {
            menu += `<option value="../${allLinks[ i ][ 0 ]}${urlpadding}">${allLinks[ i ][ 1 ]}</option>`;
        } else {
            menu += `<option value="../${allLinks[ i ][ 0 ]}${urlpadding}" selected>${allLinks[ i ][ 1 ]}</option>`;
        }
    }
    menu += '</select></div>';

    let nav = document.getElementById( "nav_bar" );
    if ( nav ) {
        nav.innerHTML = menu;
        let selectObj = document.getElementById( 'url-navigation' );
        if ( selectObj ) {
            events.addEvent( selectObj, 'change', changeLocation );
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
