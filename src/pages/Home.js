import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();


  useEffect(function () {
    fetch("http://localhost:5000/tasks") 
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTasks(data);
      });
  }, []);

  function handleDelete(id) {
  fetch("http://localhost:5000/tasks/" + id, {
    method: "DELETE",
  })
    .then(function () {

      setTasks(function (prevTasks) {
        return prevTasks.filter(function (task) {
          return task.id !== id;
        });
      });
    });
}


  return (
    <div>
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map(function (task) {
            return (
              <li key={task.id}>
                {task.title} - {task.status}
                <button
                onClick={function () {
                  handleDelete(task.id);
                }}
                style={{marginLeft:"10px"}}Edit
                >
                  Delete
                </button>
                <button
                onClick={function () {
                  navigate("/tasks/" + task.id);
                }}
                >
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
