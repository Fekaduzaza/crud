const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "crud",
  password: "d83I1uCkR9Vk1HE2",
  database: "crud",
  connectionLimit: 10,
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database is connected");
  }
});

app.get("/", (req, res) => {
  const sql = `SELECT * FROM student`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/create", (req, res) => {
  const { username, email, password } = req.body;

  const sql = `INSERT INTO student(username,email,password)VALUES(?,?,?)`;
  db.query(sql, [username, email, password], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE student SET `username` =?,`email`=? , `password`=? WHERE ID=?";
  const values = [req.body.username, req.body.email, req.body.password];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

app.delete("/student/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM student  WHERE id=?`;
  db.query(sql, id, (err, data) => {
    if (err) res.json(err);
    console.log("1 record is deleted");
    const response = {
      status: "success",
      message: "user deleted successfully",
    };
    return res.status(200).json(response);
  });
});

app.listen(3001, () => {
  console.log(`server is running on port 3001`);
});
