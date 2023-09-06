import React, { useState } from "react";
import axios from "axios";
import "./add.css";
function Home() {
  const [form, setForm] = useState({
    id: "",
    Title: "",
    Description: "",
    start_date: "",
    end_date: "",
    priority: "Medium",
    status: "",
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
      id: "",
      Title: "",
      Description: "",
      start_date: "",
      end_date: "",
      priority: "",
      status: "",
    });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="Id"
            value={form.id}
            onChange={handleChange}
            pattern="[0-9]+"
            required
            class="mb-1"
          />
          <br />
          <input
            type="text"
            name="Title"
            placeholder="Title"
            value={form.Title}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
          <textarea
            type="text"
            name="Description"
            placeholder="Description"
            value={form.Description}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
          <input
            type="date"
            name="start_date"
            placeholder="Name"
            value={form.start_date}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
          <input
            type="date"
            name="end_date"
            placeholder="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
          <select
            id="dropdown"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <br />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
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

export default Home;
