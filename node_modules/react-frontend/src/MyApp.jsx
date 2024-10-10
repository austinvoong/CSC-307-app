// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id, index) {
    //const characterToRemove = characters[index];
    const url = `http://localhost:8000/users/${id}`;

    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (response.statues === 204) {
          const updated = characters.filter((_, i) => {
            return i !== index;
          });
          setCharacters(updated);
        } else if (response.status === 404) {
          console.error("User not found. ");
        } else {
          console.error("Failed to delete user. ", response.status);
        }
      })
      .catch((error) => {
        console.log("Error deleting user: ", error);
      });
  }

  function updateList(person) {
    //setCharacters([...characters, person]);
    postUser(person)
    .then((response) => {
      if (response.status === 201) { // Check for 201 status
        return response.json(); // Parse the response to JSON
      }
      throw new Error('Failed to create user'); // Handle failure
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]); // Add new user to the state
    })
    .catch((error) => {
      console.log(error); // Log any errors
    });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
