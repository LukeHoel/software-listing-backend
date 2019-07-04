"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebianSearch = function (packageName) { return ({
    requestParams: {
        url: "https://sources.debian.org/api/search/" + packageName,
        headers: { "X-Requested-With": "XmlHttpRequest" }
    },
    formatFunction: function (input) {
        return input.results.other
            .concat(input.results.exact !== null ? input.results.exact : [])
            .map(function (current) { return ({
            name: current.name,
            platforms: ["debian"]
        }); });
    }
}); };
exports.fakeArchSearch = {
    requestParams: {
        url: "https://gnome.org"
    },
    formatFunction: function (input) {
        return [
            { name: "mozilla-firefox", platforms: ["archlinux"] },
            { name: "somefakepackagename", platforms: ["archlinux"] }
        ];
    }
};
