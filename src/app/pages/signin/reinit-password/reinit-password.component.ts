import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { UserApiService } from 'src/app/shared/services/api/user/user-api.service';

@Component({
    selector: 'app-reinit-password',
    templateUrl: './reinit-password.component.html',
    styleUrls: ['../signin.component.scss']
})
export class ReinitPasswordComponent implements OnInit, OnDestroy {
    public newPasswordForm: UntypedFormGroup;
    public isAlert = false;
    public isLoading: boolean = false;
    public errorMessage: string;
    private _sub: Subscription;
    private _token: string;
    public isCreate: string;

    constructor(
        private readonly _userApiService: UserApiService, 
        private readonly _route: ActivatedRoute, 
        private readonly _router: Router, 
        private readonly _fb: UntypedFormBuilder
    ) {}

    public ngOnInit(): void {
        this._sub = this._route.queryParams
            .pipe(
                tap((queryParams: any) => {
                    this._token = queryParams.token;
                    this.isCreate = queryParams.isCreate;
                })
            )
            .subscribe();
        if (!this._token) this._router.navigate(['/connexion']);
        if (this.isCreate === '' || this.isCreate === '0') this._router.navigate(['/connexion']);

        this._initForm();
    }

    public goSignIn(): void {
        this._router.navigateByUrl('connexion');
    }

    public ngOnDestroy(): void {
        if (this._sub) this._sub.unsubscribe();
    }

    private _initForm(): void {
        this.newPasswordForm = this._fb.group({
            password: ['', [Validators.required, , this._customPasswordValidator()]],
            confirmPassword: ['', [Validators.required, this._confirmNewPassword()]]
        });
    }

    public onPaste(event: ClipboardEvent): void {
        event.preventDefault();
        // const pastedText = event.clipboardData.getData('text/plain');
        // document.execCommand('insertText', false, pastedText);
    }

    private _customPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const regex = new RegExp('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]))');
            let valid = regex.test(control.value);

            if (control.value && control.value.length < 6) valid = false;

            if (control.value && !valid) {
                return { password: true };
            }

            return null;
        };
    }

    private _confirmNewPassword(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value && control.value !== control.parent.get('password').value) {
                return { confirmNewPassword: true };
            }

            return null;
        };
    }

    public submitNewPassword(): void {
        this.newPasswordForm.markAllAsTouched();

        const obj = {
            ...this.newPasswordForm.value,
            token: this._token
        };

        delete obj.confirmPassword;

        if (this.newPasswordForm.valid) {
            this.isLoading = true;
            this._sub = this._userApiService
                .resetPassword(obj)
                .pipe(
                    tap(() => {
                        this._router.navigate(['/connexion']);
                    }),
                    catchError((error) => {
                        this.isAlert = true;
                        this.isLoading = false;
                        return throwError(() => error);
                    })
                )
                .subscribe();
        }
    }
}
