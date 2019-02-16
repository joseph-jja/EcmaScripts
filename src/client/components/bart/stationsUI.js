import * as API from 'client/components/bart/api';
import * as Storage from 'client/browser/webStorage';

const ONE_WEEK = 604800;

const STORAGE_KEY = 'SimpleBARTAPIStationList', 
    STORAGE_TIME_KEY = 'SimpleBARTAPIStationListTime';

export default async function StationList() {

    let stations = [];

    if ( Storage.localEnabled ) {
        stations = Storage.localStore.getItem( 'STORAGE_KEY' );
        const updateDate = Storage.localStore.getItem( 'STORAGE_TIME_KEY' );
        const staleDate = new Date().getTime() - ONE_WEEK;
        if ( !updateDate || updateDate < staleDate ) {
             stations = [];
        }
    }

    if ( !stations || stations.length === 0 ) {
        stations = await API.getStations();
        if ( Storage.localEnabled ) {
            Storage.localStore.setItem( 'STORAGE_TIME_KEY', new Date().getTime() );
        }
    }

    if ( !stations || stations.length === 0 ) {
        throw ( 'Could not get stations!' );
    }

    if ( Storage.localEnabled ) {
        Storage.localStore.setItem( STORAGE_KEY, JSON.stringify( stations ) );
    }

    const items = stations.map( station => {

        return `<div data-abbr="${station.abbr}">${station.name}</div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="bart-stations-list">${items}</div>`;

}
