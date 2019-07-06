"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Searches
exports.DebianSearch = function (packageName) { return ({
    params: {
        url: "https://sources.debian.org/api/search/" + packageName
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
    params: {
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
    params: {
        url: "https://apps.fedoraproject.org/packages/fcomm_connector/xapian/query/search_packages/{\"filters\":{\"search\":\"" + packageName + "\"}}"
    },
    formatFunction: function (input) {
        return input.rows.map(function (current) { return ({
            name: current.name,
            platforms: ["fedora"]
        }); });
    }
}); };
// Detail searches
exports.DebianDetail = function (packageName) { return ({
    params: {
        url: "https://sources.debian.org/api/src/" + packageName
    },
    formatFunction: function (input) {
        return [
            {
                name: "debian",
                versions: input.versions.map(function (version) { return version.version; })
            }
        ];
    }
}); };
