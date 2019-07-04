"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var SearchWrapper = /** @class */ (function () {
    function SearchWrapper(searches) {
        this.searches = searches;
    }
    SearchWrapper.prototype.doSearch = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var searchesLeft = _this.searches.length;
            var finalSearchResults = [];
            _this.searches.forEach(function (search) {
                searchUrl(search.requestParams).then(function (searchResult) {
                    search
                        .formatFunction(searchResult)
                        .then(function (formattedResults) {
                        finalSearchResults = combineResults(finalSearchResults, formattedResults);
                    });
                });
            });
        });
    };
    return SearchWrapper;
}());
exports.SearchWrapper = SearchWrapper;
var combineResults = function (first, second) {
    return second;
};
var searchUrl = function (requestParams) {
    return new Promise(function (resolve, reject) {
        return request(requestParams, function (error, response, body) {
            if (error)
                reject(error);
            else
                resolve(body);
        });
    });
};
