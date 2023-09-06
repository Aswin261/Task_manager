import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

function TaskModal(props) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    details: "",
    subtasks: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: [
        ...prevTask.subtasks,
        {
          id: "",
          name: "",
          assignedTo: "",
          timeToFinish: "",
          deadline: "",
          status: "",
        },
      ],
    }));
  };

  const handleSubtaskInputChange = (event, subtaskKey, key) => {
    const { value } = event.target;
    setTask((prevTask) => {
      const subtasks = [...prevTask.subtasks];
      subtasks[subtaskKey][key] = value;
      return {
        ...prevTask,
        subtasks,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { subtasks, ...rest } = task;
      const data = {
        ...rest,
        subtasks: subtasks.map(
          ({ id, name, assignedTo, timeToFinish, deadline, status }) => ({
            id,
            name,
            assignedTo,
            timeToFinish,
            deadline,
            status,
          })
        ),
      };
      const res = await axios.post("http://localhost:3001/task", data);
      console.log(res.data);
      if (res.status === 201) {
        alert("Data added successfully");
        setTask({
          id: "",
          name: "",
          details: "",
          subtasks: [],
        });
        props.onClose();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
      alert("Data added");
    }
  };

  return (
    <Modal isOpen={props.isOpen} className="custom-modal">
      <form onSubmit={handleSubmit}>
        <label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input
          type="number"
          name="id"
          value={task.id}
          onChange={handleInputChange}
          placeholder="id"
          required
        />
        <br />
        <label>Task Name:&nbsp;</label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <label style={{ display: "inline-block" }}>Task details: </label>
        <input
          type="text"
          name="details"
          value={task.details}
          onChange={handleInputChange}
          required
        />
        <span>
          <button className="btn1" onClick={handleButtonClick}>
            <i className="fa-solid fa-share-from-square"></i>
          </button>
          {task.subtasks.map((subtask, subtaskKey) => (
            <span key={subtaskKey} style={{ marginLeft: "70px" }}>
              <input
                type="text"
                name="name"
                placeholder="Subtask Name"
                value={subtask.name}
                style={{ width: "300px" }}
                onChange={(event) =>
                  handleSubtaskInputChange(event, subtaskKey, "name")
                }
                required
              />
              <input
                type="text"
                name="assignedTo"
                placeholder="Assign To"
                value={subtask.assignedTo}
                style={{ width: "100px" }}
                onChange={(event) =>
                  handleSubtaskInputChange(event, subtaskKey, "assignedTo")
                }
                required
              />
              <input
                type="time"
                name="timeToFinish"
                value={subtask.timeToFinish}
                style={{ width: "120px" }}
                min="1"
                max="12"
                step="3600"
                onChange={(event) =>
                  handleSubtaskInputChange(event, subtaskKey, "timeToFinish")
                }
                required
              />
              <input
                type="datetime-local"
                name="deadline"
                value={subtask.deadline}
                onChange={(event) =>
                  handleSubtaskInputChange(event, subtaskKey, "deadline")
                }
                required
              />
              <select
                style={{ width: "150px" }}
                name="status"
                value={subtask.status}
                onChange={(event) =>
                  handleSubtaskInputChange(event, subtaskKey, "status")
                }
                required
              >
                <option value="">Select status</option>
                <option value="Completed">Completed</option>
                <option value="Not yet started">Not yet Started</option>
                <option value="On progress">On progress</option>
              </select>

              <br />
            </span>
          ))}
        </span>
        <br />
        <div class="button">
          <button className="btn" type="submit">
            Add
          </button>
          <button className="btn" onClick={props.onClose}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskModal;
