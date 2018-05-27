import express from "express";

import { createRouter } from "./server/todos";

const app = express();

app.listen(3001, () => {
  app.use(express.urlencoded());
  app.use(express.json());

  app.use("/", createRouter());

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: `Something went wrong` });
  });

  console.info("Server listening on port 3001");
});
