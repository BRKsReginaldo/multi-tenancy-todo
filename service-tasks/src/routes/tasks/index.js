const Router = require('koa-router');
const {View, Create, Toggle, Destroy} = require('../../controllers/tasks');

module.exports = new Router()
	.get('/', View)
	.post('/', Create)
	.put('/:id', Toggle)
	.del('/:id', Destroy);
