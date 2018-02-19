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
var SegretarioModel = /** @class */ (function (_super) {
    __extends(SegretarioModel, _super);
    function SegretarioModel(username, password) {
        return _super.call(this, username, password) || this;
    }
    return SegretarioModel;
}(User_1.default));
exports.default = SegretarioModel;