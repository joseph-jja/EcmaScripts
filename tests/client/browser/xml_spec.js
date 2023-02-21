import * as xml from "client/browser/xml";

describe( "tests on web xml object", function () {

    const xmlString = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0">' +
        '<channel>' +
        '<title>XML Test Doc</title>' +
        '<link>http://home.earthlink.net/~joseph-ja/fish_log.xml</link>' +
        '<description>Stuff goes here.</description>' +
        '<language>en-us</language>' +
        '<managingEditor>me@avoidingspam.com</managingEditor>' +
        '<webMaster>me@avoidingspam.com</webMaster>' +
        '<lastBuildDate>Tue, 10 Jun 2008 04:09:30 GMT</lastBuildDate>' +
        '<generator>goooo</generator>' +
        '<item>' +
        '<title>Basic test item</title>' +
        '<description>Stuff goes here.</description>' +
        '<guid isPermaLink="false">{15D90C2B-CC11-5D9-0C2B-0C2B-C115D90C2B}</guid>' +
        '<pubDate>Sat Jul 29 2017 16:39:46 GMT-0700 (PDT)</pubDate>' +
        '</item>' +
        '</channel></rss>';

    it( "getAsXMLDocument test", function () {
        const doc = xml.getAsXMLDocument( xmlString );
        expect( doc.getElementsByTagName( 'item' ).length ).toEqual( 1 );
    } );

    it( "xml2json test", function () {
        const doc = xml.getAsXMLDocument( xmlString );
        const jsonData = xml.xml2json( doc );
        expect( jsonData.rss.channel.title[ '#text' ] ).toEqual( 'XML Test Doc' );
    } );

    it( "simpleRSSToJSON test", function () {
        const doc = xml.getAsXMLDocument( xmlString );
        const rssJSON = xml.simpleRSSToJSON( doc );
        expect( rssJSON.rss.channel.title.text ).toEqual( 'XML Test Doc' );
    } );

    it( "jsonToXML test", function () {

        const doc = xml.getAsXMLDocument( xmlString );
        const jsonData = xml.xml2json( doc );
        const _nowXML = xml.jsonToXML( jsonData );
        expect( doc.getElementsByTagName( 'item' ).length ).toEqual( 1 );
    } );
    /*
      it( "transformXML test", function () {
          expect( xml.sessionEnabled ).toEqual( true )
      } );  */
} );
