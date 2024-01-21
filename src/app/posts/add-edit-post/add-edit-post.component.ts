import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { imageValidator } from 'src/app/shared/validators/mime-type.validators';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss']
})
export class AddEditPostComponent implements OnInit {
  postId: any = 'new';
  isShowLoader: boolean = false;
  post=new FormGroup({
    title: new FormControl ("",{validators:[Validators.required]}),
content: new FormControl("",{validators:[Validators.required]}),
image:new FormControl(null,{validators:[Validators.required]})
})
  imgPreview:any;
  // postForm!: NgForm;
  // post!: FormGroup;
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
      next : (res:any) => {
        // this.post.controls['title'].patchValue(res.title)
        // this.post.controls['content'].patchValue(res.content)
        // this.post.controls['image'].patchValue(res.imagePath)
this.post.patchValue({
  title:res.title,
  content:res.content,
  image:res.imagePath
})
        this.imgPreview=res.imagePath
        // console.log(res, this.post);
      },
      error: (error: any) => { console.error(error); },
      complete: () => { this.isShowLoader = false; }
    });
  }
  onAddPost() {
    this.postsService.addPost(this.post.value,this.post.get('image')?.value);
    this.router.navigate(['Posts/list']);

  }
  onEditPost(post: any, postId: string) {
    this.postsService.editPost(post.value, postId,this.post.get('image')?.value);
    this.router.navigate(['Posts/list']);
  }
  onFilePicked(file:any){
    const fileObj =file.target.files[0];
    this.post.controls['image'].setValue(fileObj);
    this.post.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload=()=>{
      this.imgPreview = reader.result
    };
    console.log(this.imgPreview);
    reader.readAsDataURL(fileObj);


  }
  onClrImg(){
    this.post.get('image')?.setValue(null);
    this.post.get('image')?.updateValueAndValidity();
    this.imgPreview=null
  }
  onSubmit() {
    if (this.post.invalid) {
      return;
    }
    if (this.postId !== 'new') {
      this.onEditPost(this.post, this.postId)
    } else {
      this.onAddPost()
    }
  }
}
