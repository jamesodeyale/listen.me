require("dotenv").config();
const express = require("express");
const formData = require("express-form-data");
const morgan = require("morgan");
const cors = require("cors");
var multer = require("multer");

var upload = multer({ dest: "./uploads/" });
const config = require("./config");
const app = express();

const port = config.port || 3006;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use(formData.parse());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// ROUTES

// ADMIN ENDPOINTS
app.use("/api/v1/admin", require("./routes/admin"));

// LISTENER ENDPOINTS
app.use("/api/v1/listener", require("./routes/listener"));

// PUBLISHER ENDPOINTS
app.use("/api/v1/publisher", require("./routes/publisher"));

// GENRE ENDPOINTS
app.use("/api/v1/genre", require("./routes/genre"));

// SONG ENDPOINTS
app.use("/api/v1/song", require("./routes/song"));

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
