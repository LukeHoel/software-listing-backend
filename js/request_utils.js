"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
exports.formatPromise = function (formatFunction, input) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(formatFunction(input));
        }
        catch (e) {
            console.error(e);
            resolve([]);
        }
    });
};
exports.safeParse = function (input) {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        console.error(e);
        return [];
    }
};
// Combine two sets of search platforms into one, by the name
exports.combineResults = function (first, second) {
    var combinedResults = first.slice();
    second.forEach(function (firstItem) {
        var sharedResult = combinedResults.find(function (secondItem) { return firstItem.name === secondItem.name; });
        if (sharedResult !== undefined) {
            sharedResult.platforms = sharedResult.platforms.concat(firstItem.platforms);
        }
        else {
            combinedResults.push(firstItem);
        }
    });
    return combinedResults;
};
exports.requestUrl = function (requestParams) {
    return new Promise(function (resolve, reject) {
        return request(requestParams, function (error, response, body) {
            if (error)
                reject(error);
            else
                resolve(body);
        });
    });
};
