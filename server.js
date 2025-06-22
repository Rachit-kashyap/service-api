const express = require('express');
require("dotenv").config();
const fs = require("fs").promises;
const path = require('path');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.get('/getdata', async (req, res) => {
  try {
    let data = await fs.readFile(path.join(__dirname, "data.json"), "utf-8");
     data = JSON.parse(data); 
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error reading data file");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
