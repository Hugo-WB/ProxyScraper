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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProxiesInFile = exports.checkProxy = exports.checkProxies = void 0;
var node_fetch_1 = require("node-fetch");
var fs_1 = __importDefault(require("fs"));
require("");
var Request_1 = require("../Request");
var checkProxy = function (url, proxy, timeout) {
    if (timeout === void 0) { timeout = 3000; }
    return __awaiter(void 0, void 0, void 0, function () {
        var timeoutPromise, validResponse;
        return __generator(this, function (_a) {
            try {
                timeoutPromise = new Promise(function (resolve, reject) {
                    return setTimeout(function () { return reject("TIMEOUT"); }, timeout);
                });
                validResponse = Request_1.getLinkResponse(url);
                // let validResponse: Promise<Response> = new Promise((resolve, reject) => {
                //   fetch(url, {
                //     agent: new HttpProxyAgent("http://" + proxy),
                //     redirect: "follow",
                //     follow: 50,
                //   }).then((re) => {
                //     re.text().then((text) => {
                //       if (text.includes("Tired of being tracked online? We can help.")) {
                //         resolve(re);
                //       }
                //     });
                //   }).catch((e)=>console.log(e));
                // });
                return [2 /*return*/, Promise.race([validResponse, timeoutPromise])];
            }
            catch (e) {
                throw "ERROR" + e;
            }
            return [2 /*return*/];
        });
    });
};
exports.checkProxy = checkProxy;
var checkProxies = function (proxies) { return __awaiter(void 0, void 0, void 0, function () {
    var url, proxyPromises, resolvedPromises, validProxies, i, promise, proxy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "http://duckduckgo.com/";
                proxyPromises = [];
                proxies.forEach(function (proxy) {
                    proxyPromises.push(checkProxy(url, proxy));
                });
                console.log("Sent requests, awaiting");
                return [4 /*yield*/, Promise.allSettled(proxyPromises)];
            case 1:
                resolvedPromises = _a.sent();
                validProxies = [];
                for (i = 0; i < proxyPromises.length; i++) {
                    promise = resolvedPromises[i];
                    proxy = proxies[i];
                    if (promise.status == "fulfilled") {
                        if (promise.value instanceof node_fetch_1.Response) {
                            validProxies.push(proxy);
                        }
                    }
                }
                console.log(((100 * validProxies.length) / proxies.length).toPrecision(3).toString() +
                    "% Valid Proxies");
                return [2 /*return*/, validProxies];
        }
    });
}); };
exports.checkProxies = checkProxies;
var checkProxiesInFile = function (fileLocation) { return __awaiter(void 0, void 0, void 0, function () {
    var proxies, output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                proxies = fs_1.default
                    .readFileSync(fileLocation, { encoding: "utf-8" })
                    .replace(/\r\n/g, "\n")
                    .split("\n");
                console.log(proxies);
                return [4 /*yield*/, checkProxies(proxies)];
            case 1:
                output = _a.sent();
                return [2 /*return*/, output];
        }
    });
}); };
exports.checkProxiesInFile = checkProxiesInFile;
