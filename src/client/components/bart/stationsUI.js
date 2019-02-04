import * as API from 'client/components/bart/api';
import * as Storage from 'client/browser/webStorage';

const STORAGE_KEY = 'SimpleBARTAPIStationList';

export default async function StationList() {

    let stations = [];

    if ( Storage.localEnabled ) {
        stations = Storage.localStore.getItem( 'STORAGE_KEY' );
    }

    if ( !stations ) {
        stations = await API.getStations();
    }

    if ( !stations || stations.length === 0 ) {
        throw ( 'Could not get stations!' );
    }

    if ( Storage.localEnabled ) {
        stations = Storage.localStore.setItem( STORAGE_KEY, stations );
    }

    const items = stations.map( station => {

        return `<div data-abbr="${station.abbr}">${station.name}</div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="bart-stations-list">${items}</div>`;

}
