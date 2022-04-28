
/* home.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
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

// this example loads the data from a JSON file stored in the uploads directory
async function addContent(node) {
	const response = await fetch('/uploads/quotes.json')
	const quotes = await response.json()
	const template = document.querySelector('template#quote')
	for(const quote of quotes.data) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = quote.name
		fragment.querySelector('h3').innerText = quote.username
		fragment.querySelector('p').innerText = quote.dateadded
		// fragment.querySelector('figure').innerText= quote.image
		node.appendChild(fragment)
	}
}
