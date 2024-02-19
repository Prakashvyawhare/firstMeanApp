const express = require("express");
const multer = require("multer");
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../middleware/auth-check');
const MINE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};
const { error } = require("console");
const storage = multer.diskStorage({
    destination: (req, file,cb)=>{
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mine type");
        if (isValid) {
            error=null;
        };
        cb(error,"backend/images");
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
        const ext = MINE_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+ Date.now()+'.'+ext)
    }
});


router.post("",checkAuth,multer({storage:storage}).single("image"), (req, res, next) => {
    const url = req.protocol +'://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url +"/images/"+ req.file.filename
    });
    post.save().then(createdPost=>{
        res.status(201).json({
            message: "post added successfully",
            post:{
                ...createdPost,
                _id:createdPost._id
            }
        });

    });
    // console.log(post);
    

})
router.get('', (req, res, next) => {
    console.log(req.query);
    let pagesize=+req.query.pageSize;
    let pageIndex= +req.query.pageIndex
    const responseData= Post.find()
    let fetchData;
    if(pageIndex&&pagesize){
responseData.skip(pagesize *(pageIndex-1)).limit(pagesize);
    }
    responseData
    .then(document=> {
        fetchData=document;
        return Post.countDocuments();
    })
    .then(count=>{
        res.status(200).json({
            message: "post fetch successfully",
            posts: fetchData,
            totalCount:count
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Error fetching posts",
            error: error.message,
        });
    });
})
router.delete('/:id',checkAuth, (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "post deleted!" });
    })
});

router.get('/:id', (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        res.status(200).json(result)
    })
    console.log(req.params.id);
})
router.put('/:id',checkAuth,multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.image;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
      }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: 'post Updated successfully' })
    })
})
module.exports = router;