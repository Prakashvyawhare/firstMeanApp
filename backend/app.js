const express = require('express');
const mongoose = require('mongoose');
const app = express()
mongoose.connect('mongodb+srv://vyawhareprakash719:xbqun47R6WPbsezz@cluster0.itpgvpt.mongodb.net/node-angular?retryWrites=true&w=majority').then(()=>{
    console.log('connected to database!');
})
.catch(()=>{
    console.log('Connection Failed!');
});





// const bodyparser = require("body-parser")
const Post = require('./models/post');
const { Db } = require('mongodb');
// const app = express();
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',
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
app.get('/api/posts',(req, res, next)=>{
// const posts =[{
//     id:"1256265",
//     title:"first object",
//     content:"this is comming from server"
// },
// {
//     id:"1256265",
//     title:"first object",
//     content:"this is comming from server"}
// ];
Post.find().then((document)=>{
    res.status(200).json({
        message:"post fetch successfully",
        posts:document
    })
})
})
app.delete('/api/posts/:id',(req,res,next)=>{
    console.log(req.params.id);
    Post.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({message:"post deleted!"});
    })
});

app.get('/api/posts',(req,res,next)=>{
    Post.findOne({_id:req.params.id}).then(result=>{
        console.log(results);
    })
    console.log(req.params,id);
    // Post.get({_id:req.params.id}).then(result=>{
    //     console.log(result);
    //     res.status(200).json({message:'postfetched'})
    // })
})
module.exports=app;