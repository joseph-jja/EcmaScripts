import * as typeCheck from 'commonUtils/typeCheck';
import css from 'client/dom/CSS';
import events from 'client/dom/events';
import * as storage from 'client/utils/webStorage';
import * as metrics from 'client/utils/metrics';
import * as selector from 'client/DOM/selector';

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
if ( currentpage == "" ) {
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

    function addMetrics() {
        var key, prop, mix = [],
            i, len, data = "",
            store, sdata, render, xtitle;

        key = getCurrentKey();
        xtitle = document.title;

        prop = metrics();

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
                    xjson, xitem, y, xdlen, element, ytitle;
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
    //	if ( typeof WebBrowser.getMetrics !== 'undefined' ) {
    //		WebBrowser.getMetrics(SITE.addMetrics);
    //	}
}


//new location thig for select items
function new_location() {
    var optionsindex = document.forms[ 0 ].altSubject.selectedIndex;
    var location = allLinks[ optionsindex - 1 ][ 0 ];
}

//not used
function print_menu( menuArray ) {
    var i, menu = "",
        mlen;
    mlen = menuArray.length;
    for ( i = 0; i < mlen; i++ ) {
        var type = typeof menuArray[ i ][ 0 ];
        if ( type.toLowerCase() != "object" ) {
            if ( currentpage != menuArray[ i ][ 0 ] ) {
                menu += '<a href="' + menuArray[ i ][ 0 ] + urlpadding + '" title="' + menuArray[ i ][ 2 ] + '">' + menuArray[ i ][ 1 ] + '</a>';
            } else {
                menu += '<div id="url-menu-active">' + menuArray[ i ][ 1 ] + '</div>';
            }
        }
    }
    return menu;
}

function changeStyles( querystring ) {
    var links = document.getElementsByTagName( "link" );
    var llen = links.length;
    for ( var i = 0; i < llen; i++ ) {
        var xi = links[ i ];
        var xh = xi.href;
        var csxhidx = xh.indexOf( "classic_style.css" );
        var tdxhidx = xh.indexOf( "dark_style.css" );
        if ( csxhidx != -1 ) {
            xi.href = xh.substring( 0, csxhidx ) + "dark_style.css";
            break;
        } else if ( tdxhidx != -1 ) {
            xi.href = xh.substring( 0, tdxhidx ) + "classic_style.css";
            break;
        }
    }
}
//changeStyles(urlpadding);

function basic_menu() {
    var nav = document.getElementById( "nav_bar" );
    if ( nav ) {
        nav.innerHTML = print_menu( allLinks );
    }
}

//extended menu 
function extended_menu() {
    var i, menu = "",
        mlen,
        subdirpage = splitstr[ splitstr.length - 2 ] + "/" + currentpage;
    mlen = allLinks.length;
    for ( i = 0; i < mlen; i++ ) {
        if ( subdirpage != allLinks[ i ][ 0 ] ) {
            menu += '<a href="../' + allLinks[ i ][ 0 ] + urlpadding + '" title="' + allLinks[ i ][ 2 ] + '">' + allLinks[ i ][ 1 ] + '</a>';
        } else {
            menu += '<div id="url-menu-active">' + allLinks[ i ][ 1 ] + '</div>';
        }
    }
    return menu;
}

//single select object for email form
function email_dropdown_select() {
    var i, data = "";
    data += '<b><select name="altSubject">';
    data += '<option value=""></option>';
    for ( i = 0; i < allLinks.length; i++ ) {
        data += '<option value="' + allLinks[ i ][ 0 ] + urlpadding + '">' + allLinks[ i ][ 1 ] + '</option>';
    }
    data += '</select></b>';
    data += '<b><input type="button" value="Go" onClick="new_location()"></b>';
    return data;
}


function showHideMainMenu( divobjID, liobjID ) {
    var i, menus, lis, objID, liobj,
        oldDIVStyle, oldLIStyle;
    menus = document.getElementsByTagName( 'ul' );
    lis = document.getElementsByTagName( 'li' );

    objID = document.getElementById( divobjID );
    liobj = document.getElementById( liobjID );

    if ( ( objID == null ) || ( liobj == null ) ) {
        return;
    }

    oldDIVStyle = objID.style.display;
    oldLIStyle = liobj.style.display;

    for ( i = 0; i < menus.length; i++ ) {
        if ( menus[ i ].id.substring( 0, 5 ) == divobjID.substring( 0, 5 ) ) {
            menus[ i ].style.display = 'none';
        }
    }
    for ( i = 0; i < lis.length; i++ ) {
        if ( lis[ i ].id.substring( 0, 3 ) == liobjID.substring( 0, 3 ) ) {
            css.replaceClass( lis[ i ], "expanded", "collapsed" );
        }
    }

    objID.style.display = oldDIVStyle;
    liobj.style.display = oldLIStyle;

    if ( objID.style.display == 'block' ) {
        objID.style.display = 'none';
        css.replaceClass( liobj, "expanded", "collapsed" );
    } else if ( objID.style.display == 'none' ) {
        objID.style.display = 'block';
        css.replaceClass( liobj, "collapsed", "expanded" );
    } else {
        objID.style.display = 'block';
        css.replaceClass( liobj, "expanded", "collapsed" );
    }
}

function expandUL( objName, hrefObj ) {
    var i, divs, dObj, hrefs;
    divs = document.getElementsByTagName( "ul" );
    for ( i = 0; i < divs.length; i++ ) {
        if ( css.hasClass( divs[ i ], "tree_child_hidden" ) ) {
            divs[ i ].style.display = "none";
        }
    }

    dObj = document.getElementById( objName );
    if ( dObj ) {
        if ( dObj.style.display == "block" ) {
            dObj.style.display = "none";
        } else {
            dObj.style.display = "block";
        }
    }

    hrefs = selector( "span.toplevel" );
    for ( i = 0; i < hrefs.length; i++ ) {
        css.replaceClass( hrefs.get( i ), "expanded", "collapsed" );
    }
    if ( hrefObj ) {
        css.addClass( hrefObj, "expanded" );
    }
}

function showTextDiv( selected ) {
    var i, obj, dataobj, hrefs;
    obj = document.getElementById( selected );
    dataobj = document.getElementById( "adata" );
    if ( obj ) {
        dataobj.innerHTML = obj.innerHTML;
    }

    hrefs = document.getElementsByName( "tabs" );
    if ( hrefs ) {
        for ( i = 0; i < hrefs.length; i++ ) {
            css.replaceClass( hrefs[ i ], "selected_tab", "tablike" );
        }
        if ( selected + 1 < hrefs.length ) {
            css.replaceClass( hrefs[ i ], "tablike", "selected_tab" );
        }
    }

}

function makeIcon() {
    var icon, dom = WebBrowser.dom;
    icon = dom.createElement( "span",
        document.body, {
            "id": "nav_menu_mini"
        } );
    icon.innerHTML = "Navigation";
    events.addEvent( icon, 'click', showMenu );
}

function showMenu() {
    var dom = WebBrowser.dom,
        css = WebBrowser.css,
        nav = document.getElementById( "nav_bar" );
    if ( nav.style.display === 'none' ) {
        nav.style.display = 'block';
        css.addClass( nav, "moved-menu" );
    } else {
        nav.style.display = 'none';
        css.removeClass( nav, "moved-menu" );
    }
}

//WebBrowser.events.addEvent(window, 'load', makeIcon);
