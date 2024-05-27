"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisOptions = void 0;
exports.redisOptions = { host: process.env.REDIS_HOST || "localhost", port: parseInt(process.env.REDIS_PORT) || 6379 };
