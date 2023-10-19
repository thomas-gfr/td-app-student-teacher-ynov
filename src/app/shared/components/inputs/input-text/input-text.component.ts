import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { InputBase } from '../input';
import { Subject, Subscription, debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
    selector: 'td-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['../input.scss', './input-text.component.scss']
})
export class InputTextComponent extends InputBase implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @ViewChild('input') public input: ElementRef;
    @Input() public prefix: string;
    @Input() public prefixIcon: string;
    @Input() public type: string = 'text';
    @Input() public suffixIcon: string;
    @Input() public inject: boolean;
    @Input() public focusOnInit: boolean = false;
    @Input() public debounceTime: number = 0;
    @Input() public removeSpaces: boolean = false;

    @Output() public emitOnChangeValue = new EventEmitter<string>();
    @Output() public emitOnFocus = new EventEmitter();
    @Output() public emitOnBlur = new EventEmitter();
    @Output() public emitOnKeyDown = new EventEmitter<KeyboardEvent>();
    @Output() public emitOnKeyUp = new EventEmitter<KeyboardEvent>();
    @Output() public emitOnSuffixClick = new EventEmitter<Event>();
    @Output() public emitOnPaste = new EventEmitter<ClipboardEvent>();

    @Input() public fieldListTypes: number[] = [1];

    private _range: any;

    public initType: string;


    public inputFocused: boolean = false;

    private _onInput$ = new Subject<string>();
    private _onInputSub: Subscription;

    public ngOnInit(): void {
        this.initType = this.type;

        if (this.debounceTime > 0) {
            this._onInputSub = this._onInput$
                .pipe(
                    debounceTime(this.debounceTime),
                    distinctUntilChanged(),
                    tap((value) => {
                        this.emitOnChangeValue.emit(value);
                    })
                )
                .subscribe();
        }
    }

    public ngOnDestroy(): void {
        if (this._onInputSub) this._onInputSub.unsubscribe();
    }

    public ngAfterViewInit(): void {
        if (this.focusOnInit) this.forceFocus();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        
    }

    public onFocus(): void {
        this.inputFocused = true;
        this.emitOnFocus.emit();
    }

    public onBlur(ev: Event): void {
        this.inputFocused = false;
        this.emitOnBlur.emit(ev);
    }

    public onKeyUp(ev: KeyboardEvent): void {
        this.emitOnKeyUp.emit(ev);
    }

    public onKeyDown(ev: KeyboardEvent): void {
        this.emitOnKeyDown.emit(ev);
    }

    public onInput(): void {
        if (this.debounceTime > 0) {
            this._onInput$.next(this.control?.value);
        } else {
            if (this.removeSpaces) this.control.setValue(this.control.value.replace(/\s/g, ''));
            this.emitOnChangeValue.emit(this.control?.value);
        }
    }

    public onPaste(ev: ClipboardEvent): void {
        this.emitOnPaste.emit(ev);
    }

    public forceBlur(): void {
        this.input.nativeElement.blur();
    }

    public forceFocus(): void {
        this.input.nativeElement.focus();
    }

    public onSuffixClick(event: Event): void {
        if (this.initType !== 'password') {
            this.emitOnSuffixClick.emit(event);
        } else {
            this._displayPassword();
        }
    }

    private _displayPassword(): void {
        this.type = this.type === 'password' ? 'string' : 'password';
    }
}
