import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private readonly _authService: AuthService) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(environment.BASE_API) && environment.token) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + environment.token) });
        }

        return next.handle(req).pipe(
            tap((response: any) => {
                if (response?.body?.dialogs) {
                    // response.body.dialogs.forEach((dialog: ToastModel) => {
                    //     if (!dialog.operationSetting?.isOperationBlocked) this._toastService.open(dialog);
                    // });
                }
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 499 || err.status === 498) {
                    this._authService.setCurrentPath();
                    this._authService.logout();
                }
                    // this._toastService.open({
                    //     title: 'Votre session a expiré',
                    //     message: 'Vous devez vous reconnecter',
                    //     severity: 'warning',
                    //     type: 'blocking',
                    //     action: { label: { ok: "J'ai compris" } }
                    // });
                // } else this._toastService.open({ title: 'Erreur', message: err.error?.detail || err.error?.message, severity: 'alert' });

                return throwError(() => err);
            })
        );
    }
}
