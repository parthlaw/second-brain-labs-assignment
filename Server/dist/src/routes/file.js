"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var file_1 = __importDefault(require("../controllers/file"));
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
router.get('/getPreSignedUrl', middlewares_1.checkToken, file_1.default.getPreSignedUrl);
exports.default = router;
