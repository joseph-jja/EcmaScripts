import stationsList from 'client/components/bart/stationsList';

const pleaseSelect = '<option>Please Select A Station</option>';

export default async function Fares() {

    const stations = await stationsList();

    const items = stations.map( station => {

        return `<option value="${station.abbr}">${station.name}</option>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    const fromStation = `<div class="styled-dropdown"><select id="fares-source">${pleaseSelect}${items}</select></div>`,
        toStation = `<div class="styled-dropdown"><select id="fares-destination">${pleaseSelect}${items}</select></div>`;

    return `Starting Station: ${fromStation}<br><br>Destination Station: ${toStation}<br><div id="fare-results"></div>`;
}
