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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0M7QUFHcEMsbUNBQW1EO0FBSW5ELE1BQWEsUUFBUTtJQVlwQixZQUFZLE9BQU8sRUFBRSxJQUFjO1FBUG5DLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBUzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFcEIsSUFBSSxJQUFJLEVBQ1I7WUFDQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM3QjthQUVEO1lBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixrQkFBa0I7UUFFbEIsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNmLENBQUM7SUFFRCxVQUFVLENBQXdCLE1BQU0sRUFBRSxJQUFjO1FBRXZELElBQUksT0FBcUIsQ0FBQztRQUMxQixJQUFJLFdBQTRCLENBQUM7UUFFakMsSUFBSSxJQUFJLENBQUMsc0JBQWMsQ0FBQyxFQUN4QjtZQUNDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxzQkFBYyxDQUFDLENBQUM7WUFFN0IsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUNWO2dCQUNDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUN6QjtpQkFFRDtnQkFDQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUNwQjtZQUVELFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBRWxDLElBQUksSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV6QyxJQUFJLENBQUMsc0JBQWMsQ0FBQyxHQUFHLENBQUMs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TUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQy9DLFFBQVEsRUFBRSxFQUFFO1NBQ1osQ0FBQyxDQUFDO1FBRUgsOEJBQThCO1FBRTlCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSTtZQUV0RCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQzlCO1lBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNO1FBRUwsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBMUtELDRCQTBLQztBQUVELGtCQUFlLFFBQVEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaG9ydGlkID0gcmVxdWlyZSgnc2hvcnRpZCcpO1xuaW1wb3J0IHNvcnRPYmplY3RLZXlzIGZyb20gJ3NvcnQtb2JqZWN0LWtleXMyJztcbmltcG9ydCBUcmVlLCB7IElUcmVlT3B0aW9ucyB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBzb3J0S2V5cywgU1lNQk9MX09QVElPTlMgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgSUZpZWxkS2V5ID0gc3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sO1xuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGU8VCBleHRlbmRzIGFueSA9IGFueT5cbntcblx0aWQ/OiBzdHJpbmcgfCBudW1iZXI7XG5cblx0Y29udGVudDogVDtcblx0Y2hpbGRyZW46IFRyZWVOb2RlPFQ+W10gPSBbXTtcblx0Ly9sZW5ndGg6IG51bWJlcjtcblxuXHRwYXJlbnQ6IFRyZWVOb2RlPFQ+O1xuXG5cdFtTWU1CT0xfT1BUSU9OU10/O1xuXG5cdGNvbnN0cnVjdG9yKGNvbnRlbnQsIG1vZGU/OiBib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5pZCA9IHNob3J0aWQoKTtcblxuXHRcdGlmIChtb2RlKVxuXHRcdHtcblx0XHRcdE9iamVjdC5hc3NpZ24odGhpcywgY29udGVudCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHRcdH1cblxuXHRcdHRoaXMucGFyZW50ID0gbnVsbDtcblx0XHR0aGlzLmNoaWxkcmVuID0gW107XG5cdFx0Ly90aGlzLmxlbmd0aCA9IDA7XG5cblx0XHRzb3J0S2V5cyh0aGlzKVxuXHR9XG5cblx0Y3JlYXRlTm9kZTxVIGV4dGVuZHMgVHJlZU5vZGU8VD4+KG9iamVjdCwgbW9kZT86IGJvb2xlYW4pOiBVXG5cdHtcblx0XHRsZXQgb3B0aW9uczogSVRyZWVPcHRpb25zO1xuXHRcdGxldCBsaWJUcmVlTm9kZTogdHlwZW9mIFRyZWVOb2RlO1xuXG5cdFx0aWYgKHRoaXNbU1lNQk9MX09QVElPTlNdKVxuXHRcdHtcblx0XHRcdGxldCBzID0gdGhpc1tTWU1CT0xfT1BUSU9OU107XG5cblx0XHRcdGlmIChzLnJvb3QpXG5cdFx0XHR7XG5cdFx0XHRcdG9wdGlvbnMgPSBzLnJvb3Qub3B0aW9ucztcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0b3B0aW9ucyA9IHMub3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0bGliVHJlZU5vZGUgPSBvcHRpb25zLmxpYlRyZWVOb2RlO1xuXG5cdFx0XHRsZXQgbm9kZSA9IG5ldyBsaWJUcmVlTm9kZShvYmplY3QsIG1vZGUpO1xuXG5cdFx0XHRub2RlW1NZTUJPTF9PUFRJT05TXSA9IHM7XG5cblx0XHRcdHJldHVybiBub2RlIGFzIFU7XG5cdFx0fVxuXG5cdFx0bGliVHJlZU5vZGUgPSBUcmVlTm9kZTtcblxuXHRcdGxldCBub2RlID0gbmV3IGxpYlRyZWVOb2RlKG9iamVjdCwgbW9kZSk7XG5cdFx0cmV0dXJuIG5vZGUgYXMgVTtcblx0fVxuXG5cdHB1YmxpYyBrZXkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaWQ7XG5cdH1cblxuXHRwdWJsaWMgdmFsdWU8VSBleHRlbmRzIFQ+KCk6IFVcblx0e1xuXHRcdHJldHVybiB0aGlzLmNvbnRlbnQgYXMgVTtcblx0fVxuXG5cdHBhcmVudHMoKTogVHJlZU5vZGU8VD5bXVxuXHR7XG5cdFx0bGV0IHBzID0gW107XG5cdFx0bGV0IGMgPSB0aGlzO1xuXHRcdHdoaWxlIChjLnBhcmVudClcblx0XHR7XG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRjID0gYy5wYXJlbnQ7XG5cdFx0XHRwcy5wdXNoKGMpO1xuXHRcdH1cblx0XHRyZXR1cm4gcHM7XG5cdH1cblxuXHRzaXplKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmxlbmd0aDtcblx0fVxuXG5cdGdldDxVIGV4dGVuZHMgdW5rbm93bj4oZmllbGRLZXk6IElGaWVsZEtleSk6IFVcblx0e1xuXHRcdGlmICh0eXBlb2YgdGhpcy5jb250ZW50W2ZpZWxkS2V5XSAhPT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGVudFtmaWVsZEtleV0gYXMgVVxuXHRcdH1cblx0fVxuXG5cdHNldChmaWVsZEtleTogSUZpZWxkS2V5LCB2YWx1ZSlcblx0e1xuXHRcdHJldHVybiAhISh0aGlzLmNvbnRlbnRbZmllbGRLZXldID0gdmFsdWUpXG5cdH1cblxuXHRnZXQgbGVuZ3RoKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcblx0fVxuXG5cdGFkZDxVIGV4dGVuZHMgVD4oY2hpbGQ6IFUgfCBUcmVlTm9kZTxVPiwgbW9kZT86IGJvb2xlYW4pOiBUcmVlTm9kZTxVPlxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IGNoaWxkIGluc3RhbmNlb2YgVHJlZU5vZGUgPyBjaGlsZCA6IHRoaXMuY3JlYXRlTm9kZShjaGlsZCwgbW9kZSk7XG5cdFx0bm9kZS5wYXJlbnQgPSB0aGlzO1xuXHRcdHRoaXMuY2hpbGRyZW4ucHVzaChub2RlKTtcblx0XHRyZXR1cm4gbm9kZSBhcyBUcmVlTm9kZTxVPlxuXHR9XG5cblx0cmVtb3ZlPFUgZXh0ZW5kcyBUPihjYWxsYmFjayk6IFRyZWVOb2RlPFU+W11cblx0e1xuXHRcdGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZHJlbi5maW5kSW5kZXgoY2FsbGJhY2spXG5cdFx0aWYgKGluZGV4ID4gLTEpXG5cdFx0e1xuXHRcdFx0Y29uc3QgcmVtb3ZlSXRlbXMgPSB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSkgYXMgVHJlZU5vZGU8VT5bXTtcblx0XHRcdHJldHVybiByZW1vdmVJdGVtc1xuXHRcdH1cblx0XHRyZXR1cm4gW11cblx0fVxuXG5cdHNvcnQoY29tcGFyZSlcblx0e1xuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnNvcnQoY29tcGFyZSlcblx0fVxuXG5cdHRyYXZlcnNhbChjcml0ZXJpYSwgY2FsbGJhY2spXG5cdHtcblx0XHRjcml0ZXJpYSA9IGNyaXRlcmlhIHx8ICgoKSA9PiB0cnVlKVxuXHRcdHRoaXMuY2hpbGRyZW4uZmlsdGVyKGNyaXRlcmlhKS5mb3JFYWNoKGNhbGxiYWNrKVxuXHR9XG5cblx0dG9EYXRhKClcblx0e1xuXHRcdGxldCBwbm9kZSA9IHRoaXM7XG5cblx0XHRsZXQgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHBub2RlLCB7XG5cdFx0XHRwYXJlbnQ6IChwbm9kZS5wYXJlbnQgPyBwbm9kZS5wYXJlbnQuaWQgOiBudWxsKSxcblx0XHRcdGNoaWxkcmVuOiBbXSxcblx0XHR9KTtcblxuXHRcdC8vZGVsZXRlIGRhdGFbU1lNQk9MX09QVElPTlNdO1xuXG5cdFx0ZGF0YS5jaGlsZHJlbiA9IHBub2RlLmNoaWxkcmVuLnJlZHVjZShmdW5jdGlvbiAoYSwgbm9kZSlcblx0XHR7XG5cdFx0XHRhLnB1c2gobm9kZS50b0pTT04oKSk7XG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9LCBbXSk7XG5cblx0XHRpZiAoZGF0YS5jaGlsZHJlbi5sZW5ndGggPT09IDApXG5cdFx0e1xuXHRcdFx0ZGVsZXRlIGRhdGEuY2hpbGRyZW47XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNvcnRLZXlzKGRhdGEpO1xuXHR9XG5cblx0dG9KU09OKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRvRGF0YSgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyZWVOb2RlXG4iXX0=