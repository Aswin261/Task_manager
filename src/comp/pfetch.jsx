import { useEffect, useState } from "react";
import "./pfetch.css";
import axios from "axios";

const Posts = ({ taskId }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/task`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [taskId]);
  // console.log(taskId);
  const getDates = () => {
    const today = new Date();
    const weekend = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    const dates = [];

    for (let date = today; date <= weekend; date.setDate(date.getDate() + 1)) {
      const dateString = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });

      dates.push(dateString);
    }

    return dates;
  };

  const reddot = (
    <svg width="20" height="20">
      <rect x="2" y="2" width="16" height="16" fill="red" />
    </svg>
  );
  const bluedot = (
    <svg width="20" height="20">
      <rect x="2" y="2" width="16" height="16" fill="blue" />
    </svg>
  );
  const greendot = (
    <svg width="20" height="20">
      <rect x="2" y="2" width="16" height="16" fill="green" />
    </svg>
  );

  const getDeadlineColor = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    if (deadlineDate > today) {
      return "#00c3e3";
    } else if (deadlineDate.toDateString() === today.toDateString()) {
      return "#24ff05";
    } else {
      return "#f70d1a";
    }
  };
  return (
    <div className="fetch">
      <div>
        {posts.map((data, index) => (
          <div>
            {/* <h3 className="card-title">{data.name}</h3>
            <p className="card-details">
              <b>Task Details: </b>
              {data.details}
              <button
                style={{
                  marginLeft: "40px",
                  backgroundColor: "indigo",
                  color: "white",
                  borderRadius: "3px",
                }}
              >
                Reminder
              </button>
            </p>  */}
            <div>
              <div class="mt-5">
                <table className="table-sm tablestyle table-striped table-striped-columns  d-flex justify-content-left table-responsive">
                  <tbody className="tab">
                    <tr>
                      <th style={{ border: "solid" }}>
                        <b>SubTask</b>
                      </th>
                      <th style={{ border: "solid" }}>
                        <b>Assigned To</b>
                      </th>
                      <th style={{ border: "solid" }}>
                        <b>Task Duration</b>
                      </th>
                      <th style={{ border: "solid" }}>
                        <b>Deadline</b>
                      </th>
                      <th style={{ border: "solid" }}>
                        <b>Status</b>
                      </th>
                      {getDates().map((date, ind) => (
                        <th style={{ border: "solid" }} key={ind}>
                          {date}
                        </th>
                      ))}

                      {/* <th style={{ border: "solid" }}>
                        <b>progress</b>
                      </th> */}
                      {/* {getDates()} */}
                      {/* <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          marginLeft: "5px",
                        }}
                        onClick={handleProjectClick}
                      >
                        <i
                          class="fa-solid fa-pen-to-square"
                          style={{ color: "#0561ff", fontSize: "20px" }}
                        ></i>
                      </button> */}
                    </tr>
                    {data.subtasks.map((subtask, Index) => (
                      <tr class="center" key={Index}>
                        <td
                          style={{
                            border: "solid",
                            width: "400px",
                            wordBreak: "break-word",
                          }}
                        >
                          {subtask.name}
                        </td>
                        <td style={{ border: "solid" }}>
                          {subtask.assignedTo}
                        </td>
                        <td style={{ border: "solid" }}>
                          {subtask.timeToFinish} Hours
                        </td>
                        <td
                          style={{
                            border: "solid",
                            backgroundColor: getDeadlineColor(subtask.deadline),
                          }}
                        >
                          {subtask.deadline}
                        </td>
                        <td style={{ border: "solid" }}>{subtask.status}</td>
                        {/* <td style={{ border: "solid" }}>
                          {subtask.status === "Completed" ? (
                            <svg width="20" height="20">
                              <rect
                                x="2"
                                y="2"
                                width="16"
                                height="16"
                                fill="green"
                              />
                            </svg>
                          ) : subtask.status === "On progress" ? (
                            <svg width="20" height="20">
                              <rect
                                x="2"
                                y="2"
                                width="16"
                                height="16"
                                fill="blue"
                              />
                            </svg>
                          ) : (
                            <svg width="20" height="20">
                              <rect
                                x="2"
                                y="2"
                                width="16"
                                height="16"
                                fill="red"
                              />
                            </svg>
                          )}
                        </td> */}
                        {/* {getProgress(subtask.deadline, subtask)} */}

                        {/* {getDates().map((date) => (
                          <td key={date} style={{ border: "solid" }}>
                            {date === subtask.deadline ? (
                              subtask.status === "Completed" ? (
                                <svg width="20" height="20">
                                  <rect
                                    x="2"
                                    y="2"
                                    width="16"
                                    height="16"
                                    fill="green"
                                  />
                                </svg>
                              ) : subtask.status === "On progress" ? (
                                <svg width="20" height="20">
                                  <rect
                                    x="2"
                                    y="2"
                                    width="16"
                                    height="16"
                                    fill="blue"
                                  />
                                </svg>
                              ) : (
                                <svg width="20" height="20">
                                  <rect
                                    x="2"
                                    y="2"
                                    width="16"
                                    height="16"
                                    fill="red"
                                  />
                                </svg>
                              )
                            ) : null}
                          </td>
                        ))} */}

                        {getDates().map((date) => (
                          <td>
                            {{ date } === subtask.deadline
                              ? subtask.status === "Not yet Started"
                                ? reddot
                                : subtask.status === "On Progress"
                                ? bluedot
                                : greendot
                              : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
