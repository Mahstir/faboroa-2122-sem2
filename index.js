
/* index.js */

import app from './api/middleware.js'

const port = 5000

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`))

await app.listen({ port })
