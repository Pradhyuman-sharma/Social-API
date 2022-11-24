const router = require("express").Router();
const Post = require("../models/post");
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json({
            status: "success",
            data: {
              id: savedPost._id,
              title: savedPost.title,
              description: savedPost.desc,
              createdTime: savedPost.createdAt,
            },
          });
    }catch(err){
        res.status(501).json(err);
    }       
})

router.get("/all_post",(req, res) => {
  Post.find({ userId: req.body.userId })
    .sort({ createdAt: -1 })
    .then((doc) =>
      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      })
    )
    .catch((err) =>
      res.status(500).json({
        status: "success",
        data: {
          data: err,
        },
      })
    );
}); 

router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        // if(req.body.userId === post.userId){
        // await post.updateOne({$set:req.body});
        res.status(200).json({
            id: post.id,
            numLikes: post.numLikes,
            comments: post.numComments
        });
        
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId){
        await post.deleteOne()
        res.status(200).json("the post have been deleted");
        } else{
            res.status(403).json("you can only delete your post"); 
        }  
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/like/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push:{likes:req.body.userId},$inc:{'numLikes': 1}});
        res.status(200).json("the likes have been updated");
        } else{
            res.status(403).json(" already liked"); 
        }  
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/unlike/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.likes.includes(req.body.userId)){
            await post.updateOne({$pull:{likes:req.body.userId},$inc:{'numLikes':-1}});
            res.status(201).json(" dislike your post"); 
        } else{
            res.status(401).json("first like the post to dislike");
        }  
    }catch(err){
        res.status(500).json(err);
    }
})
router.post("/comment/:id", async(req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,{$push:{comments: {comment:req.body.comment, commenter:req.body.userId}}, $inc: { numComments: 1 }});
         //await post.updateOne()
        setTimeout(()=>{
            res.status(201).json(post.comments.map((doc)=>doc._id));
        },"1000")
        
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;