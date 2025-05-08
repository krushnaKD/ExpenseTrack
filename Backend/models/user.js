const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
     fullName:{type:String,required:true},
     email:{type:String,required:true},
     password:{type:String,required:true},
     profileImageUrl:{type:String},
},{
    timestamps:true
})

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.getJWT = async function () {
    const user = this;
  
    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$431", {
      expiresIn: "1d",
    });
    return token;
  };


UserSchema.methods.comparePassword = async function (candidatepassword){
    return await bcrypt.compare(candidatepassword, this.password);
};

module.exports = mongoose.model("USER",UserSchema)