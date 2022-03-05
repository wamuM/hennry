const PORT = 8080;

const express = require("express")
const app = express()

app.use("/src",express.static(__dirname+"/src"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/src/index.html")
})

const server = app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`)
})





