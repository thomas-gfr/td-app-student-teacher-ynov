import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { map, Observable, Subscription, tap } from 'rxjs';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    public isLoading: boolean = true;
    public control = this._fb.control([]);
    

    private _subs = new Subscription();

    constructor(
        private readonly _fb: UntypedFormBuilder,
    ) {}

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this._subs.unsubscribe();
    }
}
