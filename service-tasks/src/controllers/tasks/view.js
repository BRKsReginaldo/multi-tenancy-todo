module.exports = async ctx => {
	try {
		ctx.body = await ctx.knex('tasks').orderBy('id', 'asc');
		ctx.status = 200
	} catch(e) {
		ctx.body = 'internal error';
		ctx.status = e.statusCode || 500
	}
};
