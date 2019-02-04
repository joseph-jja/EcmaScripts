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
    
  // get dom node to put this data in and inner html it
  // the add event listener
    
}

events.addOnLoad( doOnLoadStuff );
