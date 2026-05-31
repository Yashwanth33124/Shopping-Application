const express = require('express')
const { registerUser, loginUser, getProfile, getMe, updateProfile, addAddress, updatePrimeStatus } = require('../controllers/auth-controller')
const router = express.Router()

//routes related to authentication and authorization 
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile/:userId", getProfile)
router.get("/me", getMe)
router.put("/update-profile", updateProfile)
router.post("/add-address", addAddress)
router.put("/update-prime-status", updatePrimeStatus)
module.exports = router 
