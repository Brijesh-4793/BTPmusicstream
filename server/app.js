const express = require("express");
const app = express();

const { default: mongoose } = require("mongoose");
require("dotenv/config");
const cors = require("cors");
app.use(cors("http://localhost:3000"));
app.use(express.json());

app.get ("/",(req,res)=>{
    return res.json("hii i am");
});

// user authentication routes
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artist");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);


mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });




app.listen(4000, () => console.log("lisitening to port 4000"));