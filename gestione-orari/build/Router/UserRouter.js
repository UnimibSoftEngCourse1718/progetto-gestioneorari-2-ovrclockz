"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../Models/User");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    UserRouter.prototype.getUser = function (req, res) {
        User_1.default.find();
    };
    UserRouter.prototype.routes = function () {
        this.router.get('/', this.getUser);
    };
    return UserRouter;
}());
var UserRoutes = new UserRouter();
exports.default = UserRoutes;
