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
postId:any='new';
postForm!:NgForm
  constructor(private router:Router,private postsService: PostsService,
    private rout:ActivatedRoute) { }
  ngOnInit(): void {
    this.postId=this.rout.snapshot.paramMap.get('id')??'new';
    console.log('postId',this.postId);
    if(this.postId!=='new'){
this.getPost(this.postId);
    }
  }
  getPost(postId:string){
    this.postsService.getPostbyId(postId).subscribe((res:any)=>{
   this.postForm=res.posts

  console.log(res);
  
    });
  }
  onAddPost(post:any){
    this.postsService.addPost(post.control.value)
this.router.navigate(['Posts/list']);

  }
}
