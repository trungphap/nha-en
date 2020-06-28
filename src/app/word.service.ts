import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {Word} from './models/word';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }
  private baseUrl :string=  environment.backend.baseURL;
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',  'Access-Control-Allow-Origin': '*'
     })
  };
  getWords(): Observable<Word[]> {
    //const url = `${this.baseUrl}Words_Get`;
    const url = `${this.baseUrl}/GetWords`;
    return this.http.get<Word[]>(url)
    .pipe(
      tap(_ => this.log('fetched words')),
      catchError(this.handleError<Word[]>('getWords', []))
    );
  }
  getWord(id: number): Observable<Word> {
    const url = `${this.baseUrl}Word_Get${id}`;
    return this.http.get<Word>(url).pipe(
      tap(_ => this.log(`fetched word id=${id}`)),
      catchError(this.handleError<Word>(`getWord id=${id}`))
    );
  }
  updateWord(word: Word): Observable<Word> {
    const url = `${this.baseUrl}/PutWord`;   
    return this.http.put<Word>(url, word, this.httpOptions).pipe(     
      tap(_ => this.log(`updated word id=${word.Id}`)),
      catchError(this.handleError<any>('updateWord'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  log(msg:string){
    console.log(msg);
  }
}
