import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  adicionarPosts(umPost: Post): Observable<Post>{
  const opcoesHttp = { 
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
    }; 
    return this.http.post<Post>(this.urlBase, umPost, opcoesHttp).pipe(catchError(this.tartadorErros<Post>()));

  }
  private tartadorErros<T>(resultado?:T){
    return (erro: HttpErrorResponse): Observable<T> => {
      if (erro.error instanceof ErrorEvent){
        console.log(`Erro: ${erro.error.message}`);
        return throwError(`Erro: ${erro.error.message}`);
      }else{
        console.log(`Status: ${erro.status}`);
        return of (resultado as T);
      }
    };
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