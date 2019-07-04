"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searches_1 = require("./searches");
var search_wrapper_1 = require("./search_wrapper");
/*********************************************************************************
 *
 * Online (Heroku) Link: https://software-listing-backend.herokuapp.com
 *
 *******************************************************************************/
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
// Allow requests from anywhere
var cors = require("cors");
app.use(cors());
app.get("/debian/:search", function (req, res) {
    new search_wrapper_1.SearchWrapper([searches_1.DebianSearch(req.params.search), searches_1.fakeArchSearch])
        .doSearch()
        .then(function (searchResults) { return res.send(searchResults); });
});
app.listen(port, function () {
    return console.log("Express http server running on port" + port);
});
