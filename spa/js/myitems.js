
/* myitems.js */

console.log('MYITEMS')

import { customiseNavbar, file2DataURI, loadPage, router, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('MyItems: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Foobar'
		customiseNavbar(['home', 'logout', 'foo'])
		if(localStorage.getItem('authorization') === null) {
			history.pushState(null, null, '/login')
			await router()
		}
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
