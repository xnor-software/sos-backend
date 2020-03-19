import { handler } from '../goodbye';
import event from '../../__mocks__/ApiGatewayEvent';

describe( 'Goodbye', ()=>{
    it( 'should match snapshot', async()=> {
        const response = await handler( event );
        expect( response ).toMatchSnapshot();
    } );
} );
