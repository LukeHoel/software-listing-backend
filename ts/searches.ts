import { Search } from "./models";
import { platform } from "os";

export const DebianSearch = (packageName: string): Search => ({
  requestParams: {
    url: `https://sources.debian.org/api/search/${packageName}`,
    headers: { "X-Requested-With": "XmlHttpRequest" }
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

export const ArchSearch = (packageName: string) => ({
  requestParams: {
    url: `https://www.archlinux.org/packages/search/json/?q=${packageName}`
  },
  formatFunction: (input: any) => {
    return input.results.map((current: any) => ({
      name: current.pkgname,
      platforms: ["archlinux"]
    }));
  }
});
export const FedoraSearch = (packageName: string) => ({
  requestParams: {
    url: `https://apps.fedoraproject.org/packages/fcomm_connector/xapian/query/search_packages/{"filters":{"search":"${packageName}"}}`
  },
  formatFunction: (input: any) => {
    return input.rows.map((current: any) => ({
      name: current.name,
      platforms: ["fedora"]
    }));
  }
});
