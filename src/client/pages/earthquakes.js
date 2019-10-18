import fetcher from 'client/net/fetcher';

import * as events from 'client/dom/events';

async function getEarthquakes() {
    const result = await fetcher( 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson' );
    return JSON.parse( result ).features;
}

async function earthquakeList() {

    const results = await getEarthquakes();
    const data = results.map( feature => {
        const property = feature.properties;
        return {
            magnitude: property.mag,
            place: property.place,
            title: property.title,
            time: property.time,
            updated: property.updated,
            timezone: property.tz,
            tsunami: property.tsunami,
            url: property.url,
            detail: property.detail
        };
    } );
    return data;
}

async function Earthquakes() {

    const quakes = await earthquakeList();

    const items = quakes.map( quake => {

        return `<div>${quake.title}</div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="earthquake-list">${items}</div>`;
}

events.addOnLoad( () => {

    Earthquakes();

} );
