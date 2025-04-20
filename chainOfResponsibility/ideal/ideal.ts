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
  get message() {
    return this._message;
  }
}

interface IMiddleWare {
  setNext(nextMiddleWare: IMiddleWare): IMiddleWare;
  handleRequest(request: MyRequest): MyResponse;
}

abstract class MiddleWareHandler implements IMiddleWare {
  private nextHandler: IMiddleWare;
  setNext(nextMiddleWare: IMiddleWare): IMiddleWare {
    this.nextHandler = nextMiddleWare;
    return this.nextHandler;
  }
  handleRequest(request: MyRequest): MyResponse {
    if (this.nextHandler) {
      return this.nextHandler.handleRequest(request);
    }
    console.log("processing the request...");
    return new MyResponse("request processed successfully");
  }
}

class AuthenticationMiddleWare extends MiddleWareHandler {
  handleRequest(request: MyRequest): MyResponse {
    if (!request.isAuthenticated) {
      return new MyResponse("request is not authenticated");
    }
    return super.handleRequest(request);
  }
}

class AuthorizationMiddleWare extends MiddleWareHandler {
  handleRequest(request: MyRequest): MyResponse {
    if (!request.isAuthorized) {
      return new MyResponse("request is not authorized");
    }
    return super.handleRequest(request);
  }
}

class SecurityMiddleWare extends MiddleWareHandler {
  handleRequest(request: MyRequest): MyResponse {
    if (!request.isSecure) {
      return new MyResponse("request is not secure");
    }
    return super.handleRequest(request);
  }
}

const request = new MyRequest("fetchData", true, true, true);
const security = new SecurityMiddleWare();
const auth = new AuthenticationMiddleWare();
const authz = new AuthorizationMiddleWare();

security.setNext(auth).setNext(authz);

const response = security.handleRequest(request);
console.log(response.message);
