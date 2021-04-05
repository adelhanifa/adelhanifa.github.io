const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
// route
const api = require("./routes/apiRouter.js");

app.use(cors());
app.use(express.json());

// get all passwords
app.use("/api", api);

// wrong url or request method
app.use(function (req, res) {
  res.status(404).send({ msg: "page not found" });
});

module.exports = app.listen(PORT, () =>
  console.log(`server running on port : http://localhost:${PORT}`)
);
