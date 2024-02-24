// todo.model.js
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      // Define foreign key for username referencing the User model
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'users', // Name of the table
          key: 'username', // Primary key of the referenced table
        },
        onUpdate: 'CASCADE', // Update the foreign key if the referenced key is updated
        onDelete: 'CASCADE', // Delete the todo if the user is deleted
      }
    });
  
    return Todo;
};
