import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SecureComponent } from './secure.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'Posts',
        pathMatch:'full'
      },
      {
        path:'Posts',
        loadChildren: () => import('../posts/posts.module').then(m=>m.PostsModule)
      }
    ]
  }
 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SecureRoutingModule { }
