class MyRequest {
  private _request: string;
  private _isSecure: boolean;
  private _isAuthenticated: boolean;
  private _isAuthorized: boolean;

  constructor(
    request: string,
    isSecure: boolean,
    isAuthenticated: boolean,
    isAuthorized: boolean
  ) {
    this._request = request;
    this._isSecure = isSecure;
    this._isAuthenticated = isAuthenticated;
    this._isAuthorized = isAuthorized;
  }

  get request(): string {
    return this._request;
  }

  get isSecure(): boolean {
    return this._isSecure;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get isAuthorized(): boolean {
    return this._isAuthorized;
  }
}

class MyResponse {
  private _message: string;

  constructor(message: string) {
    this._message = message;
  }
}

class RequestProcessor {
  processRequest(request: MyRequest) {
    if (!this.hasPassedSecurityChecks(request)) {
      return new MyResponse("request is not secure");
    }
    if (!this.isAuthenticated(request)) {
      return new MyResponse("request is not authenticated");
    }
    if (!this.isAuthorized(request)) {
      return new MyResponse("request is not authorized");
    }
    console.log("processing the request...");
    return new MyResponse("request processed successfully");
  }
  hasPassedSecurityChecks(request: MyRequest) {
    return request.isSecure;
  }

  isAuthenticated(request: MyRequest) {
    return request.isAuthenticated;
  }
  isAuthorized(request: MyRequest) {
    return request.isAuthorized;
  }
}

const req = new MyRequest("get", true, true, true);

const result = new RequestProcessor().processRequest(req);
console.log(result);
