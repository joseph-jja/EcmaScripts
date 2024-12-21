import {
    getFares
} from '/js/client/components/bart/api';

export default async function fetchFareData( sourceID, destID, resultID ) {

    const source = document.getElementById( sourceID );
    const destination = document.getElementById( destID );

    if ( source.selectedIndex === 0 || destination.selectedIndex === 0 ) {
        return;
    }

    const fareSource = source.options[ source.selectedIndex ].value;
    const fareDest = destination.options[ destination.selectedIndex ].value;

    const fares = await getFares( fareSource, fareDest );

    const fareResults = fares.root.fares.fare.map( fare => {
        return `${fare['@name']}: ${fare['@amount']}`;
    } ).reduce( ( acc, next ) => {
        return `${acc}<br>${next}`;
    } );

    const fareResultsContainer = document.getElementById( resultID );
    fareResultsContainer.innerHTML = fareResults;
}
