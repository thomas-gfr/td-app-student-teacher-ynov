import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, tap, throttleTime } from 'rxjs';

@Component({
    selector: 'td-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnDestroy {
    @Input() public label: string;
    @Input() public icon: string;
    @Input() public iconReset: string;
    @Input() public badge: number | string;
    @Input() public forcePassThrough: boolean = false;
    @Input() public throttleTime: number = 300;
    @Input() public badgeColor: string;
    @HostBinding('style.--badge-color')
    public get badgeColorIsActive(): string {
        if (this.badgeColor) {
            return 'var(--' + this.badgeColor + ')';
        }
    }
    @Input() public iconSize: number = null;
    @Input() public disabled: boolean = false;
    @Input() public isLoading: boolean = false;
    @HostBinding('class.loading')
    public get isLoadingIsActive(): boolean {
        return this.isLoading ? true : false;
    }
    @Input() public iconLoader: string = 'icon-loader-tail';
    @Input() public multiline: boolean = false;

    @HostBinding('class.disabled')
    public get disabledIsActive(): boolean {
        return this.disabled ? true : false;
    }
    @Input() public color: string;
    @HostBinding('style.--button-color')
    public get colorIsActive(): string {
        if (this.color) {
            return 'var(--' + this.color + ')';
        }
    }
    @Output() public emitOnClick = new EventEmitter<Event>();
    @HostListener('click', ['$event']) onClick(event: Event) {
        if (!this.disabled && !this.isLoading) {
            if (!this.forcePassThrough) {
                event.preventDefault();
                event.stopPropagation();
            }
            this._click$.next(event);
        }
    }

    @Output() public emitOnReset = new EventEmitter<Event>();

    private _click$ = new Subject<Event>();
    private _sub: Subscription;

    constructor(public el: ElementRef) {}

    public ngOnInit(): void {
        this._sub = this._click$
            .pipe(
                throttleTime(this.throttleTime),
                tap((event) => this.emitOnClick.emit(event))
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        if (this._sub) this._sub.unsubscribe();
    }

    public reset(ev: MouseEvent): void {
        ev.stopPropagation();
        this.emitOnReset.emit(ev);
    }
}
