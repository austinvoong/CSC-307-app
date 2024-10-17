// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    //console.log("Attempting to delete user with ID:", id); //debugging
    const url = `http://localhost:8000/users/${id}`; 

    fetch(url, { method: "DELETE" }) //fetch the user to be deleted
      .then((response) => {
        if (response.status === 204) { //if successfully deleted, remove the character from the state
          setCharacters((prevCharacters) => 
          prevCharacters.filter((characters) => characters._id!== id)
          );
        } else if (response.status === 404) { // if user not found, log an error message
          console.error("User not found. ");
        } else {
          console.error("Failed to delete user. ", response.status); // if failed to delete, log an error message
        }
      })
      .catch((error) => {
        console.log("Error: ", error); // if any other error, log it
      });
  }

  function updateList(person) {
    postUser(person) // Post the new user to the server
    .then((response) => { 
      if (response.status === 201) { // Check for 201 status
        return response.json(); // Parse the response to JSON
      } else {
      throw new Error('Failed to create user'); // Handle failure
      }
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]); // Add new user to the state
    })
    .catch((error) => {
      console.log(error); // Log any errors
    });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users"); // Fetch all users from the server
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => { // Fetch users
    fetchUsers()
      .then((res) => res.json()) // Parse the response to JSON and set the state with the fetched users list
      .then((json) => setCharacters(json["users_list"])) //
      .catch((error) => { // Log any errors in fetching users
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
