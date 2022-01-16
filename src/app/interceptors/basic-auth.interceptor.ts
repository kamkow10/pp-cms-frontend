import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      withCredentials: true
    });
    return next.handle(request);

    // const user = JSON.parse(<string>localStorage.getItem('user'));
    // const isLoggedIn = user != null;
    // const isApiUrl = request.url.startsWith(BACKEND_URL);
    // const isAuthorizationNeeded =
    //   request.url.startsWith(ADD_COMMENT_URL) ||
    //   request.url.startsWith(USER_EDIT_EMAIL_URL);
    // console.log(request);
    // console.log(`Auth needed ${isAuthorizationNeeded}`);
    // if (isLoggedIn && isApiUrl && isAuthorizationNeeded) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Basic ${btoa(user.userMail + ':' + user.password)}`
    //     }
    //   });
    // }
    // return next.handle(request);
  }
}
