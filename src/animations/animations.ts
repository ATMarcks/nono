import {
  trigger,
  animate,
  transition,
  style,
  state
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 1 }),
    animate(300)
  ]),
  transition(':leave', [
    animate(300, style({ opacity: 0 }))
  ]),
  state('*', style({ opacity: 0 })),
]);
