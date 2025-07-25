
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET ;
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({
      fullName: name,
      email,
      password,
    });

    await newUser.save();

    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    
    res.cookie('token', token, {
      httpOnly: true,
      
    });

    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

 
    res.cookie('token', token, {
      httpOnly: true,
    });

    
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const fetchUserInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('interests'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ interests: user.interests });
  } catch (error) {
    console.error('Error fetching user interests:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUserInterests = async (req, res) => {
  try {
    console.log('Incoming body:', req.body); // ✅ Log the body
    console.log('User ID:', req.user.id);     // ✅ Log the user ID

    const { interests } = req.body;
    if (!Array.isArray(interests)) {
      return res.status(400).json({ message: 'Invalid interests format.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { interests: interests.map(name => ({ name })) },
      { new: true }
    );

    console.log('Updated user interests:', updatedUser.interests);

    res.status(200).json({ message: 'Interests updated.', interests: updatedUser.interests });
  } catch (err) {
    console.error('Error in updateUserInterests:', err); // ✅ Log actual error
    res.status(500).json({ message: 'Failed to update interests.' });
  }
};

const addFavoritePlace = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Place name is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });


    const alreadyFavorited = user.favouritePlace.some(place => place.name === name);
    if (alreadyFavorited) {
      return res.status(400).json({ message: 'Place already in favorites' });
    }

    
    user.favouritePlace.push({ name });
    await user.save();

    return res.json({ message: 'Place added to favorites', favouritePlace: user.favouritePlace });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getFavoritePlaces = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId).select('favouritePlace');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ favoritePlace: user.favouritePlace });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const logoutUser = (req, res) => {
res.clearCookie('token',{
  httpOnly:true,
  secure:true
})
 
  res.status(200).json({ message: 'Logout successful' });
};


const deleteFavoritePlace = async (req, res) => {
  try {
    const userId = req.user.id;
    const placeName = req.params.placeName;

    if (!placeName) {
      return res.status(400).json({ message: 'Place name is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.favouritePlace = user.favouritePlace.filter(
      (place) => place.name.toLowerCase() !== placeName.toLowerCase()
    );

    await user.save();

    res.json({ message: 'Favorite place removed successfully', favouritePlace: user.favouritePlace });
  } catch (err) {
    console.error('Error deleting favorite:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports={
  registerUser,
  loginUser,
  logoutUser,
  fetchUserInterests,
  addFavoritePlace,
  getFavoritePlaces,
  deleteFavoritePlace,
  updateUserInterests
}