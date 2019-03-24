import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from 'app/models/products';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl1 = 'http://localhost:8080/api/interface.products';
const apiUrl2 = 'http://localhost:8080/api/interface.images';

@Injectable({
  providedIn: 'root'
})
export class HomeProductsService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a Product-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  postProducts(data): Observable<any> {
    return this.http.post(apiUrl1, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  postSliders(data): Observable<any> {
    return this.http.post(apiUrl2, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


}
