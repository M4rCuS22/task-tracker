import React, { useState } from "react";

function AddTask() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newTask = {
      title: title,
      status: status
    };

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then(function (response) {
        if (!response.ok) {
          console.log("Something went wrong");
          return;
        }
        return response.json();
      })
      .then(function (data) {
        if (data) {
          setSuccessMessage("Task added successfully!");
          setTitle("");
          setStatus("pending");
        }
    })
}

  return (
    <div>
      <h2>Add a New Task</h2>

      {successMessage && <p>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={function (event) {
              setTitle(event.target.value);
            }}
            required
          />
          
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Status:</label><br />
          <select
            value={status}
            onChange={function (event) {
              setStatus(event.target.value);
            }}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
