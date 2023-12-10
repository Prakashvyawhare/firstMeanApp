const express = require('express');
const bodyparser = require("body-parser")

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// app.use((req, res, next)=>{
//     console.log('first middleware');
//     next();
// })

// app.use((req, res, next)=>{
//     res.send('hello from express')
// })
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-control-Allow-Headers","Origin, X-Requisted-with, Context-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS ")
    next();
});
app.post("/spi/posts",(req,res,next)=>{
    const post = res.body;
    console.log(post);
    res.status(201).json({
        message:"post added successfully"
    });

})
app.use('/api/posts',(req, res, next)=>{
const posts =[{
    id:"1256265",
    title:"first object",
    message:"this is comming from server"
},
{
    id:"1256265",
    title:"first object",
    message:"this is comming from server"}
];
res.status(200).json({
    message:"post fetch successfully",
    posts:posts
})
})
module.exports=app;