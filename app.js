const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors')
const Data = require('./model/userData')
const methodOverride = require('method-override')

const app = express()
app.use(methodOverride())
app.use(cors())
mongoose.connect('mongodb+srv://Ddxx:deexith@data.tm6kj.mongodb.net/User?retryWrites=true&w=majority')
    .then(()=>{console.log("Connected to database")}).catch((err)=>{
    console.log("Error")
});

app.use(bodyParser());

app.post("/addData", async(req, res) => {
    try {
        var date = new Date().toLocaleDateString()
        await Data.create({
            img:req.body.file,
            author:req.body.author,
            location:req.body.location,
            description:req.body.description,
            date:date,
            likes: Math.floor(Math.random()*33)
        })
        return res.status(200).json({
            status:"Success"
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "Failed"
        })
    }
})

app.get('/data',async(req,res)=>{
    const posts = await Data.find({})
    console.log(posts)
    res.status(200).json({
        posts
    }) 
})
const port = process.env.Port || 5000
app.listen(port,()=>console.log("Server is listening on 5000"))