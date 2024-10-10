// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id); //filters users by id

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name); //filters users by name
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query; // filter users by name and job
  let result = users["users_list"]; //get all users by default
  
  if (name) {
    result = findUserByName(name); //filter users by name
  }
  if (job) {
    result = users["users_list"].filter((user) => user["job"] === job); //filter users by job
  }

  res.send({users_list: result}); //sends whichever
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id); //find user by id
  if (result === undefined) { //if user not found, send 404
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/users`);
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUser = (id) => {
    const index = users["users_list"].findIndex((user) => user["id"] === id); //find user by id and remove it
    if (index!== -1) {
      users["users_list"].splice(index, 1);
    }
  };

app.delete("/users/:id", (req, res) => {
    deleteUser(req.params["id"]);     //remove user
});