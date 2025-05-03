const USER = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, { expiresIn: "2d" });
};

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
      return res.status(500).json({ msg: "All fields are required" });
    }

    const UserData = await USER.findOne({ email });

    if (UserData) {
      return res.status(500).json({ msg: "User is Already register" });
    }

    const user = await USER.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.loginUser = async (req, res) => {

    const {email , password} = req.body;

    if(!email || !password){
    return res.status(500).json( {msg : "all fields are required"});
    }

    try {
        
        const user = await USER.findOne({email});
        if(!user){
            return res.status(400).json({msg :"Invalid Creadentials"})
        }

      res.status(200).json({
        msg:"logged IN ",
        id:user._id,
        user,
        token:generateToken(user._id)
      })
 

    } catch (error) {
        res.send(error.message)
    }



};

exports.getUserInfo = async (req, res) => {
    console.log("hee");
    
    try {
        
        const user = await USER.findById(req.user.id).select("-password");
        
        if(!user){
            return res.status(404).json({msg:"User Not Found"})
        }


     res.status(200).json(user)

    } catch (error) {
        res.send(error.message)
    }
};
