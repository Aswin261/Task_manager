import React, { useState } from "react";
import axios from "axios";
import "./task.css";
function Task() {
  const [form, setForm] = useState({
    taskName: "",
    assignto: "",
    deadline: "",
    status: "",
    date: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/task", form);
      console.log(res.data);
      alert("Data added successfully");
    } catch (err) {
      console.error(err);
      if (err.response.status === 409) {
        alert(err.response.data.error);
      } else {
        alert("Data cannot be added");
      }
    }
    setForm({
      taskName: "",
      assignto: "",
      deadline: "",
      status: "",
      date: "",
    });
  };

  return (
    <div>
      <div className="con">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="Task Name"
            value={form.taskName}
            onChange={handleChange}
            pattern="[0-9]+"
            required
            class="mb-1"
          />
          <input
            type="text"
            name="Assign TO"
            placeholder="Assign To"
            value={form.assignto}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <input
            type="text"
            name="Description"
            placeholder="Deadline"
            value={form.deadline}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <input
            type="date"
            name="start_date"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <input
            type="date"
            name="end_date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <button
            class="bg-primary text-light border rounded p-1 mx-5"
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default Task;
