import StationsList from 'client/components/bart/stationsList';

export default async function Stations() {

    const stations = await StationsList();

    const items = stations.map( station => {

        return `<div data-abbr="${station.abbr}">${station.name}</div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="bart-stations-list">${items}</div>`;

}
