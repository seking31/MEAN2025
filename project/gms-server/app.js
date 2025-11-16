const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { notFoundHandler, errorHandler } = require("./src/error-handler");

const indexRouter = require("./src/routes/index");
const gardenRouter = require("./src/routes/garden/index");
const plantRouter = require("./src/routes/plant/index");

let app = express();

const connectionString =
  "mongodb+srv://gms_user:s3cret@bellevueuniversity.qxxmbuj.mongodb.net/?appName=BellevueUniversity";
const dbName = "gms";

async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {
      dbName: dbName,
    });

    console.log(`Connection to the '${dbName}' database was successful`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

if (process.env.NODE_ENV !== "test") {
  connectToDatabase();
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  next();
});
// Express app configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Routing configuration
app.use("/api/gardens", gardenRouter);
app.use("/api/plants", plantRouter);
app.use("/api", indexRouter);
// Use the error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);
// Export the app
module.exports = app;
