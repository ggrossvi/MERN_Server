// packages
const { request } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");

// file import
const taskSchema = require("./model/Task");

const Task = mongoose.model("Tasks", taskSchema);

const mongoDBAccess =
  "mongodb+srv://adminuser:adminuser123@clustertask.7ex0g8h.mongodb.net/?retryWrites=true&w=majority";
// const mongoDBAccess =
//   "mongodb+srv://adminuser:adminuser123@codeability.l9qip.mongodb.net/?retryWrites=true&w=majority";

// mongoose
//   .connect(mongoDBAccess, { useNewUrlParser: true })
//   .then(() => {
//     console.log("you app has been connected to mongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

  mongoose.set("strictQuery", false);
  mongoose
    .connect(mongoDBAccess, { useNewUrlParser: true })
    .then(() => {
      console.log("you app has been connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

// creating new task to the DB

// const newTask = new Task({
//   name: "Task1",
//   date: "26/01/2023",
//   isCompleted: false,
// });

// newTask.save();

// read task from the DB
Task.find((err, tasks) => {
  if (err) {
    console.log(err);
  }
  console.log(tasks);
});

// Update a task in the DB
// Task.findOneAndUpdate(
//   { name: "have dinner" },
//   { date: "30/01/2023" },
//   (err, task) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(task);
//   }
// );

// read task from the DB
Task.find((err, tasks) => {
  if (err) {
    console.log(err);
  }
  console.log(tasks);
});

// Delete
// Task.findOneAndDelete({ _id: "63d8394e92557af294654a52" }, (err, task) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(task, "task deleted");
//   }
// });

// app is express requestclient backend sends response
app.get("/task", (request, response) => {
  Task.find((err, task) => {
    if (err) {
      request.send(err);
    }
    response.send(task);
  });
});

app.post("/task", (request, response) => {
  const newTask = new Task({
    name: request.body.name,
    date: request.body.date,
    isCompleted: request.body.isCompleted,
  });

  newTask
    .save()
    .then((task) => response.send("task created"))
    .catch((err) => response.send(err));
});

// app.put()

const port = 8001;

app.listen(port, () => {
  console.log(` we are in port ${port}`);
});

// Update task

// app.patch("/task/:id",(request,response)=>{
//   Task.findOneAndUpdate({_id : r.params.id},{name:req.body.name},(err,task)=>{
//     if(err){
//        res.send(err)
//     }
//     res.send(task)
// })

// })

// app.put("/task/:id",(req,res)=>{
//   Task.findByIdAndUpdate(
//     req.params.id,
//     {
//       isCompleted: req.body.isCompleted,
//       name: req.body.name,
//       date: req.body.date,
//     },
//     (err, task) => {
//       if (err) {
//         res.send(err);
//       }
//       res.send(task);
//     }
//   );

//   // Delete task
//   app.delete("/task/:id", (req, res) => {
//     Task.findByIdAndDelete(req.params.id, (err, task) => {});
//   });
//   //sudo npm install -g nodemon so you don't need to restart ser
//   //nodemon index.js
//   //digital ocean react node
//   //heroku
//   //cyclic.sh
// })
