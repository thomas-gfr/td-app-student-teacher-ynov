import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, first, switchMap, of, map } from 'rxjs';
import { User } from '../interfaces/user/user.model';
import { LoggedUserService } from '../services/auth/logged-user.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private readonly _authService: AuthService, private readonly _loggedUserService: LoggedUserService) {}

    public canActivate(): Observable<boolean> {
        return this._loggedUserService.user$.pipe(
            first(),
            switchMap((user: User | null): Observable<boolean> => {
                if (!user) {
                    return this._authService.fetchCurrentUser().pipe(map(() => true));
                } else {
                    return of(true);
                }
            })
        );
    }
}
