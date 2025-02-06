const express = require("express")
const axois = require("axois")

const app = express()
const port = 4000






app.listen(port, ()=> {
    console.log(`we are listening to port ${port}`)
})