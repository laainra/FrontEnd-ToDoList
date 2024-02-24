const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./src/models");
const todoRoutes = require("./src/routes/todo.routes");
const authRoutes = require("./src/routes/auth.routes");

// Enable CORS with specific origin
// const corsOptions = {
//   origin: "http://localhost:3500",
//   methods: "GET,PUT,POST,OPTION, DELETE"
// };

app.use(cors());
// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Set Content-Type header to application/json for all responses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Laila's To Do List application." });
});

// Define todo routes
todoRoutes(app);
authRoutes(app);

// Sync database without dropping tables
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized.");
  initial();
});

// Set port and start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = db.role;

function initial() {
  Role.findOrCreate({
    where: { id: 1 },
    defaults: { name: "user" }
  });

  Role.findOrCreate({
    where: { id: 2 },
    defaults: { name: "admin" }
  });
}
