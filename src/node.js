"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
const utils_1 = require("./utils");
class TreeNode {
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
        utils_1.sortKeys(this);
    }
    createNode(object, mode) {
        let options;
        let libTreeNode;
        if (this[utils_1.SYMBOL_OPTIONS]) {
            let s = this[utils_1.SYMBOL_OPTIONS];
            if (s.root) {
                options = s.root.options;
            }
            else {
                options = s.options;
            }
            libTreeNode = options.libTreeNode;
            let node = new libTreeNode(object, mode);
            node[utils_1.SYMBOL_OPTIONS] = s;
            return node;
        }
        libTreeNode = TreeNode;
        let node = new libTreeNode(object, mode);
        return node;
    }
    key() {
        return this.id;
    }
    value() {
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
        const node = child instanceof TreeNode ? child : this.createNode(child, mode);
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
    toData() {
        let pnode = this;
        let data = Object.assign({}, pnode, {
            parent: (pnode.parent ? pnode.parent.id : null),
            children: [],
        });
        //delete data[SYMBOL_OPTIONS];
        data.children = pnode.children.reduce(function (a, node) {
            a.push(node.toJSON());
            return a;
        }, []);
        if (data.children.length === 0) {
            delete data.children;
        }
        return utils_1.sortKeys(data);
    }
    toJSON() {
        return this.toData();
    }
}
exports.TreeNode = TreeNode;
exports.default = TreeNode;
