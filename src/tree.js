"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const utils_1 = require("./utils");
class Tree {
    constructor(object = undefined) {
        this.rootNode = null;
        if (object) {
            this.rootNode = new node_1.default(object);
        }
    }
    root() {
        return this.rootNode;
    }
    // only for rootNode
    get(path) {
        return this.rootNode.get(path);
    }
    // only for rootNode
    set(path, value) {
        this.rootNode.set(path, value);
    }
    add(callback, object) {
        const type = typeof callback;
        if (type === 'string' && callback === 'root') {
            this.rootNode = new node_1.default(object);
            return this;
        }
        else if (type === 'function') {
            const target = utils_1.searchNode(this, null, callback);
            if (target && target.add(object)) {
                return this;
            }
            else {
                console.log('Warning', object);
            }
        }
    }
    contains(criteria) {
        return utils_1.searchNode(this, null, criteria);
    }
    remove(criteria) {
        const targetNode = this.contains(criteria);
        if (targetNode) {
            return !!targetNode.parent.remove(criteria);
        }
        return false;
    }
    move(search, destination) {
        const targetNode = this.contains(search);
        if (targetNode && this.remove(search)) {
            const destinationNode = this.contains(destination);
            return !!destinationNode.add(targetNode);
        }
        return false;
    }
    traversal(criteria, callback) {
        utils_1.traversalTree(this, null, criteria, callback);
    }
    sort(compare) {
        this.traversal(null, currentNode => {
            currentNode.sort(compare);
        });
    }
    toJson(options = {}) {
        const optionsDefault = {
            key_children: 'children',
            empty_children: true
        };
        options = Object.assign(optionsDefault, options);
        const result = utils_1.serializeTree(this, null, [], options);
        if (!options.empty_children) {
            utils_1.removeEmptyChildren(result, null, options);
        }
        if (result && result.length > 0) {
            return result[0];
        }
        else {
            return [];
        }
    }
}
exports.Tree = Tree;
exports.default = Tree;
