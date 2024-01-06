import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss']
})
export class AddEditPostComponent implements OnInit {
  postId: any = 'new';
  isShowLoader: boolean = false;
  // postForm!: NgForm;
  post: any;
  constructor(private router: Router, private postsService: PostsService,
    private rout: ActivatedRoute) { }
  ngOnInit(): void {
    this.postId = this.rout.snapshot.paramMap.get('id') ?? 'new';
    console.log('postId', this.postId);
    if (this.postId !== 'new') {
      this.getPost(this.postId);
    }
  }
  getPost(postId: string) {
    this.isShowLoader=true;
    this.postsService.getPostbyId(postId).subscribe({
      next: (res: any) => {
        this.post = res.posts
        console.log(res, this.post);
      },
      error: (error: any) => { console.error(error); },
      complete: () => { this.isShowLoader = false; }
    });
  }
  onAddPost(post: NgForm) {
    this.postsService.addPost(post.control.value);
    this.router.navigate(['Posts/list']);

  }
  onEditPost(post: NgForm, postId: string) {
    this.postsService.editPost(post.control.value, postId);
    this.router.navigate(['Posts/list']);
  }

  onSubmit(post: NgForm) {
    if (post.invalid) {
      return;
    }
    if (this.postId !== 'new') {
      this.onEditPost(post, this.postId)
    } else {
      this.onAddPost(post)
    }
  }
}
