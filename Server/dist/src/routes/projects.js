"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var projects_1 = __importDefault(require("../controllers/projects"));
var router = (0, express_1.Router)();
router.get('/', middlewares_1.checkToken, projects_1.default.list);
router.post('/', middlewares_1.checkToken, projects_1.default.create);
router.get('/:id', middlewares_1.checkToken, projects_1.default.getOne);
router.post('/chat', middlewares_1.checkToken, projects_1.default.chat);
exports.default = router;
