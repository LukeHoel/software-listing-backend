import { Response, Request } from "express";
import {
  DebianSearch,
  ArchSearch,
  FedoraSearch,
  DebianDetail
} from "./requests";
import { RequestWrapper } from "./request_wrapper";
import { RequestResult } from "./models";

/*********************************************************************************
 *
 * Online (Heroku) Link: https://software-listing-backend.herokuapp.com
 *
 *******************************************************************************/

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// Allow requests from anywhere
const cors = require("cors");
app.use(cors());

app.get("/search/:search", async (req: Request, res: Response) => {
  const searchResults: RequestResult[] = await new RequestWrapper([
    DebianSearch(req.params.search),
    ArchSearch(req.params.search),
    FedoraSearch(req.params.search)
  ]).doRequest();
  res.send(searchResults);
});

app.get("/detail/:search", async (req: Request, res: Response) => {
  const searchResults: RequestResult[] = await new RequestWrapper([
    DebianDetail(req.params.search)
  ]).doRequest();
  res.send(searchResults);
});

app.listen(port, () =>
  console.log("Express http server running on port" + port)
);
