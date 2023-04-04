const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
// Route pour récupérer tous les utilisateurs
router.get('/',userController.getAllUsers);

// Route pour créer un nouvel utilisateur
router.post('/', userController.createUser);

// Route pour récupérer un utilisateur par son ID
router.get('/:id',  userController.getUserById);

// Route pour mettre à jour un utilisateur par son ID
router.patch('/:id',  userController.updateUser);

// Route pour supprimer un utilisateur par son ID
router.delete('/:id',  userController.deleteUser);




module.exports = router;