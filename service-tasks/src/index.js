const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const knex = require('./lib/knex')
const tasksRouter = require('./routes/tasks')

const PORT = process.env.PORT || 3000;

let app = new Koa();

module.exports = app
	.use(bodyParser())
	.use(knex())
	.use(tasksRouter.routes())
	.listen(PORT, () => console.log(`[SERVICE] Tasks running on port ${PORT}`));
