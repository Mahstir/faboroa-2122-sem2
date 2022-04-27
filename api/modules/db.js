
/* db.js */

import { Client } from 'https://deno.land/x/mysql@v2.10.2/mod.ts'

const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)

const connectionData = {
	'/home/codio': {
		hostname: '127.0.0.1',
		username: 'websiteuser',
		password: 'websitepassword',
		db: 'website'
	},
	'/app': {
		hostname: 'us-cdbr-east-05.cleardb.net',
		username: 'b6e7fbfa82d52f',
		password: '7b08d88b',
		db: 'heroku_f68a7f9a72cf9ce'
	}
}

const conn = connectionData[home]
// console.log(conn)

const db = await new Client().connect(conn)
console.log('connection to database established')
export { db }
