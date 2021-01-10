const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3005;
app.use(cors());

const MONGOURI =
  "mongodb+srv://admin:user123456@cluster0.qj2nm.mongodb.net/db-app?retryWrites=true&w=majority";

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

async function start() {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`app has been started on PORT ${PORT}`);
    });
    // const dbConnection = mongoose.connection;
    // dbConnection.on("error", (err) => console.log("connection error ", err));
    // dbConnection.once("open", () => console.log("connected to db"));
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}
start();
