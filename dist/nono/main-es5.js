(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-start-page></app-start-page>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/start-page/start-page.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/start-page/start-page.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div *ngIf=\"startPageOpen\" style=\"display: block\">\n  <div class=\"start-display\">\n    <span><em>nonogram</em></span>\n  </div>\n  <div class=\"start-display-options\">\n    <div class=\"input-item-margin\">\n      Number of rows: <input class=\"start-input\" size=\"1\" min=\"0\" max=\"15\" type=\"number\" name=\"rows\" [(ngModel)]=\"rowCount\">\n    </div>\n    <div class=\"input-item-margin\">\n      Number of columns: <input class=\"start-input\" size=\"1\" min=\"0\" max=\"15\" type=\"number\" name=\"columns\" [(ngModel)]=\"columnCount\">\n    </div>\n    <div>\n      <button type=\"button\" class=\"start-button\" (click)=\"startClick()\">Start</button>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"!startPageOpen\" style=\"height: 100%;\" (keydown)=\"gameKeyPress($event)\">\n  <div class=\"game-table-parent\">\n    <table class=\"game-table\">\n      <tr>\n        <td></td>\n        <td *ngFor=\"let colNumCollection of currentGameData.colNumbers\" class=\"number-cell-top\">\n          <div class=\"bottom-align\">\n            <div *ngFor=\"let numVal of colNumCollection\" class=\"number-inner-cell-display-top\">\n              <div>{{ numVal }}</div>\n            </div>\n          </div>\n        </td>\n      </tr>\n      <tr *ngFor=\"let row of currentGameData.squareProperties; let rowIndex = index;\">\n        <td class=\"number-cell-left\">\n          <div *ngFor=\"let numVal of currentGameData.rowNumbers[rowIndex]\" class=\"number-inner-cell-display-left\">{{ numVal }}</div>\n        </td>\n        <td *ngFor=\"let col of row\"\n            class=\"game-cell\"\n            [style.background-color]=\"getBackgroundColor(col, rowIndex)\"\n            (click)=\"gameCellClick(col)\"\n            (middleclick)=\"gameCellMiddleClick(col)\"\n            (contextmenu)=\"gameCellRightClick(col)\">\n          <div class=\"inner-cell-display\">\n            <div style=\"height: 80%; width: 80%; margin: auto;\">\n              <img *ngIf=\"col.currentSelectionType === squareOptionsEnum.Marked\" class=\"cell-icon\" src=\"assets/baseline-help_outline-24px.svg\">\n              <img *ngIf=\"col.currentSelectionType === squareOptionsEnum.Crossed\" class=\"cell-icon\" src=\"assets/baseline-clear-24px.svg\">\n            </div>\n          </div>\n        </td>\n      </tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/animations/animations.ts":
/*!**************************************!*\
  !*** ./src/animations/animations.ts ***!
  \**************************************/
/*! exports provided: fadeAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeAnimation", function() { return fadeAnimation; });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");

var fadeAnimation = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["trigger"])('fadeAnimation', [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':enter', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 1 }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(300)
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["transition"])(':leave', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["animate"])(300, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 0 }))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["state"])('*', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_0__["style"])({ opacity: 0 })),
]);


/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _start_page_start_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./start-page/start-page.component */ "./src/app/start-page/start-page.component.ts");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/game.service */ "./src/services/game.service.ts");
/* harmony import */ var _directives_middle_mouse_click_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../directives/middle-mouse-click.directive */ "./src/directives/middle-mouse-click.directive.ts");








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _start_page_start_page_component__WEBPACK_IMPORTED_MODULE_5__["StartPageComponent"],
                _directives_middle_mouse_click_directive__WEBPACK_IMPORTED_MODULE_7__["MiddleclickDirective"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]
            ],
            providers: [_services_game_service__WEBPACK_IMPORTED_MODULE_6__["GameService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/start-page/start-page.component.scss":
/*!******************************************************!*\
  !*** ./src/app/start-page/start-page.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@-webkit-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.start-display {\n  display: flex;\n  height: 300px;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 0.5em;\n  color: white;\n  font-size: calc(10px + 12vw);\n}\n.start-display-options {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  color: white;\n  font-size: calc(10px + 3vw);\n}\n.start-button {\n  background-color: Transparent;\n  background-repeat: no-repeat;\n  border-radius: 25px;\n  border: 3px solid white;\n  padding: 15px;\n  cursor: pointer;\n  overflow: hidden;\n  outline: none;\n  color: white;\n  font-size: calc(10px + 2vw);\n  font-weight: bold;\n}\n.input-item-margin {\n  margin-bottom: 1em;\n}\n.start-input {\n  border: 0;\n  outline: 0;\n  background: transparent;\n  border-bottom: 3px solid white;\n  color: white;\n  font-size: calc(10px + 1vw + 1vh);\n  width: 1.5em;\n}\n.game-table-parent {\n  display: flex;\n  justify-content: center;\n}\n.game-table {\n  border: calc(1px + 0.10vh + 0.06vw) solid black;\n  border-radius: calc(.5vh + .3vw);\n  background-color: black;\n  -webkit-transform: scale(0.8);\n          transform: scale(0.8);\n}\n.game-cell {\n  transition: background-color 100ms linear;\n  background-color: #919FA8;\n  border-radius: calc(.5vh + .3vw);\n  height: calc(1px + 2.3vh + 1.3vw);\n  width: calc(1px + 2.3vh + 1.3vw);\n  border: calc(1px + 0.10vh + 0.06vw) solid black;\n}\n.inner-cell-display {\n  margin: auto;\n  overflow: hidden;\n  color: white;\n}\n.number-inner-cell-display-top {\n  color: white;\n  font-size: calc(1vw + 1vh);\n  padding-bottom: calc(.2vw + .2vh);\n  margin: 0 auto;\n}\n.number-inner-cell-display-left {\n  color: white;\n  font-size: calc(1vw + 1vh);\n  float: right;\n  padding-right: calc(.5vw + .5vh);\n}\n.assist-text {\n  float: right;\n  color: white;\n  padding-top: 3px;\n}\n.assist-text:hover {\n  cursor: pointer;\n}\n.bottom-align {\n  display: flex;\n  align-items: flex-end;\n  flex-direction: column;\n  justify-content: center;\n}\n.number-cell-top {\n  vertical-align: bottom;\n  text-align: center;\n  padding-top: calc(.2vw + .2vh);\n}\n.number-cell-left {\n  padding-left: calc(.5vw + .5vh);\n}\n.cell-icon {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FsZXgvV2Vic3Rvcm1Qcm9qZWN0cy9ub25vL3NyYy9hcHAvc3RhcnQtcGFnZS9zdGFydC1wYWdlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zdGFydC1wYWdlL3N0YXJ0LXBhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRTtJQUFPLFVBQUE7RUNFUDtFRERBO0lBQU8sVUFBQTtFQ0lQO0FBQ0Y7QURQQTtFQUNFO0lBQU8sVUFBQTtFQ0VQO0VEREE7SUFBTyxVQUFBO0VDSVA7QUFDRjtBREZBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFFQSxZQUFBO0VBQ0EsNEJBQUE7QUNHRjtBREFBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQ0dGO0FEQUE7RUFDRSw2QkFBQTtFQUNBLDRCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLDJCQUFBO0VBQ0EsaUJBQUE7QUNHRjtBREFBO0VBQ0Usa0JBQUE7QUNHRjtBREFBO0VBQ0UsU0FBQTtFQUNBLFVBQUE7RUFDQSx1QkFBQTtFQUNBLDhCQUFBO0VBQ0EsWUFBQTtFQUNBLGlDQUFBO0VBQ0EsWUFBQTtBQ0dGO0FEQUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUNHRjtBREFBO0VBQ0UsK0NBQUE7RUFDQSxnQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsNkJBQUE7VUFBQSxxQkFBQTtBQ0dGO0FEQUE7RUFDRSx5Q0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsK0NBQUE7QUNHRjtBREFBO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBQ0dGO0FEQUE7RUFDRSxZQUFBO0VBQ0EsMEJBQUE7RUFDQSxpQ0FBQTtFQUNBLGNBQUE7QUNHRjtBREFBO0VBQ0UsWUFBQTtFQUNBLDBCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0FDR0Y7QURBQTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUNHRjtBREFBO0VBQ0UsZUFBQTtBQ0dGO0FEQUE7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FDR0Y7QURBQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtBQ0dGO0FEQUE7RUFDRSwrQkFBQTtBQ0dGO0FEQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQ0dGIiwiZmlsZSI6InNyYy9hcHAvc3RhcnQtcGFnZS9zdGFydC1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGtleWZyYW1lcyBmYWRlaW4ge1xuICBmcm9tIHsgb3BhY2l0eTogMH1cbiAgdG8gICB7IG9wYWNpdHk6IDF9XG59XG5cbi5zdGFydC1kaXNwbGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAzMDBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IC41ZW07XG5cbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IGNhbGMoMTBweCArIDEydncpO1xufVxuXG4uc3RhcnQtZGlzcGxheS1vcHRpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDEwcHggKyAzdncpO1xufVxuXG4uc3RhcnQtYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogVHJhbnNwYXJlbnQ7XG4gIGJhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgYm9yZGVyOiAzcHggc29saWQgd2hpdGU7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGN1cnNvcjpwb2ludGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdXRsaW5lOm5vbmU7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDEwcHggKyAydncpO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmlucHV0LWl0ZW0tbWFyZ2luIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuXG4uc3RhcnQtaW5wdXQge1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgd2hpdGU7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDEwcHggKyAxdncgKyAxdmgpO1xuICB3aWR0aDogMS41ZW07XG59XG5cbi5nYW1lLXRhYmxlLXBhcmVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uZ2FtZS10YWJsZSB7XG4gIGJvcmRlcjogY2FsYygxcHggKyAwLjEwdmggKyAwLjA2dncpIHNvbGlkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiBjYWxjKC41dmggKyAuM3Z3KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcbn1cblxuLmdhbWUtY2VsbCB7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMTAwbXMgbGluZWFyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTE5RkE4O1xuICBib3JkZXItcmFkaXVzOiBjYWxjKC41dmggKyAuM3Z3KTtcbiAgaGVpZ2h0OiBjYWxjKDFweCArIDIuM3ZoICsgMS4zdncpO1xuICB3aWR0aDogY2FsYygxcHggKyAyLjN2aCArIDEuM3Z3KTs7XG4gIGJvcmRlcjogY2FsYygxcHggKyAwLjEwdmggKyAwLjA2dncpIHNvbGlkIGJsYWNrO1xufVxuXG4uaW5uZXItY2VsbC1kaXNwbGF5IHtcbiAgbWFyZ2luOiBhdXRvO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5udW1iZXItaW5uZXItY2VsbC1kaXNwbGF5LXRvcCB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDF2dyArIDF2aCk7XG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKC4ydncgKyAuMnZoKTtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5udW1iZXItaW5uZXItY2VsbC1kaXNwbGF5LWxlZnQge1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogY2FsYygxdncgKyAxdmgpO1xuICBmbG9hdDogcmlnaHQ7XG4gIHBhZGRpbmctcmlnaHQ6IGNhbGMoLjV2dyArIC41dmgpO1xufVxuXG4uYXNzaXN0LXRleHQge1xuICBmbG9hdDogcmlnaHQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZy10b3A6IDNweDtcbn1cblxuLmFzc2lzdC10ZXh0OmhvdmVyIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uYm90dG9tLWFsaWduIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLm51bWJlci1jZWxsLXRvcCB7XG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IGNhbGMoLjJ2dyArIC4ydmgpO1xufVxuXG4ubnVtYmVyLWNlbGwtbGVmdCB7XG4gIHBhZGRpbmctbGVmdDogY2FsYyguNXZ3ICsgLjV2aCk7XG59XG5cbi5jZWxsLWljb24ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuIiwiQGtleWZyYW1lcyBmYWRlaW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG4uc3RhcnQtZGlzcGxheSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMzAwcHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAwLjVlbTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IGNhbGMoMTBweCArIDEydncpO1xufVxuXG4uc3RhcnQtZGlzcGxheS1vcHRpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDEwcHggKyAzdncpO1xufVxuXG4uc3RhcnQtYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogVHJhbnNwYXJlbnQ7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGJvcmRlcjogM3B4IHNvbGlkIHdoaXRlO1xuICBwYWRkaW5nOiAxNXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDEwcHggKyAydncpO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmlucHV0LWl0ZW0tbWFyZ2luIHtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuXG4uc3RhcnQtaW5wdXQge1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgd2hpdGU7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDEwcHggKyAxdncgKyAxdmgpO1xuICB3aWR0aDogMS41ZW07XG59XG5cbi5nYW1lLXRhYmxlLXBhcmVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uZ2FtZS10YWJsZSB7XG4gIGJvcmRlcjogY2FsYygxcHggKyAwLjEwdmggKyAwLjA2dncpIHNvbGlkIGJsYWNrO1xuICBib3JkZXItcmFkaXVzOiBjYWxjKC41dmggKyAuM3Z3KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcbn1cblxuLmdhbWUtY2VsbCB7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMTAwbXMgbGluZWFyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTE5RkE4O1xuICBib3JkZXItcmFkaXVzOiBjYWxjKC41dmggKyAuM3Z3KTtcbiAgaGVpZ2h0OiBjYWxjKDFweCArIDIuM3ZoICsgMS4zdncpO1xuICB3aWR0aDogY2FsYygxcHggKyAyLjN2aCArIDEuM3Z3KTtcbiAgYm9yZGVyOiBjYWxjKDFweCArIDAuMTB2aCArIDAuMDZ2dykgc29saWQgYmxhY2s7XG59XG5cbi5pbm5lci1jZWxsLWRpc3BsYXkge1xuICBtYXJnaW46IGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm51bWJlci1pbm5lci1jZWxsLWRpc3BsYXktdG9wIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IGNhbGMoMXZ3ICsgMXZoKTtcbiAgcGFkZGluZy1ib3R0b206IGNhbGMoLjJ2dyArIC4ydmgpO1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLm51bWJlci1pbm5lci1jZWxsLWRpc3BsYXktbGVmdCB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiBjYWxjKDF2dyArIDF2aCk7XG4gIGZsb2F0OiByaWdodDtcbiAgcGFkZGluZy1yaWdodDogY2FsYyguNXZ3ICsgLjV2aCk7XG59XG5cbi5hc3Npc3QtdGV4dCB7XG4gIGZsb2F0OiByaWdodDtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nLXRvcDogM3B4O1xufVxuXG4uYXNzaXN0LXRleHQ6aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5ib3R0b20tYWxpZ24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4ubnVtYmVyLWNlbGwtdG9wIHtcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nLXRvcDogY2FsYyguMnZ3ICsgLjJ2aCk7XG59XG5cbi5udW1iZXItY2VsbC1sZWZ0IHtcbiAgcGFkZGluZy1sZWZ0OiBjYWxjKC41dncgKyAuNXZoKTtcbn1cblxuLmNlbGwtaWNvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/start-page/start-page.component.ts":
/*!****************************************************!*\
  !*** ./src/app/start-page/start-page.component.ts ***!
  \****************************************************/
/*! exports provided: StartPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartPageComponent", function() { return StartPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _animations_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../animations/animations */ "./src/animations/animations.ts");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/game.service */ "./src/services/game.service.ts");
/* harmony import */ var _constants_game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants/game */ "./src/constants/game.ts");





var StartPageComponent = /** @class */ (function () {
    function StartPageComponent(gameService) {
        var _this = this;
        this.gameService = gameService;
        this.squareOptionsEnum = _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"];
        this.startPageOpen = true;
        this.newGameSub = this.gameService.newGame$.subscribe(function (newGameData) {
            _this.currentGameData = newGameData;
        });
    }
    StartPageComponent.prototype.ngOnDestroy = function () {
        this.newGameSub.unsubscribe();
    };
    StartPageComponent.prototype.keyPress = function (event) {
        console.log({ event: event });
    };
    StartPageComponent.prototype.gameCellClick = function (col) {
        if (col.currentSelectionType === _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Selected || col.currentSelectionType === _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Crossed) {
            col.currentSelectionType = null;
        }
        else if (col.currentSelectionType === null || col.currentSelectionType === _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Marked) {
            col.currentSelectionType = _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Selected;
        }
    };
    StartPageComponent.prototype.gameCellMiddleClick = function (col) {
        if (![_constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Selected, _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Crossed].includes(col.currentSelectionType)) {
            if (col.currentSelectionType === null) {
                col.currentSelectionType = _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Marked;
            }
            else {
                col.currentSelectionType = null;
            }
        }
    };
    StartPageComponent.prototype.gameCellRightClick = function (col) {
        if ([_constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Selected, _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Crossed].includes(col.currentSelectionType)) {
            col.currentSelectionType = null;
        }
        else if (col.currentSelectionType === null || col.currentSelectionType === _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Marked) {
            col.currentSelectionType = _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Crossed;
        }
    };
    StartPageComponent.prototype.getBackgroundColor = function (col, rowIndex) {
        if (col.currentSelectionType === _constants_game__WEBPACK_IMPORTED_MODULE_4__["SquareOptions"].Selected) {
            return '#0079B8';
        }
        else {
            if (rowIndex % 2 === 0) {
                return '#B7C5CE';
            }
            return '#919FA8';
        }
    };
    StartPageComponent.prototype.gameKeypress = function (e) {
        console.log({ e: e });
    };
    StartPageComponent.prototype.startClick = function () {
        this.startPageOpen = false;
        this.gameService.newGame(parseInt(this.columnCount, 10), parseInt(this.rowCount, 10));
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('document:keydown', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [KeyboardEvent]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], StartPageComponent.prototype, "keyPress", null);
    StartPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-start-page',
            template: __webpack_require__(/*! raw-loader!./start-page.component.html */ "./node_modules/raw-loader/index.js!./src/app/start-page/start-page.component.html"),
            animations: [_animations_animations__WEBPACK_IMPORTED_MODULE_2__["fadeAnimation"]],
            styles: [__webpack_require__(/*! ./start-page.component.scss */ "./src/app/start-page/start-page.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"]])
    ], StartPageComponent);
    return StartPageComponent;
}());



/***/ }),

/***/ "./src/constants/game.ts":
/*!*******************************!*\
  !*** ./src/constants/game.ts ***!
  \*******************************/
/*! exports provided: SquareOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SquareOptions", function() { return SquareOptions; });
var SquareOptions;
(function (SquareOptions) {
    SquareOptions[SquareOptions["Selected"] = 0] = "Selected";
    SquareOptions[SquareOptions["Crossed"] = 1] = "Crossed";
    SquareOptions[SquareOptions["Marked"] = 2] = "Marked";
})(SquareOptions || (SquareOptions = {}));


/***/ }),

/***/ "./src/directives/middle-mouse-click.directive.ts":
/*!********************************************************!*\
  !*** ./src/directives/middle-mouse-click.directive.ts ***!
  \********************************************************/
/*! exports provided: MiddleclickDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiddleclickDirective", function() { return MiddleclickDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/* From: https://stackoverflow.com/a/52003670/4600224 */

var MiddleclickDirective = /** @class */ (function () {
    function MiddleclickDirective() {
        this.middleclick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    MiddleclickDirective.prototype.middleclickEvent = function (event) {
        if (event.which === 2) {
            this.middleclick.emit(event);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])('middleclick'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MiddleclickDirective.prototype, "middleclick", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('mouseup', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], MiddleclickDirective.prototype, "middleclickEvent", null);
    MiddleclickDirective = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"])({ selector: '[middleclick]' }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MiddleclickDirective);
    return MiddleclickDirective;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/services/game.service.ts":
/*!**************************************!*\
  !*** ./src/services/game.service.ts ***!
  \**************************************/
/*! exports provided: GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var GameService = /** @class */ (function () {
    function GameService() {
        this.gameData = this.createNewGame(0, 0);
        this.newGameSub = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.newGame$ = this.newGameSub.asObservable();
    }
    GameService.prototype.newGame = function (cols, rows) {
        var newGame = this.createNewGame(cols, rows);
        var newGameSquareProperties = [];
        newGame.rowNumbers = [];
        for (var i = 0; i < rows; i++) {
            var row = [];
            for (var j = 0; j < cols; j++) {
                row.push({
                    squareSolution: Math.random() < .5,
                    currentSelectionType: null,
                });
            }
            newGame.rowNumbers.push(this.generateDisplayNumbers.apply(this, row.map(function (r) { return r.squareSolution; }).reverse()));
            console.log(newGame.rowNumbers);
            newGameSquareProperties.push(row);
        }
        newGame.colNumbers = [];
        var _loop_1 = function (i) {
            var colArr = [];
            newGameSquareProperties.forEach(function (row) {
                colArr.push(row[i].squareSolution);
            });
            newGame.colNumbers.push(this_1.generateDisplayNumbers.apply(this_1, colArr));
        };
        var this_1 = this;
        for (var i = 0; i < newGameSquareProperties[0].length; i++) {
            _loop_1(i);
        }
        newGame.squareProperties = newGameSquareProperties;
        this.gameData = newGame;
        this.newGameSub.next(this.gameData);
    };
    GameService.prototype.createNewGame = function (cols, rows) {
        return {
            rows: rows,
            cols: cols,
            squareProperties: [[]],
            colNumbers: [[]],
            rowNumbers: [[]],
            cursor: {
                x: 0,
                y: 0,
                hidden: true
            }
        };
    };
    GameService.prototype.generateDisplayNumbers = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var numbers = [];
        var counting = false;
        values.forEach(function (cell) {
            if (cell) {
                if (counting === false) {
                    counting = true;
                    numbers.push(1);
                }
                else {
                    numbers[numbers.length - 1]++;
                }
            }
            else {
                if (counting === true) {
                    counting = false;
                }
            }
        });
        return numbers;
    };
    GameService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], GameService);
    return GameService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/alex/WebstormProjects/nono/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map