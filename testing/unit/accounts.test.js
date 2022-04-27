
/* accounts.test.js */

import { assertEquals } from 'https://deno.land/std@0.130.0/testing/asserts.ts'
import { delay } from 'https://deno.land/x/delay@v0.2.0/mod.ts'

import { login } from '../../api/modules/accounts.js'

Deno.test('checks valid username and password', async () => {
	try {
		// arrange
		await delay(200)
		const data = { user: 'doej', pass: 'p455w0rd'}
		// act
		// await delay(200)
		const user = await login(data)
		// assert
		// await delay(200)
		assertEquals(user, 'doej', 'invalid username returned')
	} catch {
		assertEquals(true, false, 'error thrown')
	}
})
