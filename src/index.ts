import express from "express";

import viagemRouter from "../routes/viagens";

const app = express();
const port = 8000;

app.use(express.json());
app.use("/", viagemRouter);

app.listen(port, () => {
  console.log(`Port ${port} S U A V E`);
});
