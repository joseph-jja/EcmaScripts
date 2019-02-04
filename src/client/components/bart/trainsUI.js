import * as API from 'client/components/bart/api';

export default async function TrainList(station) {

    const trains = await API.getTrainsByStation(station);

    if ( !trains ) {
        throw ( 'Could not get trains!' );
    }

    const items = stations.sort( (a, b) => {
      // it is either north or south  
      if ( a.direction === 'North' ) { 
          return 1;
        }
        return -1;
    }).map( trains => {

        return `<div>
            Train: ${train.destination}
            <br>Times: ${est.minutes}
            <br>Platform: ${est.platform}
            <br>Direction: ${est.direction}
            <br>Delays: ${est.delay}
               </div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="bart-train-list">${items}</div>`;

}
