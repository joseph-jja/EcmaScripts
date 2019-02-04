import fetcher from 'client/components/net/fetcher';
import * as Constants from 'client/components/bart/constants';

async function getStations() {

    const stations = await fetcher( GET_STATION_LIST_API );

    return root.stations.station.map( station => {
        return {
            'name': station.name,
            'abbr': station.abbr
        };
    } );
}


export {
    getStations
}
