import * as canvas from 'client/components/canvas';

window.addEventListener('DOMContentLoaded', () => {

    window.histogramCanvasRef = canvas.create( "histogram-display", "center-aligner", 520, 450 );

    document.getElementById('center-aligner').prepend(document.getElementById("histogram-display"));

});

