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
  constructor(
    private postsService: PostsService,
    private router: Router) { }

 ngOnInit(): void {
   this.getPostData();
  }
  onChangePage(pageData:PageEvent){
console.log(pageData);

  }
 getPostData() {
    this.isShowLoader = true;
     this.postsService.getPosts().subscribe({
      next: async (res: any) => {
        console.log(res);
         this.posts = await res;
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
      this.getPostData();
    });
  }
  onEditPost(postId: any) {
    this.router.navigate(['edit/' + postId]);
  }
}
