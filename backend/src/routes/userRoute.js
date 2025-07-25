const express = require('express');
const { registerUser, loginUser, logoutUser, fetchUserInterests, addFavoritePlace, getFavoritePlaces, deleteFavoritePlace, updateUserInterests } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/user.model');
const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/interests',authMiddleware,fetchUserInterests)
userRouter.post("/save-interests", async (req, res) => {
  const { userId, interests } = req.body;
  if (!userId || !interests) {
    return res.status(400).json({ message: "Missing data" });
  }
  try {
    await User.findByIdAndUpdate(userId, {
      interests
    });

    res.status(200).json({ message: "Interests saved" });
  } catch (err) {
      console.error('Save Interests Error:', err);
    res.status(500).json({ message: "Failed to save interests" });
  }
});

userRouter.get('/me',authMiddleware,(req,res)=>{
  try {
    res.status(200).json({success:true,message:"User is logged in",user:req.user})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
})
userRouter.post('/favorites', authMiddleware, addFavoritePlace);
userRouter.get('/favorites', authMiddleware, getFavoritePlaces);
userRouter.put('/interests', authMiddleware, updateUserInterests);
userRouter.delete('/favorites/:placeName', authMiddleware, deleteFavoritePlace);

module.exports = userRouter;
