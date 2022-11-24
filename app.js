const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv   = require("dotenv")
dotenv.config()
app.use(express.json())
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL,()=>{
        console.log("database connected");
      })
    } catch (err) {
      console.log('error: ' + err)
    }
  })()

app.get("/",(req,res)=>{
    res.status(200).json("app is running....")
})

app.use("/api/users", userRoute);
app.use("/api/authenticate", authRoute);
app.use("/api/posts",postRoute);

app.listen(8081,()=>{
    console.log("server running on 8081....");
})

module.exports = app;