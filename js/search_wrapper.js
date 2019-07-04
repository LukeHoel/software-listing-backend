"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_utils_1 = require("./search_utils");
var SearchWrapper = /** @class */ (function () {
    function SearchWrapper(searches) {
        this.searches = searches;
        return this;
    }
    SearchWrapper.prototype.doSearch = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var searchesLeft = _this.searches.length;
            var finalSearchResults = [];
            // Keep track of multiple requests going out at the same time, and send back when the last one has gone off
            _this.searches.forEach(function (search) {
                search_utils_1.searchUrl(search.requestParams).then(function (searchResult) {
                    // Each search has a different formatting function
                    search_utils_1.formatPromise(search.formatFunction, search_utils_1.safeParse(searchResult)).then(function (formattedResults) {
                        finalSearchResults = search_utils_1.combineResults(finalSearchResults, formattedResults);
                        if (--searchesLeft <= 0)
                            resolve(finalSearchResults);
                    });
                });
            });
        });
    };
    return SearchWrapper;
}());
exports.SearchWrapper = SearchWrapper;
