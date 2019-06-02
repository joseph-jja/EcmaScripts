import * as API from 'client/components/bart/api';
import * as webStorage from 'client/browser/webStorage';

const ONE_WEEK = 604800;

const STORAGE_KEY = 'SimpleBARTAPIStationList',
    STORAGE_TIME_KEY = 'SimpleBARTAPIStationListTime';

export default async function StationList() {

    let stations = [];

    if ( webStorage.localEnabled ) {
        stations = webStorage.localStore.getItem( 'STORAGE_KEY' );
        const updateDate = webStorage.localStore.getItem( 'STORAGE_TIME_KEY' );
        const staleDate = new Date().getTime() - ONE_WEEK;
        if ( !updateDate || updateDate < staleDate ) {
            stations = [];
        }
    }

    if ( !stations || stations.length === 0 ) {
        stations = await API.getStations();
        if ( webStorage.localEnabled ) {
            webStorage.localStore.setItem( 'STORAGE_TIME_KEY', new Date().getTime() );
        }
    }

    if ( !stations || stations.length === 0 ) {
        throw ( 'Could not get stations!' );
    }

    if ( webStorage.localEnabled ) {
        webStorage.localStore.setItem( STORAGE_KEY, JSON.stringify( stations ) );
    }

    return stations;
}
