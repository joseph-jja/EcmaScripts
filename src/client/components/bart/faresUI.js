import stationsList from 'client/components/bart/stationsList';

export default async function Fares() {

    const stations = await stationsList();

    const items = stations.map( station => {

        return `<option value="${station.abbr}">${station.name}</option>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    const fromStation = `<select id="fares-source">${items}</select>`,
        toStation = `<select id="fares-destination">${items}</select>`;

    return `Starting Station: ${fromStation}<br><br>Destination Station: ${toStation}`;
}
