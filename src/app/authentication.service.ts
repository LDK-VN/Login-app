import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private heroesUrl = 'http://192.85.40.73:8080/api/v1';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<Hero>(this.heroesUrl + '', {username, password}, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      map(user => {
        return user.name;
      })
    );
  }

  httpOptions = {
    /**
     * Three parameters 
     * + the URL
     * + the data to update (the modified hero in this case)
     * + options
     */
    headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
  }

  /**
 * Handle Http operation that failed. 
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result. - 
      return of(result as T);
    }
  }

  private log(message: string) {
   console.log(`BUG: ${message}`);
  }

  
}
