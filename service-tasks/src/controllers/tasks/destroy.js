module.exports = async ctx => {
	try {
		const getTask = async id => {
			const result = await ctx.knex('tasks').where({id});
			return result.length ? result[0] : null
		};

		const {id} = ctx.params;


		const task = await getTask(id);

		if (!task) return ctx.throw(500, 'internal error');

		await ctx.knex('tasks').where({id}).del()

		ctx.body = await ctx.knex('tasks');
		ctx.status = 200
	} catch (e) {
		console.log(e)
		ctx.body = 'internal error';
		ctx.status = e.statusCode || 500
	}
};
