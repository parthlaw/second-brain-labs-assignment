"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("../controllers/user"));
// import {checkToken} from "../middlewares";
var router = (0, express_1.Router)();
router.post('/', user_1.default.create);
router.get('/');
exports.default = router;
