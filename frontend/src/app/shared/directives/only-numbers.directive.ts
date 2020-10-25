import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[numbersOnly]'
})
export class OnlyNumbersDirective {
    private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowUp', 'ArrowDown' ];

    constructor(private el: ElementRef) {
    }

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, up/down arrows, tab, end, and home keys
        if (this.specialKeys.includes(event.key)) 
            return;

        let current: string = this.el.nativeElement.value;
        // We need this because the current value on the DOM element
        // is not yet updated with the value from this event
        let next: string = current.concat(event.key);

        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}