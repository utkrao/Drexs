import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DialogBoxComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/landing',
    pathMatch: 'full'
  },

  {
    path: 'dialog-box',
    component: DialogBoxComponent,
  },

  { path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },

  {
    path: 'pages', 
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
