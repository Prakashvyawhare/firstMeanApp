import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post.model';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Array<Post> = [];
  isShowLoader: boolean = false;
  pageSizeOptions=environment.pageSizeOptions;
  totalPosts=10;
  pageSize=environment.pageSize;
  quiryParam={
    pageSize:this.pageSize,
    pageIndex:1
   }
  pageIndex: number=0;
  constructor(
    private postsService: PostsService,
    private router: Router) { }

 ngOnInit(): void {
   this.getPostData(this.quiryParam);
  }
  onChangePage(pageData:PageEvent){
    this.pageSize=pageData.pageSize;
    this.pageIndex=pageData.pageIndex
  this.quiryParam={
    pageSize:pageData.pageSize,
    pageIndex:pageData.pageIndex+1
   }
   this.getPostData(this.quiryParam);
console.log(pageData);

  }
 getPostData(quiryParam?:any) {
    this.isShowLoader = true;
     this.postsService.getPosts(quiryParam).subscribe({
      next:(res: any) => {
        console.log(res);
         this.posts = res.posts;
         this.totalPosts=res.totalPost
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        this.isShowLoader = false;
      }
    });
  }
  onDeletePost(postId: any) {
    console.log(postId);
    lastValueFrom(this.postsService.deletePost(postId)).then(() => {
      this.getPostData(this.quiryParam);
    });
  }
  onEditPost(postId: any) {
    this.router.navigate(['edit/' + postId]);
  }
}
