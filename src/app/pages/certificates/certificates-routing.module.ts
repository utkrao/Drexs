import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';
import { MyCertificatesComponent } from './certificates/my-certificates/my-certificates.component';
import { MyDrecsComponent } from './certificates/my-drecs/my-drecs.component';
import { StackedDrecsComponent } from './certificates/stacked-drecs/stacked-drecs.component';

const routes: Routes = [
  {
    path: '',
    component: CertificatesComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-certificates',
        pathMatch: 'full'
      },
      {
        path: 'my-certificates',
        component: MyCertificatesComponent
      },
      {
        path: 'my-drecs',
        component: MyDrecsComponent
      },
      {
        path: 'stacked-drecs',
        component: StackedDrecsComponent
      },
      
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }
