const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//register controller 

const registerUser = async (req, res) => {
  try {
    const { email, password, name, telephone } = req.body;

    // validation
    if (!email || !password || !name || !telephone) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // phone validation (India example)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(telephone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    // check existing user
    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newlyCreatedUser = new User({
      username: name,
      email,
      password: hashedPassword,
      telephone,
      role: "user",
    });

    await newlyCreatedUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body; 
        const user = await User.findOne({email})

        //now check the user credentials in database 
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Credentials not found!"
        })
        }

        //if the password is correct 
        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message: "Incorrect password!"
            })
        }

            //create user token 
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        },process.env.JWT_SECRET_KEY,{expiresIn: '30m'})
        res.status(200).json({
            success: true,
            message: "Login Successfull",
            accessToken
        })

    } catch(e){
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Some thing went wrong! please try later"
      })
    }
}

module.exports = {registerUser,loginUser}