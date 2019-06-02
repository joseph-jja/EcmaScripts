import stationsList from 'client/components/bart/stationsList';

const pleaseSelect = '<option>Please Select A Station</option>';

function leftPadd( i ) {
    return ( i < 10 ? `0${i}` : `${i}` );
}

export default async function TripPlanner() {

    const stations = await stationsList();

    const items = stations.map( station => {

        return `<option value="${station.abbr}">${station.name}</option>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    const fromStation = `<select id="trip-source">${pleaseSelect}${items}</select>`,
        toStation = `<select id="trip-destination">${pleaseSelect}${items}</select>`;

    // need depart or arriving button
    const now = new Date();
    let hours = now.getHours(),
        ampm = 'AM';
    if ( hours === 0 ) {
        hours = 12;
    } else if ( hours > 12 ) {
        hours -= 12;
        ampm = 'PM';
    }

    const tripTime = 'now'; //leftPadd( hours ) + ':' + leftPadd( now.getMinutes() ) + ' ' + ampm;

    const tripTimeInp = `<input type="hidden" value="${tripTime}" name="trip-time" id="trip-time">`;

    return `Starting Station: ${fromStation}<br><br>Destination Station: ${toStation}<br>${tripTimeInp}<br><div id="trip-results"></div>`;
}
