import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostsService} from './posts/posts.service';
import {Post} from './posts/post';
import {Subscription} from 'rxjs';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular Http Observable';
  posts: Post[];
  private inscricaoPosts: Subscription;

  constructor (private servico: PostsService){ }

  ngOnInit(){
    this.inscricaoPosts = this.servico.buscarTodosOsPosts().subscribe(
      dados => this.posts = dados,
      erro => console.log(erro)
    );
  }

  ngOnDestroy(){
    this.inscricaoPosts.unsubscribe();
  }
}
