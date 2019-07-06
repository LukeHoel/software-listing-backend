import { RequestResult, RequestConfig } from "./models";
import { rejects } from "assert";
import {
  formatPromise,
  safeParse,
  combineResults,
  requestUrl
} from "./request_utils";

export class RequestWrapper {
  requests: RequestConfig[];
  constructor(requests: RequestConfig[]) {
    this.requests = requests;
    return this;
  }
  doRequest = async (): Promise<RequestResult[]> => {
    return new Promise((resolve: any, reject: any) => {
      let RequestesLeft: number = this.requests.length;
      let finalRequestResults: RequestResult[] = [];
      // Keep track of multiple requests going out at the same time, and send back when the last one has gone off
      this.requests.forEach(async requests => {
        // Query url
        const RequestResult: string = await requestUrl(requests.params);
        // Take results from url and format it into a standard format through a custom function
        const formattedResult: RequestResult[] = await formatPromise(
          requests.formatFunction,
          safeParse(RequestResult)
        );
        // Combine the results by the name
        finalRequestResults = combineResults(
          finalRequestResults,
          formattedResult
        );
        if (--RequestesLeft <= 0) resolve(finalRequestResults);
      });
    });
  };
}
