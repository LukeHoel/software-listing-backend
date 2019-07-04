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

export const fakeArchSearch: Search = {
  requestParams: {
    url: "https://gnome.org"
  },
  formatFunction: (input: any) => {
    return [
      { name: "mozilla-firefox", platforms: ["archlinux"] },
      { name: "somefakepackagename", platforms: ["archlinux"] }
    ];
  }
};
