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
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeProxyCz = void 0;
var Request_1 = require("../../Request");
var FreeProxyCzUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var $_1, rows, proxies_1, Base64Regex_1, EncodedRegex_1, JSCommands, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Request_1.getLinkCheerio(url)];
            case 1:
                $_1 = _a.sent();
                rows = $_1("#proxy_list").children("tbody").children("tr");
                proxies_1 = [];
                Base64Regex_1 = RegExp(/Base64\.decode\(".*?\"\)/);
                EncodedRegex_1 = RegExp(/".*"/);
                JSCommands = $_1.html().match(Base64Regex_1);
                rows.each(function (i, e) {
                    var _a, _b;
                    var JSCommand = (_a = $_1(e).html()) === null || _a === void 0 ? void 0 : _a.match(Base64Regex_1);
                    if (JSCommand == null && JSCommand == undefined) {
                        return;
                    }
                    var encoded = (_b = JSCommand[0]
                        .match(EncodedRegex_1)) === null || _b === void 0 ? void 0 : _b.toString().replace(new RegExp(/"/, "g"), "");
                    if (encoded == undefined) {
                        return;
                    }
                    var ip = Buffer.from(encoded, "base64").toString();
                    var port = $_1(e).find(".fport").text();
                    proxies_1.push(ip + ":" + port);
                });
                return [2 /*return*/, proxies_1];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
var FreeProxyCz = function (proxyProtocol) {
    if (proxyProtocol === void 0) { proxyProtocol = "http"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var url, proxyPromises, i, resolvedPromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://free-proxy.cz/en/proxylist/country/all/" +
                        proxyProtocol +
                        "/ping/all";
                    proxyPromises = [];
                    for (i = 1; i < 6; i++) {
                        proxyPromises.push(FreeProxyCzUrl(url + "/" + i.toString()));
                    }
                    return [4 /*yield*/, Promise.all(proxyPromises)];
                case 1:
                    resolvedPromises = _a.sent();
                    return [2 /*return*/, resolvedPromises.flat()];
            }
        });
    });
};
exports.FreeProxyCz = FreeProxyCz;
