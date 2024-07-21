import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  /**
   * Intercepts HTTP requests to add JWT authorization header if token is available.
   *
   * @param request - The outgoing HTTP request
   * @param next - The next handler in the HTTP pipeline
   * @returns An observable of the event stream
   */
  public intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // If a token is found, clone the request and add the Authorization header
    if (token !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the request to the next handler in the chain
    return next.handle(request);
  }
}
