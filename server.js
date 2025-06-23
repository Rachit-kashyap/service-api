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
    res.json({success:true,data,message:"Data Fetch Success"});
  } catch (err) {
    console.error(err.message,"come at getdata route");
    res.status(500).send("Error reading data file");
  }
});


app.get('/getdata/:id', async (req, res) => {
  try {
    let data = await fs.readFile(path.join(__dirname, "data.json"), "utf-8");
    data = JSON.parse(data);
    const id = req.params.id;
    const found = data.find(item => item.id == id);
    if (found) {
      res.json({success:true,message:"Data Fetch Success",data:found});
    } else {
      res.status(404).json({success:false,message:"Invalid id"});
    }
  } catch (err) {
    console.error(err.message,"come at getdata/id route");
    res.status(500).send("Error reading data file");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
