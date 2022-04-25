const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const Todo = require("./models/Todo");
const path = require("path");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(
  "mongodb+srv://rickypatel:SmC0izE0vpukjuF1@cluster0.yhfgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/signup", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    score: 0,
    level: "Beginner",
    streak: 0,
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        title: "error",
        error: "Email already in use",
      });
    }
    return res.status(200).json({
      title: "User successfully added",
    });
  });
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    if (!user) {
      return res.status(400).json({
        title: "user is not found",
        error: "invalid email or password",
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login failed",
        error: "invalid email or password",
      });
    }

    // authentication is done, give them a token
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      title: "login successful",
      token: token,
    });
  });
});

// get todo route
app.get("/todos", (req, res) => {
  // verify
  jwt.verify(req.headers.token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });

    // now we know token is valid
    Todo.find({ author: decoded.userId }, (err, todos) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "success",
        todos: todos,
      });
    });
  });
});

// mark todo as completed route
app.post("/todo", (req, res) => {
  // verify
  jwt.verify(req.headers.token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });

    let newTodo = new Todo({
      title: req.body.title,
      isCompleted: false,
      author: decoded.userId,
    });

    newTodo.save((error) => {
      if (error) return console.log(error);
      return res.status(200).json({
        title: "successfully added",
        todo: newTodo,
      });
    });
  });
});

app.put("/todo/:todoId", (req, res) => {
  jwt.verify(req.headers.token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });

    // now we know token is valid
    Todo.findOne(
      { author: decoded.userId, _id: req.params.todoId },
      (err, todo) => {
        if (err) return console.log(err);

        todo.isCompleted = true;
        todo.save((error) => {
          if (error) return console.log(error);

          User.findOneAndUpdate(
            { _id: decoded.userId },
            { $inc: { score: 1 } },
            { new: true },
            function (err, user) {
              if (err) {
                console.log(err);
              }
            }
          );

          //saved
          return res.status(200).json({
            title: "success",
            todo: todo,
          });
        });
      }
    );
  });
});

app.get("/leaderboard", (req, res) => {
  User.find({}, function (err, users) {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    var usersList = [];
    users.forEach(function (user) {
      usersList.push(user);
    });
    return res.status(200).json({
      title: "success",
      usersList: usersList,
    });
  });
});

app.get("/userdetails", (req, res) => {
  // console.log("user details route");

  jwt.verify(req.headers.token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorized",
      });

    User.findOne({ _id: decoded.userId }, function (err, user) {
      if (err)
        return res.status(500).json({
          title: "server error",
          error: err,
        });
      return res.status(200).json({
        title: "success",
        user: user,
      });
    });
  });
});

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Server running on port: ", port);
});
