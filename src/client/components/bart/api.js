import fetcher from 'client/components/net/fetcher';
import * as Constants from 'client/components/bart/constants';

async function getStations() {

    const stations = await fetcher( GET_STATION_LIST_API );

    return stations.root.stations.station.map( station => {
        return {
            'name': station.name,
            'abbr': station.abbr
        };
    } );
}

async function getAlerts() {

    const alerts = await fetcher( ALERTS_API );

    const dateTime = `${alerts.root.date} ${alerts.root.time}`;

    return alerts.root.bsa.map( alert => {
        return {
            'dateTime': dateTime,
            'station': alert.station,
            'description': alert.description
        };
    } );
}


export {
    getStations
}
