import mongoose from "mongoose"

const Schema=mongoose.Schema

const urlSchema=new Schema({
  long_url:{
    type:String,
    required:true
  },
  short_url:{
    type:String
  },
  clicks:{
    type:Number,
    default:0
  }
})

const Url= mongoose.model('url',urlSchema)

export default Url