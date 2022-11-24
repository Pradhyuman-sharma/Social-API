const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
                const user = await User.findByIdAndUpdate(req.params.id,{
                    $set: req.body,
                });
                    res.status(200).json("Account has been updated");
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can only update your account");    
    }
})

router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{ 
                const user = await User.findOneAndDelete(req.params.id);
                    res.status(200).json("Account has been deleted");
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can only delete only your account");    
    }
})
router.get("/:id",async (req, res)=>{
    try{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: "sucess",
        data: {
            name:user.username,
            Followers:user.followers,
            Following:user.following
        
     } });
    
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/",async (req, res)=>{
    try{
    const user = await User.find({});
    res.status(200).json(user);
    
    }catch(err){
        res.status(500).json(err);
    }
})


router.post("/follow/:id",async (req, res)=>{
   if(req.body.userId !== req.params.id){
    try{
    const user = await User.findById(req.params.id);   
    const currUser = await User.findById(req.body.userId); 
    if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push: {followers: req.body.userId},$inc:{'numFollowers': 1}});
        await currUser.updateOne({$push: {following: req.params.id},$inc:{'numFollowings': 1}});
        res.status(200).json("user has been followed");
    }else{
        res.status(403).json("you already follow this user");
    }
}catch(err){
        res.status(500).json(err);
}}
else{
    res.status(403).json("You can't follow yourself!");
}
});

router.post("/unfollow/:id",async (req, res)=>{
    if(req.body.userId !== req.params.id){
     try{
     const user = await User.findById(req.params.id);   
     const currUser = await User.findById(req.body.userId); 
     if(user.followers.includes(req.body.userId)){
         await user.updateOne({$pull: {followers: req.body.userId}, $inc:{'numFollowers': -1}});
         await currUser.updateOne({$pull: {following: req.params.id},$inc:{'numFollowing': -1}});
         res.status(200).json("user has been unfollowed");
     }else{
         res.status(403).json("you don't follow this user");
     }
 }catch(err){
         res.status(500).json(err);
 }}
 else{
     res.status(403).json("You can't unfollow yourself!");
 }
 });

module.exports = router;