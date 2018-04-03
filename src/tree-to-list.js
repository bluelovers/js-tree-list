"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function TreeToList(tree) {
    let list = [];
    let pnode = tree.root();
    _loop(pnode, 0);
    function _node(pnode, level) {
        let item = Object.assign({}, pnode, {
            parent: (pnode.parent ? pnode.parent.id : null),
        });
        delete item.children;
        item = utils_1.sortKeys(item);
        list.push(item);
        return pnode;
    }
    function _loop(pnode, level) {
        _node(pnode, level);
        if (pnode.children.length) {
            for (let i in pnode.children) {
                _loop(pnode.children[i], level + 1);
            }
        }
    }
    return list;
}
exports.TreeToList = TreeToList;
exports.default = TreeToList;
