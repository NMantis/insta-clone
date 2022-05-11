import { Directive, Input, HostBinding } from '@angular/core'

@Directive({
    selector: '[default]',
    host: {
        '(error)': 'updateUrl()',
        '(load)': 'load()',
        '[src]': 'src'
    }
})

export class ImagePreloadDirective {

    @Input()
    src: string | undefined | null;

    @Input()
    default: string;

    @HostBinding('class')
    className: string;
    
    updateUrl() {
        // <a href="https://www.flaticon.com/free-icons/profile" title="profile icons">Profile icons created by Freepik - Flaticon</a>
        this.src = this.default || 'assets/images/user.png';
    }

    load() {
        this.className = 'image-loaded';
    }

}