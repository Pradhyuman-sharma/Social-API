const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
      },
   userId:{
    type:String,
    required:true
   },
   desc:{
    type:String,
    max:500
   },
   likes:{
    type:Array,
    default:[]
   },
   comments: [{
    comment: String,
    createdAt: {type: Date, default: Date.now()},
    commenter: {type: ObjectId, ref: 'User'}
  }],
   numLikes : {
    type : Number,
    default : 0
  },
  numComments : {
    type : Number,
    default : 0
  }
},
    {timestamps:true},
)
module.exports= mongoose.model("Post", PostSchema)