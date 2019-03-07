const knex = require('knex')

const db = knex({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE
	}
})

module.exports = () => async (ctx, next) => {
	const client = await db.raw(`SELECT uuid FROM websites WHERE id = (SELECT website_id FROM hostnames WHERE fqdn = ?)`, ctx.host)


	if (!client.rows.length) {

		return ctx.throw(404, 'not_found')
	}

	await db.raw(`SET search_path TO "${client.rows[0].uuid}", public;`)
	ctx.app.context.knex = db

	await next()
}
