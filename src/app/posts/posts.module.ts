import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:PostListComponent
  },
  {
    path:'addPost',
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
    MaterialModule,
    FormsModule,
    // BrowserModule
  ],
  exports:[RouterModule]
})
export class PostsModule { }
