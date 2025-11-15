const User =require('../models/user.model');
const allowedRole=['Influencer','Recommender','Explorer'];

//POST /users

exports.createUser =async function (req,res) {
try{
    const {Name, email ,role, password}=req.body;
    if (!Name || !email || !password || !role) {
        return res.status(400).json({ message: 'Name, email , tag, and password are required' });
        }
    //todo : implement password hashing 
    if(!allowedRole.includes(role)){
      return res.status(400).json({message:`Invalid roles . ALlowed Roles: ${allowedRole.join(',')}`});
    }


    const existingUser = await User.findOne({email});//mongoose used to find a single matching entry
        if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
        }
    const user = new User({ Name, email,role, password });
        await user.save();    
        res.status(201).json({ message: 'User created', userId: user._id });
    }
catch(error){
    res.status(500).json({ message: error.message });
}

};

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};