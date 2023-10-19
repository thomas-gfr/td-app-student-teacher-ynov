import { HttpHeaders, HttpParams } from '@angular/common/http';

export const environment = {
    production: true,
    build: true,
    BASE_API: '/api',
    httpOptions: {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        params: new HttpParams()
    },
    token: null,
    refreshToken: null,
};
