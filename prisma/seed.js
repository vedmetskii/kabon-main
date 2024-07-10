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
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_client_1 = require("prisma/prisma-client");
var prisma = new prisma_client_1.PrismaClient();
function isPageNotExist(path) {
    return __awaiter(this, void 0, void 0, function () {
        var page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.page.findFirst({
                        where: {
                            path: path,
                        }
                    })];
                case 1:
                    page = _a.sent();
                    console.log(page);
                    console.log(!page);
                    return [2 /*return*/, !page];
            }
        });
    });
}
function createPage(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var path = _b.path, title = _b.title;
        return __generator(this, function (_c) {
            return [2 /*return*/, prisma.page.create({
                    data: {
                        path: path,
                        title: title
                    }
                })];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var pathAndTitleOfRequiredPage, pages, _i, pathAndTitleOfRequiredPage_1, _a, path, title, pageIsNotExist, newPages;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pathAndTitleOfRequiredPage = [
                        {
                            path: "/",
                            title: "Main Page",
                        },
                        {
                            title: "Sign Out",
                            path: "/user/signout"
                        },
                        {
                            title: "News",
                            path: "/news"
                        },
                        {
                            title: "User",
                            path: "/user"
                        },
                        {
                            title: "Sign In",
                            path: "/user/signin"
                        }
                    ];
                    pages = [];
                    _i = 0, pathAndTitleOfRequiredPage_1 = pathAndTitleOfRequiredPage;
                    _b.label = 1;
                case 1:
                    if (!(_i < pathAndTitleOfRequiredPage_1.length)) return [3 /*break*/, 4];
                    _a = pathAndTitleOfRequiredPage_1[_i], path = _a.path, title = _a.title;
                    return [4 /*yield*/, isPageNotExist(path)];
                case 2:
                    pageIsNotExist = _b.sent();
                    if (pageIsNotExist) {
                        pages.push({
                            path: path,
                            title: title,
                        });
                    }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log(pages);
                    return [4 /*yield*/, Promise.all(pages.map(function (page) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createPage(page)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 5:
                    newPages = _b.sent();
                    console.log(newPages);
                    return [2 /*return*/];
            }
        });
    });
}
main();
