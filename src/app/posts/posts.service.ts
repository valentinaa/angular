import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable()
export class PostsService {
  private urlBase = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  buscarTodosOsPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlBase)
    .pipe(catchError(this.tratarErro));
  }

  private tratarErro(erro: HttpErrorResponse) {
    if(erro.error instanceof ErrorEvent){
      console.log(`Erro : ${erro.error.message}`);
      return throwError(`Erro : ${erro.error.message}`);
    }
    else {
      console.log(`Status: ${erro.status}`);
      return of([]);
    }
  }
}