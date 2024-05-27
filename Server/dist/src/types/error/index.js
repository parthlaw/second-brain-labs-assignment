"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.UnIdentifiedError = exports.ApiError = void 0;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message, status, functionName) {
        var _this = _super.call(this, message) || this;
        _this.functionName = functionName;
        _this.status = status;
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var UnIdentifiedError = /** @class */ (function (_super) {
    __extends(UnIdentifiedError, _super);
    function UnIdentifiedError(message, functionName, err) {
        var _this = _super.call(this, message, 500, functionName) || this;
        _this.name = 'UnIdentifiedError';
        _this.error = err;
        return _this;
    }
    return UnIdentifiedError;
}(ApiError));
exports.UnIdentifiedError = UnIdentifiedError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message, functionName) {
        var _this = _super.call(this, message, 404, functionName) || this;
        _this.name = 'NotFoundError';
        return _this;
    }
    return NotFoundError;
}(ApiError));
exports.NotFoundError = NotFoundError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message, functionName) {
        var _this = _super.call(this, message, 401, functionName) || this;
        _this.name = 'UnauthorizedError';
        return _this;
    }
    return UnauthorizedError;
}(ApiError));
exports.UnauthorizedError = UnauthorizedError;
