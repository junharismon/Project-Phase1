const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
const router = require('./routes')
app.use(express.static('public'))
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})