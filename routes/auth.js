const router = require("express").Router();
const User =  require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
router.get("/register", async (req, res)=>{
    const user = await new User({
        username:"john2",
        email:"john2@gmail.com",
        password:"123456",
        desc:"this is something",
    });
    const user2 = await new User({
        username:"anem",
        email:"naem@gmail.com",
        password:"123456",
        desc:"this not something",
    });
    await user.save();
    await user2.save();
    res.send("ok");
});

router.post("/",async (req,res)=>{
   try{ 
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json("Incorrect email");
    }
    const validPassword = user.password.localeCompare(req.body.password);
    if(validPassword !== 0){
        return res.status(400).json("incorrect password");
    }
    const token = jwt.sign(user.email,process.env.TOKEN_SECERET);
    res.status(200).json(token);
   }catch(err){
    res.status(401).json("something is wrong");
   }



})

module.exports = router;