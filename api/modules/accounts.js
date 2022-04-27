
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'
import { db } from './api/modules/db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

export async function login(credentials) {
	const { user, pass } = credentials
	let sql = `SELECT count(id) AS count FROM accounts WHERE user="${user}";`
	let records = await db.query(sql)
	if(!records[0].count) throw new Error(`username "${user}" not found`)
	sql = `SELECT pass FROM accounts WHERE user = "${user}";`
	records = await db.query(sql)
	const valid = await compare(pass, records[0].pass)
	if(valid === false) throw new Error(`invalid password for account "${user}"`)
	return user
}

export async function register(credentials) {
	credentials.pass = await hash(credentials.pass, salt)
	const sql = `INSERT INTO accounts(user, pass, sellersEmailAddress, sellersPhoneNumber) VALUES("${credentials.user}", "${credentials.pass}", "${credentials.sellersEmailAddress}", "${credentials.sellersPhoneNumber}")`
	console.log(sql)
	await db.query(sql)
	return true
}

export async function createItem(auction, username) {
	const {name, description, file} = auction
	let getid = `SELECT id FROM accounts WHERE user="${username}";`
	let id = await db.query(getid)
	const myid = id[0].id
	//console.log(myid)
    var today = new Date()
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
	//console.log(date)
	const sql = `INSERT INTO items(name, description, account, dateAdded, file) VALUES("${auction.name}", "${auction.description}", "${myid}", "${date}", "${auction.file.base64}")`
	//console.log(sql)
	await db.query(sql)
	return true
}

export async function myItem(username) {
	const user = username
	let id = `SELECT id FROM accounts WHERE user="${user}";`
	let records = await db.query(id)
	//console.log(records)
	let userItems = `SELECT name, description, file, dateAdded FROM items WHERE account="${records[0].id}";`
	const result = await db.query(userItems)
	//console.log(result)
	return result
}

export async function getItems() {
	let sql = `SELECT i.name, i.dateAdded, a.user, i.description,file FROM items as i JOIN accounts as a ON i.account = a.id;`
	//Select i.name, i.description, a.user FROM items as i JOIN accounts as a ON i.account = a.id WHERE i.account = 8;
	//console.log(sql)
	const result = await db.query(sql)
	return result
}




