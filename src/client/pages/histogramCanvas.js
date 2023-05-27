import {
    addOnLoad
} from 'client/dom/events';

import * as canvas from 'client/components/canvas';

function histogramCanvas() {

    window.histogramCanvasRef = canvas.create( "center-aligner", "histogram-display", 520, 450 );

}

addOnLoad( histogramCanvas );
