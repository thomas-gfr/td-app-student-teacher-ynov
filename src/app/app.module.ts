import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppHttpInterceptor } from './shared/tools/http.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './pages/signin/forgot-password/forgot-password.component';
import { ReinitPasswordComponent } from './pages/signin/reinit-password/reinit-password.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        ForgotPasswordComponent,
        ReinitPasswordComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
