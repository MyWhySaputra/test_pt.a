const db = require("./config/Database_MySQL");
const express = require("express");
const router = require("./routes/routes");
const swaggerUi = require("swagger-ui-express");
const swagger = require("./helpers/swagger.helper");

const app = express();


// Migrate database

// (async () => {
//   await db.sync();
//   console.log("Database connected");
// })();

app.use(express.json());

app.use("/", router);
app.use("/docs", swaggerUi.serve, swagger);

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});