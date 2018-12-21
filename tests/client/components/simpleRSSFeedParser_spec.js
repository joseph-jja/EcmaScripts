import SimpleRSS from 'client/components/simpleRSSFeedParser';
import * as xml from "client/browser/xml";

describe( 'testing simpleRSSFeedParser', () => {

    const xmlString = `<?xml version="1.0" encoding="utf-8"?><rss version="2.0">
<channel>
<title>My Fish Log (flog)</title>
<link>http://home.earthlink.net/~joseph-ja/fish_log.xml</link>
<description>This is my sort of fish log of flog. Not quite a blog, but it is the start of some type of log.</description>
<language>en-us</language>
<managingEditor>me@avoidingspam.com</managingEditor>
<webMaster>me@avoidingspam.com</webMaster>
<lastBuildDate>Tue, 10 Jun 2008 04:09:30 GMT</lastBuildDate>
<generator>godura</generator>

<item>
    <title>New fish and fish losses</title>
<description>Over the last few months I got some yoyo loaches and out of the 6 I got 2 survived. I lost all but one of my cherry barbs.  My white clouds are doing find in my 10 gallon tank. I still have some danio kyathit and pareutropius buffei in my 20 gallon tank.</description>
<guid isPermaLink="false">{15D90C2B-CC11-5D9-0C2B-0C2B-C115D90C2B}</guid>
<pubDate>Sat Jul 29 2017 16:39:46 GMT-0700 (PDT)</pubDate>
</item>

    <item>
    <title>Happy birthday-ish fish </title>
<description>Tangerine and Shadow, my goldfish are at least 6 years old as of July 1, 2017.  Yes goldfish can live that long and even longer.  I am hoping to see them live longer.    </description>
<guid isPermaLink="false">{ce86790d-d9d3-a28-2de4-b12d1464748}</guid>
<pubDate>Sat Jul 29 2017 15:42:35 GMT-0700 (PDT)</pubDate>
</item>
<item>
<title>Christmas updates, December 2016.</title>
<description>Midnight was a black moor now deceased.  Belle was an orange,white and slightly red female Oranda that I had to give away on 1/5/2013.  Pepper was a malke calico telescope with breeding tuberculosis.  Pepper passed away early in 2016. Paprika is new calico telescope obtained on 11 / 2015.</description>
<guid isPermaLink="false">{ceff318d-d9d3-a28-2de4-b12d1464748}</guid>
<pubDate>Sun, 25 Dec 2016 04:09:30 GMT</pubDate>
</item>

<item>
<title>More fish updates, June 2012.</title>
<description>I have separated the 2 sick fish.  I have 2 male guppies and 2 female guppies and neither is breeding.  My white clouds are not breeding either.  My plants however are growing.  My Amazon swords have both sent out 2 runners that are developing into new plants.  I guess I need to start selling plants again at the local aquarium society.  I wish I knew what to do to make all my fish start doing better.  Maybe I need swords in all my tanks?  Problem with swords is that they get huge.  </description>
<guid isPermaLink="false">{ceff318d-d9d3-a28-2de4-b12d1234a4ff}</guid>
<pubDate>Fri, 1 Ju1 2012 04:09:30 GMT</pubDate>
</item>

<item>
<title>Goldfish updates.</title>
<description>Turns out Tangerine is a girl and Shadow is a boy.  So they laid eggs, in December, and I rescued a few. They did this again in March and April.  I have saved a few.  Out of the first batch I raised one.  Out of the second I raised 2 and out of the third, I raised 3.  The oldest of the fry is now upside down.  Also one of the second batch of fry is swimming sideways.  Not looking good for either of them.   </description>
<guid isPermaLink="false">{ceff318d-d9d3-a28-2de4-b12d1234a4ff}</guid>
<pubDate>Fri, 1 Ju1 2012 04:09:30 GMT</pubDate>
</item>

<item>
<title>Got new Goldfish, October 2011.</title>
<description>Got new goldfish.  One black moor about 2", one calico telescope about 1.5", and one oranda about 1.5". Just put them in the 20 and moved the male guppies out for now.  Will quarantine them for a week and then move them to the 40 gallon tank. </description>
<guid isPermaLink="false">{ceff318d-d9d3-a28-2de4-b12d1234a4ff}</guid>
<pubDate>Fri, 1 Ju1 2012 04:09:30 GMT</pubDate>
</item>

<item>
<title>Got new Goldfish, July 2011.</title>
<description>Got new goldfish.  One black moor about 1.5" and one orange telescope about 2.5".  They have been added into the 40 gallon tank.  Goldfish are supposed to be good luck.</description>
<guid isPermaLink="false">{ceff318d-d9d3-a28-2de4-b12d1234a4ff}</guid>
<pubDate>Sun, 17 July 2011 04:09:30 GMT</pubDate>
</item>

<item>
<title>More guppy babies, July 2011.</title>
<description>My guppies are at 3 brood.  I have separated two females into a 2.5 gallon tank.  The fish are going to be breed with a nice blue male. I will be separating 2 more females into another 2.5 gallon tank to breed with a red male.  Goal is to breed blue males and red males with blue females and red females, but will start with blond bodied females.</description>
<guid isPermaLink="false">{ceff318d-d9d3-a28-2de4-bbad1234a4ff}</guid>
<pubDate>Sun, 17 July 2011 04:09:30 GMT</pubDate>
</item>

<item>
<title>New catfish, July 2011.</title>
<description>Got 4 new bushy nosed plecos.  They are all albinos and about 2-2.5" long.  Added to my 20 gallon tank.</description>
<guid isPermaLink="false">{ceff318d-d9d3-a28-2de4-bbad1abfa4ff}</guid>
<pubDate>Fri, 8 July 2011 04:09:30 GMT</pubDate>
</item>

</channel>
</rss>`;

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-simplerssparser';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'simpleRSSFeedParser test', () => {
        expect( SimpleRSS ).toBeDefined();
    } );

    it( 'simpleRSSFeedParser test', () => {

        const doc = xml.getAsXMLDocument( xmlString );
        SimpleRSS( parent.id, doc );
        expect( parent.innerHTML.length ).toBeGreaterThan( 0 );
    } );
} );
