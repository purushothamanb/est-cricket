const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer= require('multer'); 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, res, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({ storage: storage});


router.get('/get', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
})

router.post('/insert', upload.single('profileImage'), async (req, res) => {
    const post = new Post({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Runs: req.body.Runs,
        Wickets : req.body.Wickets,
        Catches: req.body.Catches,
        Hs: req.body.Hs});

        await post.save().then((data) => {
            res.json({message: 'Success', data: data});
        }).catch(err => {
            res.json({message: err});
        });
});

//specific post

router.get('/select/:Id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.Id);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

//delete post

router.delete('/delete/:Id', async (req, res) => {
    try {
        const removePost = await Post.remove({_id: req.params.Id});
        res.json({data: removePost, message: 'Success'});
    } catch (err) {
        res.json({message: err});
    }
});

router.patch('/update/:Id', async (req, res) => {
    try {
        const updatePost = await Post.updateOne({_id: req.params.Id},
            { $set: {
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Runs: req.body.Runs,
                Wickets : req.body.Wickets,
                Catches: req.body.Catches,
                Hs: req.body.Hs
            }});
        res.json({data: updatePost, message: 'Success'});
    } catch (err) {
        res.json({message: err});
    }
});

//update post

module.exports = router;