const express = require('express')

const app = express()
const port = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const routes = require('./Routes/routes')

require('./db/conn')

app.use('/v1',routes)
app.get('/', (req, res) => {
    res.send("HII")
})

app.listen(port, () => {
    console.log(`port is running at ${port}`)
})