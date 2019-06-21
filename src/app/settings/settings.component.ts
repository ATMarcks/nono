import { Component, OnInit } from '@angular/core';
import { cloneDeep, map } from 'lodash';

import { SettingsService } from '../../services/settings.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public assistOn = false;

  readonly init = {
    newGamePrompt: {
      open: false,
      cols: '',
      rows: '',
    },
    exportPrompt: {
      open: false,
      filename: '',
    },
    importPrompt: {
      open: false,
      fileData: null as File,
      fileImportError: null as string,
    }
  };

  // Each prompt should have an open key
  public prompts = {
    newGamePrompt: cloneDeep(this.init.newGamePrompt),
    exportPrompt: cloneDeep(this.init.exportPrompt),
    importPrompt: cloneDeep(this.init.importPrompt)
  };

  constructor(public settingsService: SettingsService, public gameService: GameService) {
    this.gameService.assist$.subscribe((assistOn) => {
      this.assistOn = assistOn;
    });
  }

  newGame() {
    // TODO: check cols/rows
    this.gameService.newGame(
      parseInt(this.prompts.newGamePrompt.cols, 10),
      parseInt(this.prompts.newGamePrompt.rows, 10)
    );
  }

  newGameCancel() {
    this.prompts.newGamePrompt = cloneDeep(this.init.newGamePrompt);
  }

  exportPuzzle() {
    this.settingsService.exportPuzzle(this.prompts.exportPrompt.filename);
    this.prompts.exportPrompt = cloneDeep(this.init.exportPrompt);
  }

  exportPuzzleCancel() {
    this.prompts.exportPrompt = cloneDeep(this.init.exportPrompt);
  }

  importPuzzleFile(e: any) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = this.settingsService.importPuzzle(fileReader.result.toString());
      if (result.success) {
        this.importPuzzleCancel();
      } else {
        this.prompts.importPrompt.fileImportError = result.error;
      }
    };
    fileReader.readAsText(file);
  }

  importPuzzleCancel() {
    this.prompts.importPrompt = cloneDeep(this.init.importPrompt);
  }

  ngOnInit() {

  }

  anyPromptOpen() {
    return map(Object.keys(this.prompts), key => this.prompts[key].open).includes(true);
  }
}
