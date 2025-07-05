import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "study",
});

db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Welcome.....");
});

//retrive data
app.get("/", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error from Server" });
    return res.json(result);
  });
});

//add product
app.post("/admin/add-product", (req, res) => {
  const { labelno, productname, price } = req.body;

  const sql =
    "INSERT INTO products (labelno, productName, price) VALUES (?, ?, ?)";
  db.query(sql, [labelno, productname, price], (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding product" });

    res.json({ message: "Product added successfully" });
  });
});

//Modify data by id
app.put("/admin/update-product/:labelno", (req, res) => {
  const labelno = req.params.labelno;
  const { productname, price } = req.body;

  if (!productname || !price || isNaN(price)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const sql =
    "UPDATE products SET productName = ?, price = ? WHERE labelno = ?";
  db.query(sql, [productname, price, labelno], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ message: "Error updating product" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  });
});

//delete product by id
app.delete("/admin/delete-product/:labelno", (req, res) => {
  const labelno = req.params.labelno;

  const sql = "DELETE FROM products WHERE labelno = ?";
  db.query(sql, [labelno], (err, result) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "No data found" });

    res.json({ message: "Successfully deleted!" });
  });
});

app.listen(3000, () => {
  console.log("The Server is started");
});
