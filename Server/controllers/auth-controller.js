const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//register controller 

const registerUser = async (req, res) => {
  try {
    const { username, email, password, telephone } = req.body;

    if (!email || !password || !username || !telephone) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Password criteria check
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and include a number and a special character.",
      });
    }

    const checkExistingUser = await User.findOne({
      $or: [{ email }, { telephone }],
    });

    if (checkExistingUser) {
      const field = checkExistingUser.email === email ? "E-mail" : "Telephone number";
      return res.status(400).json({
        success: false,
        message: `${field} is already registered!`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = new User({
      username,
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
      message: "Something went wrong! please try again",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    //now check the user credentials in database 
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Credentials not found!"
      })
    }

    //if the password is correct 
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password!"
      })
    }

    //create user token 
    const accessToken = jwt.sign({
      userId: user._id,
      username: user.username,
      role: user.role
    }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        dob: user.dob || "",
        addresses: user.addresses || [],
        isPrime: user.isPrime || false,
        primePlan: user.primePlan || null,
        role: user.role
      }
    })

  } catch (e) {
    console.log(e)
    return res.status(500).json({
      success: false,
      message: "Some thing went wrong! please try later"
    })
  }
}

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        dob: user.dob || "",
        addresses: user.addresses || [],
        isPrime: user.isPrime || false,
        primePlan: user.primePlan || null,
        role: user.role
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ success: false });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        dob: user.dob || "",
        addresses: user.addresses || [],
        isPrime: user.isPrime || false,
        primePlan: user.primePlan || null,
        role: user.role
      }
    });
  } catch (e) {
    return res.status(500).json({ success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, username, email, telephone, dob } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (telephone) user.telephone = telephone;
    if (dob) user.dob = dob;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        dob: user.dob,
        addresses: user.addresses,
        isPrime: user.isPrime,
        primePlan: user.primePlan,
        role: user.role
      }
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Update failed" });
  }
};

const addAddress = async (req, res) => {
  try {
    const { userId, fullAddress, city, state } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.addresses.push({ fullAddress, city, state, isDefault: user.addresses.length === 0 });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address added",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        dob: user.dob,
        addresses: user.addresses,
        isPrime: user.isPrime,
        primePlan: user.primePlan,
        role: user.role
      }
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Adding address failed" });
  }
};

const updatePrimeStatus = async (req, res) => {
  try {
    const { userId, isPrime, plan } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.isPrime = isPrime;
    user.primePlan = plan;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Prime status updated",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        dob: user.dob,
        addresses: user.addresses,
        isPrime: user.isPrime,
        primePlan: user.primePlan,
        role: user.role
      }
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Prime update failed" });
  }
};

module.exports = { registerUser, loginUser, getProfile, getMe, updateProfile, addAddress, updatePrimeStatus }