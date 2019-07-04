export class SearchResult {
  name: string = "";
  platforms: string[] = [];
}
export interface Search {
  requestParams: any;
  formatFunction: Function;
}
