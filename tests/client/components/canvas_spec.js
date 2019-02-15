import * as Canvas from 'client/components/canvas';

describe( 'testing canvas', () => {

    let parent;

    beforeEach( () => {
        if ( !parent ) {
            parent = document.createElement( 'div' );
        }
        parent.id = 'container-for-canvas';
        document.body.appendChild( parent );
    } );

    afterEach( () => {
        if ( parent ) {
            document.body.removeChild( parent );
        }
    } );

    it( 'canvas test', () => {
        expect( Canvas ).toBeDefined();
    } );

    it( 'create canvas', () => {

        const cvs = Canvas.create( parent.id + 'cvs', parent.id, 100, 100 );
        expect( cvs ).toBeDefined();
    } );

    describe( 'functions', () => {

        let cvs;

        beforeAll( () => {

            if ( !parent ) {
                parent = document.createElement( 'div' );
            }
            parent.id = 'container-for-canvasfns';
            document.body.appendChild( parent );

            cvs = Canvas.create( parent.id + 'cvsfns', parent.id, 100, 100 );
        } );

        it( 'create canvas octagon', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'closePath' );

            cvs.octagon( 30, 30, 20, {
                rotateAngle: 30
            } );

            expect( ctx.closePath ).toHaveBeenCalled();
        } );

        it( 'create canvas hexagon', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'closePath' );

            cvs.hexagon( 30, 30, 20, {
                rotateAngle: 30
            } );

            expect( ctx.closePath ).toHaveBeenCalled();
        } );

        it( 'create canvas equilateralTriangle', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'closePath' );

            cvs.equilateralTriangle( 30, 30, 20, {} );

            expect( ctx.closePath ).toHaveBeenCalled();
        } );

        it( 'create canvas triangle', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'closePath' );

            cvs.triangle( 10, 10, 20, 20, 10, 20, {
                rotateAngle: 30
            } );

            expect( ctx.closePath ).toHaveBeenCalled();
        } );

        it( 'create canvas square', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'restore' );

            cvs.square( 10, 10, 10, {
                rotateAngle: 30
            } );

            expect( ctx.restore ).toHaveBeenCalled();
        } );

        it( 'create canvas oval', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'restore' );

            cvs.oval( 10, 10, 10, 15, {
                rotateAngle: 30
            } );

            expect( ctx.restore ).toHaveBeenCalled();
        } );

        it( 'create canvas halfCircle', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'restore' );

            cvs.halfCircle( 10, 10, 10, {
                rotateAngle: 30
            } );

            expect( ctx.restore ).toHaveBeenCalled();
        } );

        it( 'create canvas circle', () => {

            const ctx = cvs.ctx;
            spyOn( ctx, 'arc' );

            cvs.circle( 10, 10, 5, {
                rotateAngle: 30
            } );

            expect( ctx.arc ).toHaveBeenCalled();
        } );
    } );
} );
