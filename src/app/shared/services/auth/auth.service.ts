import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { EnvironmentService } from '../environment/environment.service';

export interface API {
    userId: number;
    userNom: string;
    userPrenom: string;
    userInitiale: string;
    token: string;
    refreshToken: string;
    folderId: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLoggedin$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private readonly _http: HttpClient,
        private readonly _cookieService: CookieService,
        private readonly _router: Router,
        private readonly _environmentService: EnvironmentService,
    ) {}

    public fetchCurrentUser(): Observable<API> {
        if (environment.refreshToken) {
            environment.httpOptions.params = new HttpParams();
            return this._http.post<API>(environment.BASE_API + '/api/token/refresh', { refreshToken: environment.refreshToken }, environment.httpOptions).pipe(
                tap((apiResponse: API) => {
                    if (apiResponse) {
                        this._setSession(apiResponse);

                        // this._loggedUserService.user$.next(
                        //     new User({
                        //         idUtilisateur: apiResponse.userId,
                        //         nom: apiResponse.userNom,
                        //         prenom: apiResponse.userPrenom
                        //     })
                        // );
                        this.isLoggedin$.next(true);
                    }
                }),
                catchError((error) => {
                    // this._toastService.open({ title: 'Votre session a expiré', message: 'Vous devez vous reconnecter', severity: 'alert' });
                    this.logout();
                    return throwError(() => error);
                })
            );
        } else {
            this.logout();
            return throwError(() => 'No refresh token');
        }
    }

    public login(credentials: { username: string; password: string }): Observable<API> {
        environment.httpOptions.params = new HttpParams();
        return this._http.post<API>(environment.BASE_API + '/login_check', credentials, environment.httpOptions).pipe(
            tap((apiResponse: API) => {
                if (apiResponse) {
                    this._setSession(apiResponse);

                    // this._loggedUserService.user$.next(
                    //     new User({
                    //         idUtilisateur: apiResponse.userId,
                    //         nom: apiResponse.userNom,
                    //         prenom: apiResponse.userPrenom
                    //     })
                    // );

                    this.isLoggedin$.next(true);
                }
            })
        );
    }

    private _setSession(apiResponse: API): void {
        this._deleteSession();

        this._cookieService.set('token', apiResponse.token, { path: '/', secure: true });
        this._cookieService.set('refreshToken', apiResponse.refreshToken, { path: '/', secure: true });
        this._cookieService.set('folderId', apiResponse.folderId, { path: '/', secure: true });

        this._environmentService.setupEnvironment();

    }

    private _deleteSession(): void {
        this._cookieService.delete('token', '/');
        environment.token = null;

        this._cookieService.delete('refreshToken', '/');
        environment.refreshToken = null;

        this._cookieService.delete('folderId', '/');
    }

    public logout(): void {
        this.isLoggedin$.next(false);
        this._deleteSession();
        this._router.navigateByUrl('/connexion');
    }

    public setCurrentPath(): void {
        if (this._router.url !== '/connexion') this._cookieService.set('activeRoute', this._router.url, { path: '/', secure: true });
    }

    public removeCurrentPath(): void {
        this._cookieService.delete('activeRoute', '/');
    }

    public removeAllCookies(): void {
        this._cookieService.deleteAll('/');
        environment.token = null;
        environment.refreshToken = null;
    }
}
