"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var api_1 = require("@bull-board/api");
var bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
var express_2 = require("@bull-board/express");
var queues_1 = require("./asyncTasks/bullMQ/queues");
var PORT = process.env.PORT || 8000;
var serverAdapter = new express_2.ExpressAdapter();
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(queues_1.pdfJobQueue)],
    serverAdapter: serverAdapter,
});
serverAdapter.setBasePath('/admin');
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
function main() {
    app.use('/admin', serverAdapter.getRouter());
    app.use('/api', routes_1.default);
    app.listen(PORT, function () { return console.log("> Server running on port ".concat(PORT)); });
}
main();
