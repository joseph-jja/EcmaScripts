import {
    addOnLoad
} from 'client/dom/events';

import * as canvas from 'client/components/canvas';

function histogramCanvas() {

    window.histogramCanvasRef = canvas.create( "histogram-display", "center-aligner", 520, 450 );

    document.getElementById('center-aligner').prepend(document.getElementById("histogram-display"));

}

addOnLoad( histogramCanvas );
