"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
class Node {
    constructor(content, mode) {
        this.children = [];
        this.id = shortid();
        if (mode) {
            Object.assign(this, content);
        }
        else {
            this.content = content;
        }
        this.parent = null;
        this.children = [];
        //this.length = 0;
    }
    valueOf() {
        return this.content;
    }
    parents() {
        let ps = [];
        let c = this;
        while (c.parent) {
            // @ts-ignore
            c = c.parent;
            ps.push(c);
        }
        return ps;
    }
    size() {
        return this.length;
    }
    get(fieldKey) {
        if (typeof this.content[fieldKey] !== 'undefined') {
            return this.content[fieldKey];
        }
    }
    set(fieldKey, value) {
        return !!(this.content[fieldKey] = value);
    }
    get length() {
        return this.children.length;
    }
    add(child, mode) {
        const node = child instanceof Node ? child : new Node(child, mode);
        node.parent = this;
        this.children.push(node);
        return node;
    }
    remove(callback) {
        const index = this.children.findIndex(callback);
        if (index > -1) {
            const removeItems = this.children.splice(index, 1);
            return removeItems;
        }
        return [];
    }
    sort(compare) {
        return this.children.sort(compare);
    }
    traversal(criteria, callback) {
        criteria = criteria || (() => true);
        this.children.filter(criteria).forEach(callback);
    }
}
exports.Node = Node;
exports.default = Node;
