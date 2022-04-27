/* accounts2.test.js */

// $ deno test --allow-all api/test/unit/accounts2.test.js

import { assertEquals, fail } from 'https://deno.land/std@0.130.0/testing/asserts.ts'
import { login } from '../../api/modules/accounts.js'

Deno.test({
	name: 'checks valid username and password',
	async fn() {
		try {
			const data = { user: 'doej', pass: 'p455w0rd'}
			const user = await login(data)
			assertEquals(user, 'doej', 'invalid username returned')
		} catch(err) {
			fail('error thrown')
		}
	},
	sanitizeResources: false,
	sanitizeOps: false,
	sanitizeExit: false
})