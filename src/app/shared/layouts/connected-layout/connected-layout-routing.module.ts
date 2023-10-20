import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedLayoutComponent } from './connected-layout.component';
import { AuthGuard } from '../../guards/auth.guard';

const ROUTE: Routes = [
  {
    path: '',
    component: ConnectedLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../../../pages/home/home.module').then(m => m.HomeModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTE)],
  exports: [RouterModule]
})
export class ConnectedLayoutRoutingModule { }
