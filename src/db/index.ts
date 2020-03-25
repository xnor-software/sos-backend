import knex from 'knex';
import 'pg';

import configs from './knexfile';

const { NODE_ENV } = process.env;

const config = configs[NODE_ENV || ''];
if ( ! config ) {
    throw Error( `No DB config for ${NODE_ENV}` );
}
const db = knex( config );

export default db;

