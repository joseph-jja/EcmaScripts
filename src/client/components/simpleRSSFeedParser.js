import selector from '/js/client/dom/selector';

import * as xml from '/js/client/browser/xml';

function pager( cnode ) {

    // assumes at least one page
    var pages = document.getElementById( "page_1" );
    var i = 2,
        anchor;
    while ( pages ) {
        pages.className = "rsshidden";
        anchor = document.getElementById( "a" + pages.id );
        if ( anchor ) {
            anchor.className = "rsspager";
        }
        pages = document.getElementById( "page_" + i );
        i += 1;
    }

    var page = document.getElementById( cnode );
    if ( page ) {
        page.className = "rssvisible";
        anchor = document.getElementById( "a" + page.id );
        if ( anchor ) {
            anchor.className = "rsspager_sel";
        }
    }
    //adjustFooter();
}

// not idea, will fix later
// FIXME
window.pager = pager;

function buildAnchors( page ) {

    var pID = page.split( "_" );
    //return "<li class=\"toplevel collapsed\" id=\"a" + page + "\" onclick=\"pager('" + page + "');\">" + pID[1] + "</li>";
    return "<a class=\"rsspager\" id=\"a" + page + "\" href=\"javascript: pager('" + page + "');\">" + pID[ 1 ] + "</a>";
}

// simple function to convert a simple rss feed into a ul li list
export default function simpleRSSFeedParser( divid, xmlDocument ) {

    var json, defaultPageBreak = 5,
        j = 2,
        items,
        resultHeader, result, pages, ct = 1,
        tlen = 0,
        t,
        fishlog, channel;
    json = xml.simpleRSSToJSON( xmlDocument );

    channel = json.rss.channel;
    items = channel.item;
    resultHeader = '<div class="rss_title">' + channel.title.text;
    result = '<ul id="page_1">';
    pages = '&nbsp;' + buildAnchors( "page_1" );
    for ( t in items ) {
        tlen += 1;
    } // calculate length
    for ( t in items ) {
        result += '<li>' + items[ t ].title.text + '<br>' + items[ t ].description.text + '</li>';
        if ( ( +ct ) % ( +defaultPageBreak ) === 0 && ( ct < tlen - 1 ) ) {
            result += '</ul><ul id="page_' + j + '" class="rsshidden">';
            pages += "&nbsp;" + buildAnchors( "page_" + j );
            j += 1;
        }
        ct += 1;
    }
    resultHeader += '<br>' + pages + '</div>';
    result += '</ul>';
    fishlog = selector( "#" + divid ).get( 0 );
    fishlog.innerHTML = resultHeader + result;
}
