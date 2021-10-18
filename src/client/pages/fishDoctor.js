import * as dom from 'client/dom/DOM';
import {
    addOnLoad
} from 'client/dom/events';

import WebWindow from 'client/components/wbWindow';
import * as canvas from 'client/components/canvas';

function generateFish() {

    const mw = document.getElementById('main-window');
    const styles = window.getComputedStyle(mw);

    const webWin = new WebWindow('Canvas Test',
        styles.offsetLeft,
        styles.offsetTop,
        styles.offsetWidth,
        styles.offsetHeight,
        'main-window');

    const res = canvas.create("fish-doctor", "canvas-container", 800, 500);
    ref.circle(650, 250, 10, {
        color: 'black',
        fillStrokeClear: 'fill'
    });
    ref.circle(650, 250, 20, {
        color: 'black'
    });

    window.canvasRef = res;
}

addOnLoad(generateFish);