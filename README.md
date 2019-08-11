# Nono

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Game & Screenshots

The game can be played at [https://atmarcks.github.io/nono/](https://atmarcks.github.io/nono/). There are keyboard, mouse, and mixed controls:

*Keyboard*: The `arrow keys` are used for cell selection. The currently selected cell when using keyboard controls will have an orange-brown outline. The `A` key fills or unfills a square. The `S` key is used to mark a cell as empty (although this is not necessary for the completion of the puzzle). The `D` key marks a cell with a blue question mark, and can be used for note-keeping purposes and has no effect on the state of the puzzle. To activate keyboard controls, press any arrow key or the `A`, `S`, or `d` key. Keyboard controls will be deactivated after a certain period of inaction, but can be enabled again by pressing any of the aforementioned keys.

*Mouse*: Cells can be selected by hovering over them with the mouse cursor. The selected cell will have an orange outline. `Left click` will fill or unfill a cell. `Right click` will mark a cell as empty, and `Middle click` can be used to mark the cell as a note-keeping cell.

*Mixed*: Like with mouse controls, cells can be selected by hovering over them. The selected cell will have an orange outline. `Z` fills or unfills a square, `X` marks the cell as empty, and `C` marks the cell as a note-keeping cell.

There is an assist mode that can be toggled on and off. Toggling the assist mode on will automatically change incorrectly marked cells to a black question mark, indicating that an incorrect selection has been made for that cell.

Clicking the cog on the bottom left of the puzzle will open up a context menu that allows for exporting and importing puzzle files.

![Game screenshot](/github-assets/doc_screenshot.PNG)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. To build for GitHub Pages, use `ng build --prod --output-path docs --base-href /nono/`. 

