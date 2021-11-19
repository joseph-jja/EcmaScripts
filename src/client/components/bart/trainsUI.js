import * as API from 'client/components/bart/api';

export default async function trainList( station ) {

    const trains = await API.getTrainsByStation( station );

    if ( !trains ) {
        throw ( 'Could not get trains!' );
    }

    if ( trains.length === 0 ) {
        return `<div id="bart-train-list">No trains found</div>`;
    }

    const items = trains.sort( ( a, b ) => {
        // it is either north or south
        if ( a.direction === 'North' ) {
            return 1;
        }
        return -1;
    } ).map( item => {

        return `<div>
            Train: ${item.destination}
            <br>Times: ${item.minutes}
            <br>Platform: ${item.platform}
            <br>Direction: ${item.direction}
            <br>Delays: ${item.delay}
               </div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="bart-train-list">${items}</div>`;

}
