import MF from 'utils/mathFunctions';

let center, 
    resultPoints;

onmessage = (msg) => {
  
  if ( msg.setWidthHeight ) {
    const width = msg.setWidthHeight[0],
        height = msg.setWidthHeight[1];
    
    const radius = MF.getRectangleCorner( width, height );

     resultPoints = MF.getCirclePoints( radius );
  }
  
};

