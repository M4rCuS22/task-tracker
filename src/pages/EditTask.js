import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(function () {
    fetch("http://localhost:5000/tasks/" + id)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTitle(data.title);
        setStatus(data.status);
      });
  }, [id]);

  function handleUpdate(event) {
    event.preventDefault();

    fetch("http://localhost:5000/tasks/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        status: status
      })
    }).then(function () {
      navigate("/");
    });
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleUpdate}>
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

        <div style={{marginTop: "10px"}}>
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

        <button type="submit" style={{ marginTop: "15px" }}>Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;
