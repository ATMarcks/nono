import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/settings.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public assistOn = false;

  constructor(public settingsService: SettingsService, public gameService: GameService) {
    this.gameService.assist$.subscribe((assistOn) => {
      this.assistOn = assistOn;
    });
  }

  ngOnInit() {

  }
}
