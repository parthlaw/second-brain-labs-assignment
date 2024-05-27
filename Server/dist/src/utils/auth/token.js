"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (refresh, id) {
    var exp = '168h';
    var token = jsonwebtoken_1.default.sign({ userId: id }, process.env.JWT_KEY, {
        expiresIn: exp,
    });
    var accessToken = { token: token, exp: exp };
    if (refresh) {
        var refreshToken = jsonwebtoken_1.default.sign({ userId: id }, process.env.JWT_KEY, {
            expiresIn: '7d',
        });
        return { accessToken: accessToken, refreshToken: refreshToken };
    }
    return { accessToken: accessToken };
};
exports.createToken = createToken;
var verifyToken = function (token) {
    var data = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    return data;
};
exports.verifyToken = verifyToken;
