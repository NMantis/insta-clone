import { Directive, Input, Renderer2, OnInit, HostListener } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit{
  @Input('appHideHeader') header: any;
  private headerHeight = 44;

  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  ngOnInit(): void {
    this.header = this.header.el

    this.domCtrl.read(() => {
      this.headerHeight = this.header.clientHeight;
    })
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    const scrollTop = $event.detail.scrollTop

    let position = -(scrollTop / 5)
    if(position < -this.headerHeight) {
      position = -this.headerHeight
    }

    let opacity = 1 - (position / -this.headerHeight)

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'top', `${position}px`);
      this.renderer.setStyle(this.header, 'opacity', opacity);
    })
  }
}
