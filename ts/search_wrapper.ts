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
  doSearch = async (): Promise<SearchResult[]> => {
    return new Promise((resolve: any, reject: any) => {
      let searchesLeft: number = this.searches.length;
      let finalSearchResults: SearchResult[] = [];
      // Keep track of multiple requests going out at the same time, and send back when the last one has gone off
      this.searches.forEach(async search => {
        // Query url
        const searchResult: string = await searchUrl(search.requestParams);
        // Take results from url and format it into a standard format through a custom function
        const formattedResult: SearchResult[] = await formatPromise(
          search.formatFunction,
          safeParse(searchResult)
        );
        // Combine the results by the name
        finalSearchResults = combineResults(
          finalSearchResults,
          formattedResult
        );
        if (--searchesLeft <= 0) resolve(finalSearchResults);
      });
    });
  };
}
