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
exports.getProxiesFromGoogleSearch = exports.getLinksFromGoogleSearch = void 0;
var Request_1 = require("../../Request");
var Scraping_1 = require("../Scraping");
var getLinksFromGoogleSearch = function (search, page) {
    if (page === void 0) { page = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var links, morePages, $, aTags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    links = [];
                    morePages = [];
                    return [4 /*yield*/, getGoogleSearchCheerio(search, page)];
                case 1:
                    $ = _a.sent();
                    aTags = $(".yuRUbf").children("a");
                    aTags.map(function (i, e) {
                        var href = $(e).attr("href");
                        if (href != undefined) {
                            links.push(href);
                        }
                    });
                    return [2 /*return*/, links];
            }
        });
    });
};
exports.getLinksFromGoogleSearch = getLinksFromGoogleSearch;
var getGoogleSearchCheerio = function (search, page) {
    if (page === void 0) { page = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var reg;
        return __generator(this, function (_a) {
            reg = new RegExp(/\s/, "g");
            return [2 /*return*/, Request_1.getLinkCheerio("https://www.google.com/search?q=" + search.replace(reg, "+") + "&start=" + ((page - 1) * 10).toString())];
        });
    });
};
var getProxiesFromGoogleSearch = function (search) { return __awaiter(void 0, void 0, void 0, function () {
    var proxies, googleLinksPromises, i, googlePagesLinks, linkProxiesPromises, linkProxies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                proxies = [];
                googleLinksPromises = [];
                for (i = 1; i < 3; i++) {
                    googleLinksPromises.push(getLinksFromGoogleSearch(search, i));
                }
                return [4 /*yield*/, Promise.allSettled(googleLinksPromises)
                    // Array of promises that contain all proxies on a google search link
                ];
            case 1:
                googlePagesLinks = _a.sent();
                linkProxiesPromises = [];
                googlePagesLinks.forEach(function (googleLinks) {
                    if (googleLinks.status == "fulfilled") {
                        googleLinks.value.forEach(function (link) {
                            linkProxiesPromises.push(Scraping_1.getProxiesFromURL(link));
                        });
                    }
                });
                return [4 /*yield*/, Promise.allSettled(linkProxiesPromises)];
            case 2:
                linkProxies = _a.sent();
                linkProxies.forEach(function (linkProxy) {
                    if (linkProxy.status == "fulfilled") {
                        console.log("INK PROXY");
                        console.log(linkProxy.value);
                        proxies.concat(linkProxy.value);
                    }
                });
                console.log("PROXIES 0");
                console.log(proxies);
                return [2 /*return*/, proxies];
        }
    });
}); };
exports.getProxiesFromGoogleSearch = getProxiesFromGoogleSearch;
var Google = /** @class */ (function () {
    function Google() {
    }
    return Google;
}());
exports.default = Google;
