
/* routes.js */

import { Router } from 'oak'
import { extractCredentials, dataURLtoFile } from 'util'
import { login, register, createItem, getItems } from 'accounts'


const router = new Router()


// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	context.response.headers.set('Content-Type', 'text/html')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/items', async context => {
	//console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		const allItems = await getItems()
		console.log(allItems)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { allItems }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.get('/api/items', async context => {
	//console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		const allItems = await getItems()
		console.log(allItems)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { allItems }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})



router.get('/api/accounts', async context => {
	//console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/api/items', async context => {
	console.log('POST /api/items')
	try{
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		context.response.headers.set('Content-Type', 'application/json')
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		const uname = JSON.stringify(username)
		console.log(uname)
		const body  = await context.request.body()
		console.log(body)
		const data = await body.value
		console.log(data)
		const imageFile = dataURLtoFile(data.file.base64, data.file.user)
		// console.log(imageFile)
		await createItem(data, username)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'item created'
				}
			}
		)	

	} catch (err){
		context.response.status = 400
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: 'a problem occurred',
						detail: err.message
					}
				]
			}
		)
	}
	
})


// router.get('api/items/:id', async context => {
// 	try {
// 		const token = context.request.headers.get('Authorization')
// 		console.log(`auth: ${token}`)
// 		context.response.headers.set('Content-Type', 'application/json')
// 		const id  = context.params.id
// 		const item = await getItem(id)
// 		console.log(item)
// 		context.response.status = Status.OK
// 		const data = { status: 200, data: item }
// 		context.response.body = JSON.stringify(item, null, 2)
// 	} catch(err) {
// 		context.response.status = 400
// 		context.response.body = JSON.stringify(
// 			{
// 				errors: [
// 					{
// 						title: 'a problem occurred',
// 						detail: err.message
// 					}
// 				]
// 			}
// 		)
// 	}
// })




router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		dataURLtoFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		context.response.status = 400
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: 'a problem occurred',
						detail: err.message
					}
				]
			}
		)
	}
})


export default router

