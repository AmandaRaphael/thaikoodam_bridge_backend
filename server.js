import express from "express"
import mongoose from "mongoose";
import profileRoute from "./routes/profileRoute.js"
import cors from "cors"

const app = express();

app.use(express.json());

app.use(cors());

app.use("/profiles", profileRoute)

const connectionString= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`


mongoose
  .connect(
   connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("We are connected to the database"))
  .catch(() => console.log("We are not connected to the database"));

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is listening');
    
})