import {
  trigger,
  animate,
  transition,
  style,
  state
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  // the "in" style determines the "resting" state of the element when it is visible.
  transition('void => final', [
    animate('500ms ease-in')
  ])
]);
