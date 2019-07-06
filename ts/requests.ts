import { platform } from "os";
import { RequestConfig } from "./models";

// Searches
export const DebianSearch = (packageName: string): RequestConfig => ({
  params: {
    url: `https://sources.debian.org/api/search/${packageName}`
  },
  formatFunction: (input: any) => {
    return input.results.other
      .concat(input.results.exact !== null ? input.results.exact : [])
      .map((current: any) => ({
        name: current.name,
        platforms: ["debian"]
      }));
  }
});

export const ArchSearch = (packageName: string): RequestConfig => ({
  params: {
    url: `https://www.archlinux.org/packages/search/json/?q=${packageName}`
  },
  formatFunction: (input: any) => {
    return input.results.map((current: any) => ({
      name: current.pkgname,
      platforms: ["archlinux"]
    }));
  }
});
export const FedoraSearch = (packageName: string): RequestConfig => ({
  params: {
    url: `https://apps.fedoraproject.org/packages/fcomm_connector/xapian/query/search_packages/{"filters":{"search":"${packageName}"}}`
  },
  formatFunction: (input: any) => {
    return input.rows.map((current: any) => ({
      name: current.name,
      platforms: ["fedora"]
    }));
  }
});
// Detail searches
export const DebianDetail = (packageName: string): RequestConfig => ({
  params: {
    url: `https://sources.debian.org/api/src/${packageName}`
  },
  formatFunction: (input: any) => {
    return [
      {
        name: "debian",
        versions: input.versions.map((version: any) => version.version)
      }
    ];
  }
});
