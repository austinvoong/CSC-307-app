// src/Table.jsx
import React from "react";

function TableHeader() { //Table header component
  return (
    <thead>
      <tr>
        <th>ID</th> 
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) { //Table body component
  const rows = props.characterData.map((row,index) =>
  {
    return (
        <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
                <button onClick={() => props.removeCharacter(row.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
  }
  );
    return(
        <tbody>
            {rows}
        </tbody>
    );
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody 
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}
export default Table;