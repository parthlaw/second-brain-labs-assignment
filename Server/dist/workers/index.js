"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bullmq_1 = require("bullmq");
var pdfWorker_1 = __importDefault(require("./pdfWorker"));
var workerOptions = {
    connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT) || 6379
    }
};
var worker = new bullmq_1.Worker("pdfJobQueue", pdfWorker_1.default, workerOptions);
