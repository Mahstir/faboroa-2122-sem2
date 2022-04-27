
/* util.js */

import { etag } from 'https://deno.land/x/oak@v10.4.0/mod.ts'
import { Base64 } from 'https://deno.land/x/bb64@1.1.0/mod.ts'
import { Md5 } from 'https://deno.land/std@0.129.0/hash/md5.ts'

export function extractCredentials(token) {
	if(token === undefined) throw new Error('no auth header')
	const [type, hash] = token.split(' ')
	if(type !== 'Basic') throw new Error('wrong auth type')
	const str = atob(hash)
	if(str.indexOf(':') === -1) throw new Error('invalid auth format')
	const [user, pass] = str.split(':')
	return { user, pass }
}

export async function fileExists(path) {
	try {
		const stats = await Deno.lstat(path)
		return stats && stats.isFile
	} catch(err) {
		if (err && err instanceof Deno.errors.NotFound) {
			return false
		} else {
			throw err
		}
	}
}

export function dataURLtoFile(dataURL, username) {
	console.log(username)
	const [ metadata, base64Image ] = dataURL.split(';base64,')
	const extension = metadata.split('/').pop()
	const filename = `${username}-${Date.now()}.${extension}`
	Base64.fromBase64String(base64Image).toFile(`./spa/uploads/${filename}`)
	return filename
}

export async function getEtag(path) {
	const stat = await Deno.stat(path)
	const tag = await etag.calculate(stat)
	return tag
}
