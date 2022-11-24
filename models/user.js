const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min: 3,
        max: 20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        min:8
    },
    desc:{
        type:String,
        max:50,

    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[],
    },
    numFollowers: {
        type: Number,
        default: 0,
        min: 0,
      },
      numFollowings: {
        type: Number,
        default: 0,
        min: 0,
      },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},
    {timestamps:true},
)
module.exports= mongoose.model("User", UserSchema)