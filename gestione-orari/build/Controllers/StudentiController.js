"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UsersController_1 = require("./UsersController");
var Studenti = /** @class */ (function (_super) {
    __extends(StudentiController, _super);
    function StudentiController() {
        return _super.call(this) || this;
    }
    return StudentiController;
}(UsersController_1.default));
exports.default = Studenti;
