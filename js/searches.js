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
exports.ArchSearch = function (packageName) { return ({
    requestParams: {
        url: "https://www.archlinux.org/packages/search/json/?q=" + packageName
    },
    formatFunction: function (input) {
        return input.results.map(function (current) { return ({
            name: current.pkgname,
            platforms: ["archlinux"]
        }); });
    }
}); };
exports.FedoraSearch = function (packageName) { return ({
    requestParams: {
        url: "https://apps.fedoraproject.org/packages/fcomm_connector/xapian/query/search_packages/{\"filters\":{\"search\":\"" + packageName + "\"}}"
    },
    formatFunction: function (input) {
        return input.rows.map(function (current) { return ({
            name: current.name,
            platforms: ["fedora"]
        }); });
    }
}); };
