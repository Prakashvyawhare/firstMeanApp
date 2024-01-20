import { Injectable } from '@angular/core';
import { Post } from '../shared/models/post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ObjectId } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
postsList: Array<Post>=[];
  constructor(public http:HttpClient) { }
/**
 * get list of posts from database thorough http request
 * @returns postsList
 */
  getPosts(){
   return  this.http.get<{message:string; posts:any}>('http://localhost:3000/api/posts').pipe(map((postData)=>{
    return postData.posts.map((post:any)=>{
      return{
        title:post.title,
        content: post.content,
        id:post._id
      }
    });
   }));
  }

  getPostbyId(postId:any){
return this.http.get<{message:string;post:any}>('http://localhost:3000/api/posts/'+postId);
 
  }

 addPost(post:Post,image:any){
  // const postdata={id:null,title:post.title,content:post.content}
  const formaData= new FormData();
  formaData.append('title',post.title)
  formaData.append('content',post.content);
  formaData.append('image',image)
   this.http.post('http://localhost:3000/api/posts',formaData).subscribe((res)=>{
    console.log(res);
  });
 }

 deletePost(postId:any){
  // const postdata={_id:post.id,title:post.title,content:post.content}
return this.http.delete('http://localhost:3000/api/posts/'+ postId)
// .subscribe(()=>{
//   console.log('deleted');

// })
 }
 editPost(post:any,postId:string,image:any){
  const formaData= new FormData();
  formaData.append('title',post.title)
  formaData.append('content',post.content);
  formaData.append('image',image);
  formaData.append('id',postId)
  // let postData={id:postId,title:post.title,content:post.content}
  this.http.put('http://localhost:3000/api/posts/'+ postId,formaData).subscribe((res)=>{
    console.log(res);
    
  })
 }
}
