"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkResponse = exports.getLinkRaw = exports.getLinkCheerio = void 0;
var random_useragent_1 = __importDefault(require("random-useragent"));
var cheerio_1 = __importDefault(require("cheerio"));
var node_fetch_1 = __importStar(require("node-fetch"));
var http_proxy_agent_1 = require("http-proxy-agent");
var sleep = function (ms) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
    });
}); };
var getLinkCheerio = function (url, proxy) { return __awaiter(void 0, void 0, void 0, function () {
    var response, cheeriod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getLinkRaw(url, proxy)];
            case 1:
                response = _a.sent();
                cheeriod = cheerio_1.default.load(response);
                return [2 /*return*/, cheeriod];
        }
    });
}); };
exports.getLinkCheerio = getLinkCheerio;
var getLinkRaw = function (url, proxy) { return __awaiter(void 0, void 0, void 0, function () {
    var stringResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getLinkResponse(url, proxy)];
            case 1: return [4 /*yield*/, (_a.sent()).text()];
            case 2:
                stringResponse = _a.sent();
                return [2 /*return*/, stringResponse];
        }
    });
}); };
exports.getLinkRaw = getLinkRaw;
var getLinkResponse = function (url, proxy) { return __awaiter(void 0, void 0, void 0, function () {
    var userAgent, myHeaders, options, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("REQUESTING: \n" + url);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userAgent = random_useragent_1.default.getRandom(function (ua) {
                    return ua.browserName === "Chrome";
                });
                if (userAgent == null) {
                    userAgent =
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36";
                }
                myHeaders = {
                    "User-Agent": userAgent,
                };
                options = {};
                if (proxy == undefined) {
                    options = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow",
                        follow: 100,
                        agent: new http_proxy_agent_1.HttpProxyAgent("http://" + "172.67.181.36:80"),
                    };
                }
                else {
                    options = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow",
                        follow: 100,
                    };
                }
                return [4 /*yield*/, node_fetch_1.default(url, options)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, new node_fetch_1.Response("<html></html>")];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getLinkResponse = getLinkResponse;
