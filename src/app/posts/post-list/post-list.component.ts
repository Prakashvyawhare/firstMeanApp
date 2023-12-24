import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post.model';
import { PostsService } from '../posts.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
 posts:Array<Post>=[]
  constructor(
    private postsService: PostsService,
    private router:Router) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((res:any)=>{
      console.log(res);
         return this.posts = res;
      })
    }
    onDeletePost(postId:any){
      console.log(postId);
      
      this.postsService.deletePost(postId);

    }
    onEditPost(postId:any){
      this.router.navigate(['edit/'+postId])

    }
}
