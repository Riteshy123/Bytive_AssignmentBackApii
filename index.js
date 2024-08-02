const express = require("express");
const cors = require("cors");
const UserModel = require("./models/User");
const mongoose = require("mongoose");
require("dotenv").config();
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/User_BytiveTechnology", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
  });

var dataUser=''
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});


app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find({});
    dataUser=users;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// delete API

// app.delete('/user/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {

//     const deletedUser = await UserModel.findByIdAndRemove(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully', deletedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


app.put('/users/:id', async (req, res) => {
  const userId = req.params.id; 
  
  const updatedUserData = req.body; 
  console.log('udoaded user form backend',updatedUserData);
  console.log(userId);
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
