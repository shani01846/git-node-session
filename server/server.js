require("dotenv").config()
const express = require("express")
const cors =require("cors")
const corsOptions = require("./config/corsOptions")
const  connectDB = require("./config/dbConn")
const authRoute = require("./Routes/authRoute")
const userRoute = require("./Routes/userRoute")
const appartmentRoute = require("./Routes/appartmentRoute")
const app = express()
console.log(process.env.PORT);
const PORT = process.env.PORT || 2500
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use('/authUser',authRoute)
app.use('/basket',userRoute)
app.use('/appartment',appartmentRoute)
connectDB()
 .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
    process.exit(1); // סיום תהליך אם אין DB
  });

