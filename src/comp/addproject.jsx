import React, { useState } from "react";
import axios from "axios";
import "./Addpro.css";
import Modal from "react-modal";
function Add() {
  const [form, setForm] = useState({
    id: "",
    project: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/Project", form);
      console.log(res.data);
      alert("Task added successfully");
    } catch (err) {
      console.error(err);
      if (err.response.status === 409) {
        alert(err.response.data.error);
      } else {
        alert("Task cannot be added");
      }
    }
    setForm({
      id: "",
      project: "",
    });
    setModalIsOpen(false);
  };

  return (
    <div class="add-container">
      <button
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={() => setModalIsOpen(true)}
      >
        <i
          class="fa-solid fa-plus"
          style={{ color: "#f40101", fontSize: "30px" }}
        ></i>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="addform"
      >
        <div className="d-flex">
          <form
            className="border border-primary rounded p-3 m-2 px-5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="id"
              placeholder="Enter Id"
              value={form.id}
              onChange={handleChange}
              pattern="[0-9]+"
              required
              className="mb-1"
            />
            <br />
            <input
              type="text"
              name="project"
              placeholder="Enter Title"
              value={form.project}
              onChange={handleChange}
              required
              className="mb-1"
            />
            <br />
            <button
              className="bg-primary text-light border rounded p-1 mx-5"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Add;
