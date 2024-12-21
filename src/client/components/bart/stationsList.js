import * as API from '/js/client/components/bart/api';
import * as webStorage from '/js/client/browser/webStorage';

const ONE_WEEK = 604800000; // 1000*60*60*24*7

const STORAGE_KEY = 'SimpleBARTAPIStationList',
    STORAGE_TIME_KEY = 'SimpleBARTAPIStationListTime';

export default async function stationList( asMap = false ) {

    let stations = [];

    if ( webStorage.localEnabled ) {
        const updateDate = webStorage.localStore.getItem( STORAGE_TIME_KEY );
        const staleDate = new Date().getTime() - ONE_WEEK;
        if ( updateDate && updateDate > staleDate ) {
            const storageData = webStorage.localStore.getItem( STORAGE_KEY );
            if ( storageData ) {
                stations = JSON.parse( storageData );
            }
        }
    }

    if ( !stations || stations.length === 0 ) {
        stations = await API.getStations();
        if ( webStorage.localEnabled ) {
            webStorage.localStore.setItem( STORAGE_TIME_KEY, new Date().getTime() );
        }
    }

    if ( !stations || stations.length === 0 ) {
        throw ( 'Could not get stations!' );
    }

    if ( webStorage.localEnabled ) {
        webStorage.localStore.setItem( STORAGE_KEY, JSON.stringify( stations ) );
    }

    if ( asMap ) {
        const stationMap = {};
        const stations = await stationList();
        stations.forEach( item => {
            stationMap[ item.abbr ] = item.name;
        } );
        return stationMap;
    }

    return stations;
}
