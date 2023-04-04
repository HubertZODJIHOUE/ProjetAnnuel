const { Sequelize, DataTypes, Model } = require('sequelize');
const ser = require('../model/user');
const sequelize= require('../config/db')


const getAllUsers = async (req, res) => {
  try {
    const users = await ser.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




/*const createUser = async (req, res) => {
  // const data= req.body;
  try {
    const newUser = req.body;
    const savedUser = await newUser.create(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/

const createUser = async (req, res) => {
  try {
    // const { nom, prenoms, email } = req.body;
    const newUser = await ser.User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("les erreurs sont encore presentes")
  }
};


// app.post('/books', async (req, res) => {
//   const data = req.body;
//   try {
//     const book = await db.Book.create(data);
//     res.send(book);
//   } catch (err) {
//     res.send(err);
//   }
// })



const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const updateUser = async (req, res) => {
  try {
    const user = await User.update(parseInt(req.params.id), req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};