module.exports = async ctx => {

	try {
		const {body} = ctx.request.body
		if (!body) return ctx.throw(500, 'internal error');

		ctx.body = await ctx.knex('tasks').insert({
			body
		});
		ctx.status = 200
	} catch(e) {
		console.log(e)
		ctx.body = 'internal error';
		ctx.status = e.statusCode || 500
	}
};
