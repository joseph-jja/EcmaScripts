import fetcher from 'client/net/fetcher';

import * as events from 'client/dom/events';

async function getEarthquakes() {
    const result = await fetcher('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson');
    return JSON.parse(result).features;
}

async function buildList() {

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
    });
    return data;
}

events.addOnLoad(() => {

    buildList();

});
