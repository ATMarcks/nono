import { trigger, style, animate, transition, state } from '@angular/animations';

// https://stackoverflow.com/a/47540857/4600224
export const fade = [
  trigger('fade', [
    state('in', style({ opacity: '1' })),
    state('out', style({ opacity: '0' })),
    transition('* <=> *', [
      animate(1000)
    ])
  ])
];
