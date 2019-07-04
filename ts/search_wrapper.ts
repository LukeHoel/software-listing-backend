import { Request } from "express";
import { Search, SearchResult } from "./models";
import { rejects } from "assert";
import {
  searchUrl,
  formatPromise,
  safeParse,
  combineResults
} from "./search_utils";

export class SearchWrapper {
  searches: Search[];
  constructor(searches: Search[]) {
    this.searches = searches;
    return this;
  }
  doSearch(): Promise<SearchResult[]> {
    return new Promise((resolve: any, reject: any) => {
      let searchesLeft: number = this.searches.length;
      let finalSearchResults: SearchResult[] = [];
      // Keep track of multiple requests going out at the same time, and send back when the last one has gone off
      this.searches.forEach(search => {
        searchUrl(search.requestParams).then(searchResult => {
          // Each search has a different formatting function
          formatPromise(search.formatFunction, safeParse(searchResult)).then(
            (formattedResults: SearchResult[]) => {
              finalSearchResults = combineResults(
                finalSearchResults,
                formattedResults
              );
              if (--searchesLeft <= 0) resolve(finalSearchResults);
            }
          );
        });
      });
    });
  }
}
