const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenoms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    // picture: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // types: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  }, {
    timestamps: true,
    // createdAt: 'created',
    updatedAt: false
  });
  User.sync();
  return User;
}

