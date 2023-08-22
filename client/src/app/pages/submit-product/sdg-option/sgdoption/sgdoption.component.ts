import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sgdoption',
  templateUrl: './sgdoption.component.html',
  styleUrls: ['./sgdoption.component.scss']
})
export class SGDOptionComponent {

  @Input() value: string;
  @Input() id: string;
  @Output() onChange: EventEmitter<{event: any, value: string}> = new EventEmitter();
  checkboxValue: boolean = false;

  onChangeSDGOption(event, value: string) {
    this.onChange.emit({event, value});
  }
}
