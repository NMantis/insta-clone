import { Directive, HostListener, Input } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appFadeHeader]'
})
export class FadeHeaderDirective {
  @Input('appFadeHeader') header: any;

  constructor(private domCtrl: DomController) { }

  ngOnInit(): void {
    this.header = this.header.el
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    let scrollTop = $event.detail.scrollTop

    if(scrollTop >= 255) scrollTop = 255

    const hexDist = scrollTop.toString(16)

    this.domCtrl.write(() => {
      this.header.style.setProperty('--background', `#f4f5f8${hexDist}`);
    })
  }
}
