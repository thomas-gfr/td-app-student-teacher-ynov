import { Overlay } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { VariableApiService } from '../../library/src/services/api/variable/variable-api.service';
import { AppHttpInterceptor } from './http.interceptor';

describe('AppHttpInterceptor', () => {
    let injector: TestBed;
    let service: VariableApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                Overlay,
                VariableApiService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AppHttpInterceptor,
                    multi: true
                }
            ]
        });

        injector = getTestBed();
        service = injector.get(VariableApiService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('request should have authorization header', () => {
        service.getVariables().subscribe();
        const req = httpMock.expectOne(`${environment.BASE_API}/variable`);
        expect(req.request.headers.has('Authorization')).toBeTruthy();
        req.flush({});
    });
});
