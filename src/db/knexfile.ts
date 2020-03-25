const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const configs: Record<any, any> = {

    development: {
        client: 'postgresql',
        connection: {
            host: DB_HOST,
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
        },
        migrations: {
            extension: 'ts',
            tableName: 'knex_migrations',
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            host: DB_HOST,
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            extension: 'ts',
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            host: DB_HOST,
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            extension: 'ts',
            tableName: 'knex_migrations',
        },
    },

};

module.exports = configs; // Needed for migrations
export default configs;
