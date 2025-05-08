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

    const token = await user.getJWT()
    res.cookie("token", token);

    // res.status(201).json({
    //   id: user._id,
    //   user,
    //   token: generateToken(user._id),
    // });
    res.send(user)
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

        const token = await user.getJWT()
            
        console.log(token);

        res.cookie("token", token);
      
        res.send(user);
        
    
 

    } catch (error) {
        res.send(error.message)
    }



};

exports.getUserInfo = async (req, res) => {
    
   try{
    const user = req.user;

    res.send(user);
  

    } catch (error) {
        res.send(error.message)
    }
};
