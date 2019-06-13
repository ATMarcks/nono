/* From: https://stackoverflow.com/a/52003670/4600224 */
import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[middleclick]' })
export class MiddleclickDirective  {
  @Output('middleclick') middleclick = new EventEmitter();

  constructor() {}

  @HostListener('mouseup', ['$event'])
  middleclickEvent(event) {
    if (event.which === 2) {
      this.middleclick.emit(event);
    }
  }
}
