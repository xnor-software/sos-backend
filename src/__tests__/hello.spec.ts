import { handler } from '../hello';
import event from '../../__mocks__/ApiGatewayEvent';

describe( 'Hello', ()=>{
    it( 'should match snapshot', async()=> {
        const response = await handler( event );
        expect( response ).toMatchSnapshot();
    } );
} );
