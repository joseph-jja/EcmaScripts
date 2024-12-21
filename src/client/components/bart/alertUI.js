import * as API from '/js/client/components/bart/api';

export default async function alerts( _station ) {

    const alerts = await API.getAlerts();

    if ( !alerts ) {
        throw ( 'Could not get alerts!' );
    }

    const items = alerts.map( alert => {

        return `<div>
                  Date Time: ${alert.dateTime}
                  <br><br>Station: ${alert.station}
                  <br><br>Description: ${alert.description['#cdata-section']}
               </div>`;

    } ).reduce( ( acc, item ) => {
        return acc + item;
    } );

    return `<div id="bart-alert-list">${items}</div>`;

}
