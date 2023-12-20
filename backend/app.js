const express = require('express');
const mongoose = require('mongoose');
const app = express()
mongoose.connect('mongodb+srv://vyawhareprakash719:xbqun47R6WPbsezz@cluster0.itpgvpt.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('connected to database!');
})
.catch(()=>{
    console.log('Connection Failed!');
});





// const bodyparser = require("body-parser")
const Post = require('./models/post')
// const app = express();
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
// app.use((req, res, next)=>{
//     console.log('first middleware');
//     next();
// })

// app.use((req, res, next)=>{
//     res.send('hello from express')
// })
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requisted-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS ")
    next();
});
app.post("/api/posts",(req,res,next)=>{
    const post = new Post({
        title:req.body.title,
        content:req.body.content
    });
     post.save();
    console.log(post);
    res.status(201).json({
        message:"post added successfully"
    });

})
app.use('/api/posts',(req, res, next)=>{
const posts =[{
    id:"1256265",
    title:"first object",
    content:"this is comming from server"
},
{
    id:"1256265",
    title:"first object",
    content:"this is comming from server"}
];
res.status(200).json({
    message:"post fetch successfully",
    posts:posts
})
})
module.exports=app;