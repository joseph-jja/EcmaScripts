import * as events from 'client/dom/events';

import Calculator from 'client/components/calculator/Calculator';


events.addOnLoad( ( onloadFN ) => {

    const calc = new Calculator( 'xcalc' );
    calc.render();

} );
