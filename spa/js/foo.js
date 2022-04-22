
/* foo.js */

console.log('FOO')

import { customiseNavbar, file2DataURI, loadPage, router, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('FOO: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Foobar'
		customiseNavbar(['home', 'logout', 'foo'])
		if(localStorage.getItem('authorization') === null) {
			history.pushState(null, null, '/login')
			await router()
		}
		// there is a token in localstorage
		node.querySelector('form').addEventListener('submit', await uploadData)
	} catch(err) {
		console.error(err)
	}
}

// async function uploadData(event) {
// 	console.log('func UPLOAD DATA')
// 	event.preventDefault()
// 	const element = document.querySelector('input[name="file"]')
// 	console.log(element)
// 	const file = document.querySelector('input[name="file"]').files[0]
// 	file.base64 = await file2DataURI(file)
// 	file.user = localStorage.getItem('username')
// 	console.log(file)
// 	const url = '/api/files'
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/vnd.api+json',
// 			'Authorization': localStorage.getItem('authorization')
// 		},
// 		body: JSON.stringify(file)
// 	}
// 	const response = await fetch(url, options)
// 	console.log(response)
// 	const json = await response.json()
// 	console.log(json)
// 	showMessage('file uploaded')
// 	loadPage('home')
// }

async function uploadData() {
	event.preventDefault()
	console.log('form submitted')
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	const element = document.querySelector('input[name="file"]')
	console.log(element)
	const file = document.querySelector('input[name="file"]').files[0]
 	file.base64 = await file2DataURI(file)
 	file.user = localStorage.getItem('username')
	const url ='/api/items'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data)
	}
	console.log('checking to see if it gets here')
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	console.log(json)
	showMessage('item Created')
	loadPage('home')
}


