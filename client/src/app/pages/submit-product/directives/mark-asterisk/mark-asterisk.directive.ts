import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarkAsterisk]'
})
export class MarkAsteriskDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const asterisk: HTMLElement = this.renderer.createElement('span');
    this.renderer.setStyle(asterisk, 'color', 'red');
    this.renderer.appendChild(asterisk, this.renderer.createText('* '));

    const content = this.elementRef.nativeElement.innerHTML;
    this.elementRef.nativeElement.innerHTML = '';
    this.renderer.appendChild(this.elementRef.nativeElement, asterisk);
    this.renderer.appendChild(this.elementRef.nativeElement, this.renderer.createText(content));
  }
}

