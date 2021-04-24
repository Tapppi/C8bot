import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "pg_trgm"')
    .createTable('trivia', (table) => {
      table.string('id').primary();
      table.string('createdAt').notNullable().defaultTo(knex.raw('now()'));
      table.string('author', 255).notNullable();
      table.string('category', 255).notNullable();
      table.string('content').notNullable();
    })
    .raw(
      'CREATE INDEX triviaCategoryIndex on trivia USING GIN (category gin_trgm_ops)',
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('trivia');
}
