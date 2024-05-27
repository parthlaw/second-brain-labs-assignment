"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = __importDefault(require("./list"));
var create_1 = __importDefault(require("./create"));
var getOne_1 = __importDefault(require("./getOne"));
var chat_1 = __importDefault(require("./chat"));
exports.default = {
    list: list_1.default,
    create: create_1.default,
    getOne: getOne_1.default,
    chat: chat_1.default
};
