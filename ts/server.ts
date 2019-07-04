import { Response, Request } from "express";
import { SearchResult } from "./models";
import {
  DebianSearch,
  testSearch,
  testSearch2,
  fakeArchSearch
} from "./searches";
import { SearchWrapper } from "./search_wrapper";

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

app.get("/debian/:search", (req: Request, res: Response) => {
  new SearchWrapper([DebianSearch(req.params.search), fakeArchSearch])
    .doSearch()
    .then((searchResults: SearchResult[]) => res.send(searchResults));
});

app.listen(port, () =>
  console.log("Express http server running on port" + port)
);
