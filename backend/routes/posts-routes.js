const express = require("express");
const router = express.Router();
const Post = require('../models/post');



router.post("", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: "post added successfully"
    });

})
router.get('', (req, res, next) => {
    Post.find().then((document) => {
        res.status(200).json({
            message: "post fetch successfully",
            posts: document
        })
    })
})
router.delete('/:id', (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "post deleted!" });
    })
});

router.get('/:id', (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        res.status(200).json({
            message: "post fetch successfully",
            posts: result
        })
    })
    console.log(req.params.id);
})
router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: 'post Updated successfully' })
    })
})
module.exports = router;