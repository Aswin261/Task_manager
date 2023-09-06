import React, { useState, useEffect } from "react";
import axios from "axios";
import "./task.css";
// import Add from "./addproject";
import "./project.css";
import TaskModal from "./taskModal";
import Posts from "./pfetch";
import Update from "./modify";

function Project() {
  const [customerIds, setCustomerIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pid, setPid] = useState("");
  const [isModal, setIsModal] = useState(false);
  const handleClick = () => {
    setIsModal(true);
  };

  const handleModal = () => {
    setIsModal(false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/project")
      .then((response) => {
        const ids = response.data.map((record) => record);
        setCustomerIds(ids);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(pid);
  }, [customerIds, pid]);

  const handleProjectClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="navbar">
      <ul className="ul">
        {/* <Add /> */}
        <select
          style={{ width: "200px" }}
          onChange={(e) => {
            setPid(e.target.value);
          }}
        >
          <option value="">Project Name</option>
          {customerIds.map((id) => (
            <option key={id.id} value={id.id}>
              {id.project}
            </option>
          ))}
        </select>
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={handleProjectClick}
        >
          <i
            class="fa-solid fa-plus"
            style={{ color: "#f40101", fontSize: "30px" }}
          ></i>
        </button>
        <Update isOpen={isModal} onClose={handleModal} />
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            marginLeft: "5px",
            paddingTop: "6px",
          }}
          onClick={handleClick}
        >
          <i
            class="fa-solid fa-pen-to-square"
            style={{ color: "#0561ff", fontSize: "25px" }}
          ></i>
        </button>
      </ul>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Posts taskId={pid} />
    </div>
  );
}

export default Project;
