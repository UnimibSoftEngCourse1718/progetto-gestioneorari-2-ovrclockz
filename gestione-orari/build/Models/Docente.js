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
var User_1 = require("./User");
var DocenteModel = /** @class */ (function (_super) {
    __extends(DocenteModel, _super);
    function DocenteModel(username, password) {
        return _super.call(this, username, password) || this;
    }
    return DocenteModel;
}(User_1.default));
exports.default = DocenteModel;
