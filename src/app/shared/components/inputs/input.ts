import { Component, HostBinding, Input } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';

@Component({
    template: ''
})
export abstract class InputBase {
    @Input() public label: string;
    @Input() public abstractControl: AbstractControl = new UntypedFormControl();
    @Input() public placeholder: string = ' ';
    @Input() public disabled: boolean = false;
    @Input() public readonly: boolean = false;
    @Input() public help: string;

    public get control(): UntypedFormControl {
        return this.abstractControl as UntypedFormControl;
    }

    @HostBinding('class.readonly')
    public get readonlyIsActive(): boolean {
        return this.readonly;
    }

    @HostBinding('class.disabled')
    public get disabledIsActive(): boolean {
        return this.disabled || this.control.disabled || false;
    }

    @HostBinding('class.touched')
    public get typeIsTouched(): boolean {
        return this.control.touched;
    }
    @HostBinding('class.required')
    public get typeIsRequired(): boolean {
        return this.control.validator ? this.control.validator({} as AbstractControl)?.required : false;
    }

    @HostBinding('class.invalid')
    public get typeIsinvalid(): boolean {
        return this.control.invalid;
    }
}
