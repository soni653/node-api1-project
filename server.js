const express = require("express");
const db = require("./database.js");

const server = express();

server.use(express.json());

//POST Request
server.post("/api/users", (req, res) => {
  try {
    if (!req.body.name || !req.body.bio) {
      return res.status(400).json({
        errorMessage: "Please provide name and bio for the user.",
      });
    } else {
      const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
      });
      res.status(201).json(newUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

//GET Request
server.get("/api/users", (req, res) => {
  try {
    const users = db.getUsers();

    if (users) {
      res.json(users);
    }
  } catch {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});

//Get Request By Id

server.get("/api/users/:id", (req, res) => {
  let user;
  try {
    user = db.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

//DELETE Request
server.delete("/api/users/:id", (req, res) => {
  try {
    const user = db.getUserById(req.params.id);

    if (user) {
      db.deleteUser(req.params.id);

      res.status(204).end();
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

//PUT Request
server.put("/api/users/:id", (req, res) => {
  let user;
  try {
    user = db.getUserById1(req.params.id);
    if (user) {
      if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
          errorMessage: "Please provide name and bio for the user.",
        });
      } else {
        const updateUser = db.updateUser(req.params.id, {
          name: req.body.name,
          bio: req.body.bio,
        });
        res.status(200).json(updateUser);
      }
      //console.log(user);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

server.listen(7000, () => {
  console.log("Server is listing on port 7000");
});
