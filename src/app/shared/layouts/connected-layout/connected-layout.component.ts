import { Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../../interfaces/user/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { LoggedUserService } from '../../services/auth/logged-user.service';

@Component({
    selector: 'app-connected-layout',
    templateUrl: './connected-layout.html',
    styleUrls: ['./connected-layout.scss']
})
export class ConnectedLayoutComponent implements OnInit, OnDestroy {
   
    public user$: Observable<User | null> = this._loggedUserService.user$.asObservable();
    private _time: any;
    private _interval: any;
    private _routeSub: Subscription;

    constructor(
        private readonly _authService: AuthService,
        private readonly _loggedUserService: LoggedUserService,
        private readonly _router: Router,
    ) {}

    public ngOnInit(): void {
        this._interval = setInterval(() => {
            this._authService.setCurrentPath();
            this._authService.fetchCurrentUser().subscribe();
        }, 1000 * 60 * 25);

        this._routeSub = this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                tap((event: NavigationEnd) => {
                    const root = event.urlAfterRedirects.split('/')[1];

                    for (let i = 0; i < sessionStorage.length; i++) {
                        const key = sessionStorage.key(i);
                        if (key && !key.startsWith(`_${root}`)) {
                            sessionStorage.removeItem(key);
                            i--;
                        }
                    }
                })
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        clearTimeout(this._time);
        clearInterval(this._interval);
        if (this._routeSub) this._routeSub.unsubscribe();
    }
}
