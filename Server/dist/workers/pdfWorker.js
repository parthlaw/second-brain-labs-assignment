"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var s3_1 = require("./utils/s3");
var cohere_1 = require("./utils/cohere");
var project_1 = require("./data/project");
var client_1 = require("@prisma/client");
var embeddings_1 = require("./data/embeddings");
var processPdf = function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var text, lines, embeddings, i, _a, embeddings_2, embeddings_2_1, embedding, tokens, result, e_1_1, err_1;
    var _b, e_1, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 18, , 20]);
                return [4 /*yield*/, (0, s3_1.downloadFromS3)(process.env.BUCKET_NAME, job.key, "./workers/temp/".concat(job.key))];
            case 1:
                _e.sent();
                console.log("File downloaded");
                return [4 /*yield*/, (0, cohere_1.extractTextFromPDF)("./workers/temp/".concat(job.key))];
            case 2:
                text = _e.sent();
                lines = text.split('\n').filter(function (line) { return line.trim().length > 0; });
                return [4 /*yield*/, (0, cohere_1.createEmbeddings)(lines)];
            case 3:
                embeddings = (_e.sent());
                console.log("ADDING TO DATABASE");
                i = 0;
                _e.label = 4;
            case 4:
                _e.trys.push([4, 10, 11, 16]);
                _a = true, embeddings_2 = __asyncValues(embeddings);
                _e.label = 5;
            case 5: return [4 /*yield*/, embeddings_2.next()];
            case 6:
                if (!(embeddings_2_1 = _e.sent(), _b = embeddings_2_1.done, !_b)) return [3 /*break*/, 9];
                _d = embeddings_2_1.value;
                _a = false;
                embedding = _d;
                tokens = (0, cohere_1.countTokens)(lines[i]);
                return [4 /*yield*/, (0, embeddings_1.addEmbedding)(tokens, embedding, lines[i], job.projectId)];
            case 7:
                result = _e.sent();
                console.log("Embeddings created: ", result);
                i++;
                _e.label = 8;
            case 8:
                _a = true;
                return [3 /*break*/, 5];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 11:
                _e.trys.push([11, , 14, 15]);
                if (!(!_a && !_b && (_c = embeddings_2.return))) return [3 /*break*/, 13];
                return [4 /*yield*/, _c.call(embeddings_2)];
            case 12:
                _e.sent();
                _e.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16: return [4 /*yield*/, (0, project_1.changeProjectStatus)(job.projectId, client_1.ProjectStatus.created)];
            case 17:
                _e.sent();
                return [3 /*break*/, 20];
            case 18:
                err_1 = _e.sent();
                return [4 /*yield*/, (0, project_1.changeProjectStatus)(job.projectId, client_1.ProjectStatus.failed)];
            case 19:
                _e.sent();
                console.log(err_1);
                throw err_1;
            case 20: return [2 /*return*/];
        }
    });
}); };
var workerHandler = function (job) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(job.data);
                console.log("Starting job: ", job.name);
                return [4 /*yield*/, processPdf(job.data.data)];
            case 1:
                _a.sent();
                console.log("Completed job: ", job.name);
                return [2 /*return*/];
        }
    });
}); };
exports.default = workerHandler;
