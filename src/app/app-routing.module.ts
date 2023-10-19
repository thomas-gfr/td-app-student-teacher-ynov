import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { ForgotPasswordComponent } from './pages/signin/forgot-password/forgot-password.component';
import { ReinitPasswordComponent } from './pages/signin/reinit-password/reinit-password.component';

const ROUTE: Routes = [
    {
        path: 'connexion',
        component: SigninComponent,
    },
    {
        path: 'mot-de-passe-oublie',
        component: ForgotPasswordComponent,
    },
    {
        path: 'reinitialiser-mot-de-passe',
        component: ReinitPasswordComponent,
    },
    {
        path: '',
        loadChildren: () => import('./shared/layouts/connected-layout/connected-layout.module').then(m => m.ConnectedLayoutModule)
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTE)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
