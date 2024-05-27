"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("./user"));
var auth_1 = __importDefault(require("./auth"));
var file_1 = __importDefault(require("./file"));
var projects_1 = __importDefault(require("./projects"));
var router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/auth', auth_1.default);
router.use('/file', file_1.default);
router.use('/projects', projects_1.default);
exports.default = router;
