import stationsList from 'client/components/bart/stationsList';

const pleaseSelect = '<option>Please Select A Station</option>';

export default async function Fares() {

    const stations = await stationsList();

    const items = stations.map( station => {

        return `<option value="${station.abbr}">${station.name}</option>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    const fromStation = `<select id="fares-source">${pleaseSelect}${items}</select>`,
        toStation = `<select id="fares-destination">${pleaseSelect}${items}</select>`;

    return `Starting Station: ${fromStation}<br><br>Destination Station: ${toStation}`;
}
