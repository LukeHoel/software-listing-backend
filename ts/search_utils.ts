import { SearchResult } from "./models";

const request = require("request");

export const formatPromise = (
  formatFunction: Function,
  input: string
): Promise<SearchResult[]> => {
  return new Promise((resolve: any, reject: any) => {
    try {
      resolve(formatFunction(input));
    } catch (e) {
      console.error(e);
      resolve([]);
    }
  });
};

export const safeParse = (input: string) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    console.error(e);
    return [];
  }
};
// Combine two sets of search platforms into one, by the name
export const combineResults = (
  first: SearchResult[],
  second: SearchResult[]
): SearchResult[] => {
  const combinedResults: SearchResult[] = [...first];

  second.forEach(firstItem => {
    const sharedResult = combinedResults.find(
      secondItem => firstItem.name === secondItem.name
    );
    if (sharedResult !== undefined) {
      sharedResult.platforms = [
        ...sharedResult.platforms,
        ...firstItem.platforms
      ];
    } else {
      combinedResults.push(firstItem);
    }
  });

  return combinedResults;
};

export const searchUrl = (requestParams: any): Promise<string> => {
  return new Promise((resolve: any, reject: any) =>
    request(requestParams, (error: any, response: Response, body: string) => {
      if (error) reject(error);
      else resolve(body);
    })
  );
};
