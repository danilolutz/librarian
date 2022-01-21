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
exports.__esModule = true;
exports.createContact1637781284674 = void 0;
var TableForeignKeyPatch_1 = require("../TableForeignKeyPatch");
var TablePatch_1 = require("../TablePatch");
var createContact1637781284674 = /** @class */ (function () {
    function createContact1637781284674() {
    }
    createContact1637781284674.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.createTable(new TablePatch_1.TablePatch({
                            name: 'contact',
                            columns: [
                                {
                                    name: 'id',
                                    type: 'integer',
                                    isPrimary: true
                                },
                                {
                                    name: 'info',
                                    type: 'varchar'
                                },
                                {
                                    name: 'contactTypeId',
                                    type: 'integer'
                                },
                                {
                                    name: 'userId',
                                    type: 'integer'
                                },
                            ]
                        }), true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey('contact', new TableForeignKeyPatch_1.TableForeignKeyPatch({
                                columnNames: ['contactTypeId'],
                                referencedColumnNames: ['id'],
                                referencedTableName: 'contact_type',
                                onDelete: 'CASCADE'
                            }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey('contact', new TableForeignKeyPatch_1.TableForeignKeyPatch({
                                columnNames: ['userId'],
                                referencedColumnNames: ['id'],
                                referencedTableName: 'user',
                                onDelete: 'CASCADE'
                            }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    createContact1637781284674.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var table, contactTypeId, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.getTable('contact')];
                    case 1:
                        table = _a.sent();
                        contactTypeId = table.foreignKeys.find(function (fk) { return fk.columnNames.indexOf('contactTypeId') !== -1; });
                        return [4 /*yield*/, queryRunner.dropForeignKey('contact', contactTypeId)];
                    case 2:
                        _a.sent();
                        userId = table.foreignKeys.find(function (fk) { return fk.columnNames.indexOf('userId') !== -1; });
                        return [4 /*yield*/, queryRunner.dropForeignKey('contact', userId)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropTable('contact')];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return createContact1637781284674;
}());
exports.createContact1637781284674 = createContact1637781284674;
