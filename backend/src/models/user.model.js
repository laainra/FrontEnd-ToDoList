module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING,
        allowNull: false // Name cannot be null
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, // Username cannot be null
        unique: true // Username must be unique
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false // Password cannot be null
      }
    });
  
    return User;
  };
  