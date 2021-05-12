require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const formData = require("express-form-data");
const config = require("./config");
const app = express();

const port = config.port || 3006;

app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(formData.parse());

// ROUTES

// ADMIN ENDPOINTS
app.use("/api/v1/admin", require("./routes/admin"));

// LISTENER ENDPOINTS
app.use("/api/v1/listener", require("./routes/listener"));

// PUBLISHER ENDPOINTS
app.use("/api/v1/publisher", require("./routes/publisher"));

// GENRE ENDPOINTS
app.use("/api/v1/genre", require("./routes/genre"));

// ALBUM ENDPOINTS
app.use("/api/v1/album", require("./routes/album"));

// SONG ENDPOINTS
app.use("/api/v1/song", require("./routes/song"));

// SEARCH ENDPOINTS
app.use("/api/v1/search", require("./routes/search"));

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
