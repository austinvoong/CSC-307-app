// backend.js
import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors()); // enables CORS for all routes
app.use(express.json()); // parses JSON bodies

app.get("/", (req, res) => { // root route returns hello world message
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query; // filter users by name and job

  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => res.status(500).send(error.message)); //if error, send 500

});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id

  userService
    .findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user); // send user if found
      } else {
        res.status(404).send("Resource not found."); // user not found
      }
    })
    .catch((error) => res.status(500).send(error.message)); // handle errors
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/users`);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body; 
  // addUser(userToAdd);
  // res.status(201).send(userToAdd); //add user
  userService
    .addUser(userToAdd)
    .then((user) => res.status(201).send(user))  // send created user
    .catch((error) => res.status(500).send(error.message)); // handle errors
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService  
  .findUserByIdAndDelete(id)  // Directly find and delete the user by ID
  .then((result) => {
    if (result) {
      res.status(204).send();  // User found and deleted
    } else {
      res.status(404).send("Resource not found.");  // User not found
    }
  })
  .catch((error) => res.status(500).send(error.message));  // Handle errors
});
    