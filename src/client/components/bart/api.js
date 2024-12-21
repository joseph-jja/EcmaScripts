import fetcher from '/js/client/net/fetcher';
import * as Constants from '/js/client/components/bart/constants';

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
    if ( !trainList.root.station[ 0 ].etd ) {
        return [];
    }

    return trainList.root.station[ 0 ].etd.map( train => {
        const est = train.estimate.map( estimates => {
            return {
                'minutes': estimates.minutes,
                'platform': estimates.platform,
                'direction': estimates.direction,
                'delay': estimates.delay
            };
        } ).reduce( ( acc, item ) => {
            return {
                'minutes': `${acc.minutes}, ${item.minutes}`,
                'platform': `${acc.platform}, ${item.platform}`,
                'direction': item.direction,
                'delay': `${acc.delay}, ${item.delay}`
            };
        } );

        return {
            'destination': train.destination,
            'abbreviation': train.abbreviation,
            'dateTime': dateTime,
            'minutes': est.minutes,
            'platform': est.platform,
            'direction': est.direction,
            'delay': est.delay
        };
    } );
}

function buildTripPlanUrl( origin, dest, planTime ) {
    return `${origin}${Constants.SCHEDULE_DEST}${dest}${Constants.SCHEDULE_DATE}${planTime}`;
}

async function getDepartTrips( origin, dest, planTime ) {

    const departingSchedule = await getJSON( `${Constants.SCHEDULE_DEPART}${buildTripPlanUrl(origin, dest, planTime)}` );
    return departingSchedule;
}

async function getArrivalTrips( origin, dest, planTime ) {

    const arrivingSchedule = await getJSON( `${Constants.SCHEDULE_ARRIVE}${buildTripPlanUrl(origin, dest, planTime)}` );
    return arrivingSchedule;
}

async function getFares( origin, dest ) {

    const fares = await getJSON( `${Constants.FAIR_API}${origin}${Constants.FAIR_DEST}${dest}` );
    return fares;
}

export {
    getStations,
    getTrainsByStation,
    getDepartTrips,
    getArrivalTrips,
    getAlerts,
    getFares
};
