import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';
import {
    setupEyes
} from 'client/components/animation/eyes';

function generateFish() {

    const mw = document.getElementById( 'main-window' );
    const styles = window.getComputedStyle( mw );

    const webWin = new WebWindow( 'Canvas Test',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window' );

    const res = canvas.create( "fish-doctor", "canvas-container", 800, 500 );

    setupEyes( res );

    window.canvasRef = res;
}

<<<<<<< Updated upstream
addOnLoad( generateFish );
=======
addOnLoad(generateFish);
>>>>>>> Stashed changes
