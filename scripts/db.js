#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require( 'dotenv' );

dotenv.config();

const { exec } = require( 'child_process' );

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const [_, script, ...args] = process.argv;

exec( `npx knex --knexfile ./dist/db/knexfile.js ${args.join( ' ' )}`, ( error, stdout, stderr ) => {
    if ( error ) {
        console.error( error );
        process.exit( 1 );
    }

    if ( stderr ) {
        console.error( `stderr: ${stderr}` );
        return;
    }

    console.log( `stdout: ${stdout}` );
} );
