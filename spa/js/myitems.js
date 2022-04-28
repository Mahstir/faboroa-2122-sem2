
/* myitems.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('items: setup')
	try {
		console.log(node)
		document.getElementById('username').innerText = localStorage.getItem('username')
		customiseNavbar(['home', 'foo', 'allitems', 'myitems', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out
		// add content to the page
		await addContent(node)
	} catch(err) {
		console.error(err)
	}
}

async function addContent(node) {
	const response = await fetch('/api/items/useritems', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	})
	
	const items = await response.json()
	console.log(items)
	const template = document.getElementById('myitems')
	for( const item of items.data.allItems) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = item.name
		let date = item.dateAdded
		date = date.split('T')[0]
		fragment.querySelector('h3').innerText = date
		fragment.querySelector('img').src = item.file
		node.appendChild(fragment)
	}
	
}

