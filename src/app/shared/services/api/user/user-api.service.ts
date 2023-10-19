import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, IUser } from '../../../interfaces/user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    constructor(private readonly _http: HttpClient) {
        this.getUsersList = this.getUsersList.bind(this);
    }

    public getUsersList(params?: object, body?: object, customRoute?: string): Observable<User[]> {
        environment.httpOptions.params = new HttpParams();
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                if (value !== null && value !== undefined) environment.httpOptions.params = environment.httpOptions.params.append(key, value);
            }
        }
        const route = customRoute || '/utilisateur/liste';
        return this._http.post<User[]>(environment.BASE_API + route, body, environment.httpOptions).pipe(
        );
    }

    public getUserById(id: number): Observable<IUser> {
        environment.httpOptions.params = new HttpParams();
        return this._http.get<IUser>(environment.BASE_API + '/utilisateur/' + id, environment.httpOptions);
    }

    public createUser(body: IUser): Observable<IUser> {
        environment.httpOptions.params = new HttpParams();
        return this._http.post<IUser>(environment.BASE_API + '/utilisateur', body, environment.httpOptions);
    }

    public updateUser(id: number, body: IUser): Observable<IUser> {
        environment.httpOptions.params = new HttpParams();
        return this._http.put<IUser>(environment.BASE_API + '/utilisateur/' + id, body, environment.httpOptions);
    }

    public deleteUser(id: number): Observable<void> {
        environment.httpOptions.params = new HttpParams();
        return this._http.delete<void>(environment.BASE_API + '/utilisateur/' + id, environment.httpOptions);
    }

    public forgotPassword(body: Object): Observable<void> {
        environment.httpOptions.params = new HttpParams();
        return this._http.post<void>(environment.BASE_API + '/utilisateur/forgot-password', body, environment.httpOptions);
    }

    public resetPassword(body: Object): Observable<void> {
        environment.httpOptions.params = new HttpParams();
        return this._http.post<void>(environment.BASE_API + '/utilisateur/reset-password', body, environment.httpOptions);
    }

    public changePassword(body: Object): Observable<void> {
        environment.httpOptions.params = new HttpParams();
        return this._http.post<void>(environment.BASE_API + '/utilisateur/modify-password', body, environment.httpOptions);
    }

    public sendCreationEmail(id: number): Observable<void> {
        environment.httpOptions.params = new HttpParams();
        return this._http.put<void>(environment.BASE_API + '/utilisateur/envoi-identifiant/' + id, environment.httpOptions);
    }
}
