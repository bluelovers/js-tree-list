"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _sortObjectKeys = require("sort-object-keys2");
exports.SYMBOL_OPTIONS = Symbol('options');
exports.compareById = vector => {
    return (a, b) => {
        const aid = Number(a.get('id'));
        const bid = Number(b.get('id'));
        if (aid > bid) {
            return vector ? 1 : -1;
        }
        else if (aid < bid) {
            return vector ? -1 : 1;
        }
        else {
            return 0;
        }
    };
};
/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
exports.removeEmptyChildren = (jTree, node = null, options) => {
    const { key_children } = options;
    node = node || jTree[0];
    if (node[key_children].length === 0) {
        delete node[key_children];
    }
    else {
        node[key_children].forEach(item => {
            exports.removeEmptyChildren(jTree, item, options);
        });
    }
};
/**
 * search-node
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} options
 */
exports.searchNode = (tree, node, criteria, options) => {
    const currentNode = node || tree.rootNode;
    if (criteria(currentNode)) {
        return currentNode;
    }
    const children = currentNode.children;
    let target = null;
    for (let i = 0; i < children.length; i++) {
        const item = children[i];
        target = exports.searchNode(tree, item, criteria);
        if (target) {
            return target;
        }
    }
};
/**
 * showTree
 * @param {*} tree
 * @param {*} node
 * @param {*} level
 */
exports.showTree = (tree, node = null, level = 1) => {
    node = node || tree[0];
    if (node && node.content) {
        console.log(new Array(level).join('\t'), node.content);
    }
    if (node && node.children) {
        node.children.forEach(item => {
            exports.showTree(tree, item, level + 1);
        });
    }
};
/**
 * traversal-tree
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} callback
 */
function traversalTree(tree, node = null, criteria, callback) {
    const currentNode = node || tree.rootNode;
    if (!node) {
        if (typeof criteria === 'function' && criteria(currentNode)) {
            callback(currentNode);
        }
        else if (criteria === null) {
            callback(currentNode);
        }
    }
    currentNode.traversal(criteria, callback);
    const children = currentNode.children;
    children.forEach(item => {
        traversalTree(tree, item, criteria, callback);
    });
}
exports.traversalTree = traversalTree;
/**
 * serializeTree
 * @param {*} tree
 * @param {*} node
 * @param {*} target
 * @param {*} options
 */
exports.serializeTree = (tree, node = null, target = [], options) => {
    const { key_children } = options;
    node = node || tree.rootNode;
    if (!node) {
        return null;
    }
    const index = target.push(Object.assign({ [key_children]: [] }, node.content));
    node.children.forEach(item => {
        exports.serializeTree(tree, item, target[index - 1][key_children], options);
    });
    return target;
};
function sortKeys(data) {
    return _sortObjectKeys(data, {
        keys: [
            'id',
            'parent',
            'uuid',
            'level',
            'content',
            'children',
        ],
        useSource: true,
    });
}
exports.sortKeys = sortKeys;
