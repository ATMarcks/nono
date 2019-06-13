import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';

import { GameService } from '../services/game.service';

import { MiddleclickDirective } from '../directives/middle-mouse-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    MiddleclickDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
