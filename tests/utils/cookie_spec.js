
import * as cookie from "utils/cookie";

describe( "cookie functions tests", function () {

    it( "test create functions", function () {
      var val;
     
      cookie.set( 'hello', 'world' );
      val = cookie.get( 'hello' );
      expect( val ).toEqual( 'world' );
    
      cookie.remove( 'hello' );
      val = cookie.get( 'hello' );
      expect( val ).toBe( undefined );
    
    } );
  
} );
