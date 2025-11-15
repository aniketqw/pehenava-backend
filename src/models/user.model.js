const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
  Name: { 
    type: String, 
    required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true },
  role:{
    type:String,
    enum:['Influencer','Recommender','Explorer'],
    required:true},
  password: { 
    type: String,
    required: true }, // Note: Stored hashed (to be implemented)
  createdAt: { 
    type: Date, 
    default: Date.now },
});

const User = mongoose.model('User', userSchema);//compile schema into a model 

module.exports = User;