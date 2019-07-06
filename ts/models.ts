export class RequestResult {
  name: string = "";
  platforms: any[] = [];
}
export interface RequestConfig {
  params: any;
  formatFunction: Function;
}
