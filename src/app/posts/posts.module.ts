import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { PostsService } from './posts.service';

const routes: Routes = [
  {
    path:'',
    redirectTo:'addPost',
    pathMatch:'full'
  },
  {
    path:'list',
    component:PostListComponent
  },
  {
    path:'addPost',
    component:AddEditPostComponent
  },
  {
    path:'edit/:id',
    component:AddEditPostComponent
  }
];

@NgModule({
  declarations: [
    PostsComponent,
    AddEditPostComponent,
    PostListComponent
  ],
  imports: [
    RouterModule.forChild(routes), 
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    // BrowserModule
  ],
  exports:[RouterModule],
  providers: [
    PostsService
  ],
})
export class PostsModule { }
