import * as events from 'client/dom/events';

// components
import footer from 'client/components/footer';
import * as menu from 'client/components/menu';

import Calculator from 'client/components/calculator/Calculator';


events.addOnLoad((onloadFN) => {
    menu.basicMenu();
    //footer( 'footer' );

    const calc = new Calculator('xcalc');
    calc.render();

});