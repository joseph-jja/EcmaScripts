import "@babel/runtime/regenerator"
import selector from 'client/dom/selector';
import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';

// components
import StationList from 'client/components/bart/stationsUI';
import TrainList from 'client/components/bart/trainsUI';
import Alerts from 'client/components/bart/alertUI';
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

async function doOnLoadStuff() {

    const stationData = await StationList();

    const content = document.getElementById( 'content' );

    // get dom node to put this data in and inner html it
    content.innerHTML = stationData;

    // the add event listener
    events.addEvent( content, 'click', ( e ) => {
        const tgt = events.getTarget( e );
    } );

}

events.addOnLoad( doOnLoadStuff );
