import {
    addOnLoad
} from 'client/dom/events';

import * as canvas from 'client/components/canvas';

function histogramCanvas() {

    window.histogramCanvasRef = canvas.create( "histogram-display", "center-aligner", 520, 450 );

}

addOnLoad( histogramCanvas );
