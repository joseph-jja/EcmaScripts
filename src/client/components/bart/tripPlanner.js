import stationsList from '/js/client/components/bart/stationsList';

const pleaseSelect = '<option>Please Select A Station</option>';

export default async function tripPlanner() {

    const stations = await stationsList();

    const items = stations.map( station => {

        return `<option value="${station.abbr}">${station.name}</option>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    const fromStation = `<div class="styled-dropdown"><select id="trip-source">${pleaseSelect}${items}</select></div>`,
        toStation = `<div class="styled-dropdown"><select id="trip-destination">${pleaseSelect}${items}</select></div>`;

    // need depart or arriving button
    const now = new Date();
    let hours = now.getHours(),
        _ampm = 'AM';
    if ( hours === 0 ) {
        hours = 12;
    } else if ( hours > 12 ) {
        hours -= 12;
        _ampm = 'PM';
    }

    const tripTime = 'now'; //leftPadd( hours ) + ':' + leftPadd( now.getMinutes() ) + ' ' + ampm;

    const tripTimeInp = `<input type="hidden" value="${tripTime}" name="trip-time" id="trip-time">`;

    return `Starting Station: ${fromStation}<br>Destination Station: ${toStation}<br>${tripTimeInp}<br><br><div id="trip-results"></div>`;
}
