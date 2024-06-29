const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const newUser = req.body;
  let userAlreadyExists = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === newUser.email) {
      userAlreadyExists = true;
    }
  }
  if (userAlreadyExists) {
    res.status(409).json("User already exists");
  } else {
    users.push(newUser);
    res.status(201).json("User created successfully");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let userFound = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      userFound = true;
    }
  }
  if (userFound) {
    res.status(200).json({
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
    });
  } else {
    res.status(401).json("Login failed");
  }
});

app.get("/data", (req, res) => {
  var email = req.headers.email;
  var password = req.headers.password;
  let userFound = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      userFound = true;
    }
  }
  if (userFound) {
    let usersToReturn = [];
    users.forEach((user) => {
      usersToReturn.push({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
    res.status(200).json(usersToReturn);
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
