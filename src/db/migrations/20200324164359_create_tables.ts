import * as Knex from 'knex';


export async function up( knex: Knex ): Promise<any> {
    return knex.schema
        .createTable( 'users', ( table ) => {
            table.increments( 'id' );
            table.string( 'firstName', 255 ).notNullable();
            table.string( 'lastName', 255 ).notNullable();
        } );
}


export async function down( knex: Knex ): Promise<any> {
    return knex.schema
        .dropTable( 'users' );
}

