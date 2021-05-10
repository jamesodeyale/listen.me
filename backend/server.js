require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3006;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES

// ADMIN ENDPOINTS
app.use("/api/v1/admin", require("./routes/admin"));

// LISTENER ENDPOINTS
// app.use("/api/v1/listener", require("./routes/listener"));

// PUBLISHER ENDPOINTS
// app.use("/api/v1/publisher", require("./routes/publisher"));

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
