import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss']
})
export class AddEditPostComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onAddPost(post:any){
this.router.navigate(['Posts/list']);

  }
}
