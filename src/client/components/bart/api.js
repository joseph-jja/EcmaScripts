import fetcher from 'client/components/net/fetcher';
import * as Constants from 'client/components/bart/constants';

async function getJSON( url ) {
    const result = await fetcher( url );
    return JSON.parse( result );
}

async function getStations() {

    const stations = await getJSON( Constants.GET_STATION_LIST_API );

    return stations.root.stations.station.map( station => {
        return {
            'name': station.name,
            'abbr': station.abbr
        };
    } );
}

async function getAlerts() {

    const alerts = await getJSON( Constants.ALERTS_API );

    const dateTime = `${alerts.root.date} ${alerts.root.time}`;

    return alerts.root.bsa.map( alert => {
        return {
            'dateTime': dateTime,
            'station': alert.station,
            'description': alert.description
        };
    } );
}

async function getTrainsByStation( stationAbbr ) {

    const trainList = await getJSON( `${Constants.GET_TRAIN_LIST_API}${stationAbbr}` );

    const dateTime = `${trainList.root.date} ${trainList.root.time}`;

    // not an optimized function, TODO optimize?
    return trainList.root.station[ 0 ].etd.map( train => {
        const est = train.estimate.map( estimates => {
            return {
                'minutes': estimates.minutes,
                'platform': estimates.platform,
                'direction': estimates.direction,
                'delay': estimates.delay,
            };
        } ).reduce( ( acc, item ) => {
            return {
                'minutes': `${acc.minutes}, ${item.minutes}`,
                'platform': `${acc.platform}, ${item.platform}`,
                'direction': `${acc.direction}, ${item.direction}`,
                'delay': `${acc.delay}, ${item.delay}`,
            };
        } );

        return {
            'destination': train.destination,
            'abbreviation': train.abbreviation,
            'dateTime': dateTime,
            'estimates': est,
        };
    } );
}

function buildTripPlanUrl( origin, dest, planTime ) {
    return `${origin}${Constants.SCHEDULE_DEST}${dest}${Constants.SCHEDULE_DATE}${planTime}`;
}

async function getDepartTrips( String origin, String dest, String planTime ) {

    const departingSchedule = await getJSON( `${Constants.SCHEDULE_DEPART}${buildTripPlanUrl(origin, dest, planTime)}` );

}

async function getArrivalTrips( String origin, String dest, String planTime ) {

    const arrivingSchedule = await getJSON( `${Constants.SCHEDULE_ARRIVE}${buildTripPlanUrl(origin, dest, planTime)}` );
}

export {
    getStations,
    getTrainsByStation,
    getDepartTrips,
    getArrivalTrips,
    getAlerts
}
