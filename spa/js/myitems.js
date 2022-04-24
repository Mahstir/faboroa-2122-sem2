
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
		console.error(err.showMessage)
		console.log('you have failed again')
	}
}

// this example loads the data from a JSON file stored in the uploads directory
async function addContent(node) {
	const response = await fetch('')
	console.log(response)
}
