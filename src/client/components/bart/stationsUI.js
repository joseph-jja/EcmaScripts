import stationsList from '/js/client/components/bart/stationsList';

export default async function stations() {

    const stations = await stationsList();

    const items = stations.map( station => {

        return `<div data-abbr="${station.abbr}">${station.name}</div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="bart-stations-list">${items}</div>`;

}
