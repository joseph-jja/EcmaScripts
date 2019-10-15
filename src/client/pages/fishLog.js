import * as events from 'client/dom/events';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';
import * as ajax from 'client/net/ajax';
import simpleRSSFeedParser from 'client/components/simpleRSSFeedParser';
import * as xml from 'client/browser/xml';

events.addOnLoad((onloadFN) => {
    menu.basicMenu();
    footer('footer');


    // create a callback function
    // our object only supports async mode
    // this method has been tested in IE and firefox and konqueror
    // and so because safari uses the KHTML safari should work also
    function xmltext() {
        if (this.xmlhttp.readyState === 4) {
            var xmlDOC = xml.getAsXMLDocument(this.xmlhttp.responseText);
            simpleRSSFeedParser('fishlog', xmlDOC);
        }
    }

    // since not all browser support XSLT tranforms from scripting
    // we create an ajax object that does some funky things to work around this
    ajax.get(xmltext, "fish_log.xml", null);
});