import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'td-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
    @Input() public name: string = 'icon-blank';
    @HostBinding('style.--svgurl')
    public get nameIsActive(): string {
        return 'url(/assets/icons/' + this.name + '.svg)';
    }

    @Input() public color: string;
    @HostBinding('style.--colorIcon')
    public get colorIsActive(): string {
        return this.color ? 'var(--' + this.color + ')' : null;
    }

    @Input() public size: number;
    @HostBinding('style.--icon-size') public iconSize: string;

    public ngOnInit(): void {
        if (this.size) this.iconSize = this.size + 'px';
    }
}
