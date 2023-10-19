import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, finalize, throwError } from 'rxjs';
import { UserApiService } from 'src/app/shared/services/api/user/user-api.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../signin.component.scss']
})
export class ForgotPasswordComponent {
    public forgotPasswordForm: UntypedFormGroup;
    public isAlert = false;
    public isLoading: boolean = false;
    private _sub: Subscription;

    constructor(private readonly _userApiService: UserApiService, private readonly _router: Router, private readonly _fb: UntypedFormBuilder) {}

    public ngOnInit(): void {
        this._initForm();
    }

    public goSignIn(): void {
        this._router.navigateByUrl('connexion');
    }

    public ngOnDestroy(): void {
        if (this._sub) this._sub.unsubscribe();
    }

    private _initForm(): void {
        this.forgotPasswordForm = this._fb.group({
            email: ['', Validators.required]
        });
    }

    public submitForgotPassword(): void {
        this.forgotPasswordForm.markAllAsTouched();

        if (this.forgotPasswordForm.valid) {
            this.isLoading = true;
            this._sub = this._userApiService
                .forgotPassword(this.forgotPasswordForm.value)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                        this._router.navigate(['/connexion']);
                    }),
                    catchError((error) => {
                        return throwError(() => error);
                    })
                )
                .subscribe();
        }
    }
}
