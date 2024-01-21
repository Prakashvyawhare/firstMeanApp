import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ObjectId } from 'mongodb';
import { Post } from '../shared/models/post.model';

@Injectable()
export class PostsService {
postsList: Array<any>=[];
  constructor(public http:HttpClient) { }
/**
 * get list of posts from database thorough http request
 * @returns postsList
 */
  getPosts(){
   return  this.http.get<{message:string; posts:any}>('http://localhost:3000/api/posts').pipe(map((postData)=>{
    return postData.posts.map((post:Post)=>{
      return{
        title:post.title,
        content: post.content,
        _id:post._id,
        imagePath:post.imagePath
      }
    });
   }));
  }

  getPostbyId(postId:any){
return this.http.get<{message:string;post:Post}>('http://localhost:3000/api/posts/'+postId);
 
  }

 addPost(post:any,image:any){
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
 editPost(post:Post,postId:string,image:any){
  if(image === typeof 'string'){
    let postData = {
      title:post.title,
content: post.content,
id:postId,
imagePath:post.imagePath
    }
    this.http.put('http://localhost:3000/api/posts/'+ postId,postData).subscribe((res)=>{
      console.log(res);
      
    })   
  }else{
  const formaData= new FormData();
  formaData.append('title',post.title)
  formaData.append('content',post.content);
  formaData.append('image',image);
  formaData.append('id',postId)
  // let postData={id:postId,title:post.title,content:post.content}
  this.http.put('http://localhost:3000/api/posts/'+ postId,formaData).subscribe((res)=>{
    console.log(res);
    
  })}
 }
}
