import "@babel/runtime/regenerator";
import fetcher from 'client/net/fetcher';

import * as events from 'client/dom/events';
import * as dom from 'client/dom/DOM';

import WebWindow from 'client/components/wbWindow';

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

async function BuildEarthquakeUI() {

    const quakes = await earthquakeList();

    const items = quakes.map( quake => {

        return `<tr><td>${quake.title}</td><td>${new Date(quake.time)}</td></tr>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    const tableHeader = '<table><tr><th>Title</th><th>Time</th></tr>';

    return `<div id="earthquake-list">${tableHeader}${items}</table></div>`;
}

function getMainWindow() {
    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    return new WebWindow( 'Quake Info',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );
}

async function doOnloadStuff() {

    const quakes = await BuildEarthquakeUI();
    const wwin = getMainWindow();

    const content = wwin.windowArea;

    content.innerHTML = quakes;
}

events.addOnLoad( doOnloadStuff );
