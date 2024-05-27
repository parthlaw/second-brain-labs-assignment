"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFromS3 = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var fs_1 = require("fs");
var s3 = new aws_sdk_1.default.S3();
var downloadFromS3 = function (bucketName, key, destinationPath) {
    return new Promise(function (resolve, reject) {
        try {
            var fileStream = s3.getObject({
                Bucket: bucketName,
                Key: key
            }).createReadStream();
            var writeStream = (0, fs_1.createWriteStream)(destinationPath);
            fileStream.pipe(writeStream);
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
            fileStream.on('error', reject);
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.downloadFromS3 = downloadFromS3;
