import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    constructor(private readonly _cookieService: CookieService) {}

    public setupEnvironment(): void {
        const cookies = this._cookieService.getAll();

        Object.keys(cookies).forEach((key) => {
            environment[key] = cookies[key];
        });
    }
}
