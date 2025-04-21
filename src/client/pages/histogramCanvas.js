import * as canvas from 'client/components/canvas';

window.addEventListener( 'DOMContentLoaded', () => {

    window.histogramCanvasRef = canvas.create( 'histogram-display', 'image-container', 520, 450 );

    document.getElementById( 'image-container' ).prepend( document.getElementById( 'histogram-display' ) );

} );
