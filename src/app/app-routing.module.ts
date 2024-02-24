import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Auth',
    pathMatch:'full'
  },
  {
    path:'',
    loadChildren: () => import('./secure/secure.module').then(m=>m.SecureModule),
    canActivate:[AuthGuard]
  },
  {
    path:'Auth',
    loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
