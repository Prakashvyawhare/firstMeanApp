import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
postsList: Array<Post>=[];
  constructor(public http:HttpClient) { }

  getPosts(){
   return  this.http.get('http://localhost:3000/api/posts')
  }
 addPost(post:Post){
  const postdata={id:null,title:post.title,content:post.content}
   this.http.post('http://localhost:3000/api/posts',postdata).subscribe((res)=>{
    console.log(res);
    
        })
 }

}
