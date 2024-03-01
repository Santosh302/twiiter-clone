const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes:[
    {
        type:ObjectId,
        ref:"UserModel"
    }
  ],
  
  comments:[
    {
        commentText: String,
        commentedBy: { type: ObjectId, ref: "UserModel" }
    }
  ],
  
  author: {
    type: ObjectId,
    ref: "UserModel",
  },


});

module.exports = mongoose.model("PostModel", postSchema);
