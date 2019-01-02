const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config]) //dá o migrate quando o servidor for startado. Essa operação dentro do código da aplicação pode não ser boa para sistemas maiores, se ela tiver diversos nós em um balanceamento de carga e a cada novo start em um nó a db seja migrada, você pode perder o controle das chamadas de migração.

module.exports = knex