const express = require('express');

const app = express();

// app.use((req, res, next)=>{
//     console.log('first middleware');
//     next();
// })

// app.use((req, res, next)=>{
//     res.send('hello from express')
// })
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-control-Allow-Header","Origin, X-Requisted-with, Context-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS ")
    next();
});
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