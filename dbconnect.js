const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");
let db;
const app = express();
app.use(express.json());
app.use(cors());
connectToDb((err) => {
  if (!err) {
    app.listen(3001, () => {
      console.log("listening on port 3001");
    });
    db = getDb();
  }
});

app.get("/project", (req, res) => {
  let posts = [];
  db.collection("Project")
    .find()
    .sort({ id: 1 })
    .forEach((post) => posts.push(post))
    .then(() => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: "fetch the documents" });
    });
});

app.get("/task", (req, res) => {
  let projects = [];
  db.collection("Task")
    .find()
    .sort({ id: 1 })
    .forEach((project) => projects.push(project))
    .then(() => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});
// app.get("/task/:taskId", (req, res) => {
//   const taskId = Number(req.params.taskId);
//   db.collection("Task")
//     .findOne({ id: taskId })
//     .then((task) => {
//       res.status(200).json(task);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: "Could not fetch the document" });
//     });
// });

//getting prefilled on selectin id
app.get("/task/:id", async (req, res) => {
  try {
    const task = await db
      .collection("Task")
      .findOne({ id: Number(req.params.id) });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the task" });
  }
});

//Add task
app.post("/project", (req, res) => {
  db.collection("project")
    .findOne({ id: Number(req.body.id) })
    .then((existingUser) => {
      if (existingUser) {
        res.status(409).json({ error: "Customer with this ID already exists" });
      } else {
        db.collection("Project")
          .insertOne({
            id: Number(req.body.id),
            project: req.body.project,
          })
          .then((result) => {
            res.status(201).json(result.value);
          })
          .catch((err) => {
            res.status(500).json({ error: "Could not create a document" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not check for existing user" });
    });
});

app.post("/task", (req, res) => {
  db.collection("Task")
    .find({ id: Number(req.body.id) })
    .toArray()
    .then((existingTask) => {
      if (existingTask.length > 0) {
        res.status(409).json({ error: "Task with this name already exists" });
      } else {
        const newTask = {
          id: Number(req.body.id),
          name: req.body.name,
          details: req.body.details,
          subtasks: req.body.subtasks.map((subtask) => ({
            name: subtask.name,
            assignedTo: subtask.assignedTo,
            timeToFinish: subtask.timeToFinish,
            deadline: new Date(subtask.deadline).toLocaleDateString("en-US"),
            status: subtask.status,
          })),
        };
        db.collection("Task")
          .insertOne(newTask)
          .then((result) => res.status(201).json(result.ops[0]))
          .catch((err) =>
            res.status(500).json({ error: "Could not create a document" })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "Could not check for existing task" })
    );
});

app.get("/task", (req, res) => {
  let customerIds = [];
  db.collection("Task")
    .find()
    .sort({ id: 1 })
    .forEach((record) => customerIds.push(record.id))
    .then(() => {
      res.status(200).json(customerIds);
    })
    .catch(() => {
      res.status(500).json({ error: "Failed to fetch the customer IDs" });
    });
});
//Update Task

app.put("/task/:id", (req, res) => {
  const taskId = req.params.id;
  const updatedTask = {
    name: req.body.name,
    details: req.body.details,
    subtasks: req.body.subtasks.map((subtask) => ({
      name: subtask.name,
      assignedTo: subtask.assignedTo,
      timeToFinish: subtask.timeToFinish,
      deadline: new Date(subtask.deadline).toLocaleDateString("en-US"),
      status: subtask.status,
    })),
  };

  db.collection("Task")
    .updateOne({ id: taskId }, { $set: updatedTask })
    .then(() =>
      db
        .collection("Task")
        .findOne({ id: taskId })
        .then((updatedDocument) => res.status(200).json(updatedDocument))
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ error: "Could not find the updated document" });
        })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Could not update the document" });
    });
});
