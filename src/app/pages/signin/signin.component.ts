import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { finalize, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
    public signInForm: UntypedFormGroup;
    public errorMessage: string;
    public isAlert = false;
    public isLoading: boolean = false;
    private _sub: Subscription;

    constructor(private readonly _authService: AuthService, private readonly _router: Router, private readonly _fb: UntypedFormBuilder) {}

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
        this.signInForm = this._fb.group({
            username: [null, Validators.required],
            password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{2,}/)]]
        });
    }

    public forgotPassword(): void {
        this._router.navigate(['/mot-de-passe-oublie']);
    }

    public login(): void {
        this.isLoading = true;

        if (this.signInForm.valid) {
            // this._sub = this._authService
            //     .login(this.signInForm.getRawValue())
            //     .pipe(
            //         tap(() => {
                        this._router.navigate(['/']).then(() => {
                            this.isLoading = false;
                        });
                //     }),
                //     finalize(() => {
                //         this.isLoading = false;
                //     })
                // )
                // .subscribe();
        } else {
            this.errorMessage = 'Veuillez remplir tous les champs';
            this.isAlert = true;
            this.isLoading = false;
        }
    }
}
