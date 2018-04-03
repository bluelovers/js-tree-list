"use strict";
/**
 * Created by user on 2018/4/3/003.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src"));
const src_1 = require("./src");
exports.ListToTree = src_1.ListToTree;
exports.TreeToList = src_1.TreeToList;
exports.Tree = src_1.Tree;
exports.Node = src_1.Node;
const self = require("./index");
exports.default = self;
