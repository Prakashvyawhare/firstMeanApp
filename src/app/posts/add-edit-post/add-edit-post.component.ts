import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss']
})
export class AddEditPostComponent implements OnInit {

  constructor(private router:Router,private postsService: PostsService) { }

  ngOnInit(): void {
  }
  onAddPost(post:any){
    this.postsService.addPost(post.control.value)
this.router.navigate(['Posts/list']);

  }
}
