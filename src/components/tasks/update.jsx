import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./update.css";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/task")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = async (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    axios
      .delete(`http://localhost:3001/task/${post._id}`)
      .then((response) => {
        console.log(response.data);
        alert("Deleted");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("Invalid item");
        } else {
          console.log(error);
        }
      });
  };

  const getStatusProgress = (status) => {
    if (status === "Completed") {
      return 100;
    } else if (status === "UI done,Endpoint done") {
      return 50;
    } else if (status === "UI done") {
      return 25;
    } else if (status === "Almost Done") {
      return 90;
    } else {
      return 0;
    }
  };

  return (
    <div className="posts">
      <div className="ccontainer">
        <div className="card-container">
          {posts.map((post) => (
            <div key={post._id} className="card d-flex">
              <div className="card-body">
                <h3 className="card-title" style={{ textAlign: "center" }}>
                  {post.Title}
                </h3>
                <p className="card-text">
                  <strong>Description: </strong>
                  {post.Description}
                </p>
                <p className="card-text">
                  <strong>Start Date: </strong>
                  {post.start_date}{" "}
                  <strong style={{ marginLeft: "40px" }}>End Date: </strong>
                  {post.end_date}
                </p>
                <p className="card-text">
                  <strong>Priority: </strong>
                  {post.priority}{" "}
                  <strong style={{ marginLeft: "70px" }}>Status: </strong>
                  <span
                    style={{
                      width: "70px",
                      wordBreak: "break-all",
                    }}
                  >
                    {" "}
                    {post.status}
                  </span>
                </p>
                <div class="card-footer">
                  <button
                    onClick={() => navigate(`/manage`)}
                    className="btn btn-success mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
                <div className="progress" style={{ height: "15px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${getStatusProgress(post.status)}%` }}
                    aria-valuenow={getStatusProgress(post.status)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {getStatusProgress(post.status)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
