const express = require('express')
const port = 3000
const app = express()
const cors = require('cors')
const note = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/notes', note)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
