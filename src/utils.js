"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _sortObjectKeys = require("sort-object-keys2");
exports.SYMBOL_OPTIONS = Symbol('options');
exports.SYMBOL_NODE = Symbol('node');
function compareById(vector) {
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
}
exports.compareById = compareById;
/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
function removeEmptyChildren(jTree, node = null, options) {
    const { key_children } = options;
    node = node || jTree[0];
    if (node[key_children].length === 0) {
        delete node[key_children];
    }
    else {
        node[key_children].forEach(item => {
            removeEmptyChildren(jTree, item, options);
        });
    }
}
exports.removeEmptyChildren = removeEmptyChildren;
/**
 * search-node
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} options
 */
function searchNode(tree, node, criteria, options) {
    const currentNode = node || tree.rootNode;
    if (criteria(currentNode)) {
        return currentNode;
    }
    const children = currentNode.children;
    let target = null;
    for (let i = 0; i < children.length; i++) {
        const item = children[i];
        target = searchNode(tree, item, criteria);
        if (target) {
            return target;
        }
    }
}
exports.searchNode = searchNode;
/**
 * showTree
 * @param {*} tree
 * @param {*} node
 * @param {*} level
 */
function showTree(tree, node = null, level = 1) {
    node = node || tree[0];
    if (node && node.content) {
        console.log(new Array(level).join('\t'), node.content);
    }
    if (node && node.children) {
        node.children.forEach(item => {
            showTree(tree, item, level + 1);
        });
    }
}
exports.showTree = showTree;
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
//export interface ISerializeTreeItem<T>
//{
//	[SYMBOL_OPTIONS]?: {
//		tree: Tree<T>,
//		options: Tree<T>["options"],
//	},
//	[k: string]: any,
//}
/**
 * serializeTree
 * @param {*} tree
 * @param {*} node
 * @param {*} target
 * @param {*} options
 */
function serializeTree(tree, node = null, target = [], options) {
    const { key_children } = options;
    node = node || tree.rootNode;
    if (!node) {
        return null;
    }
    const index = target.push(Object.assign({ [key_children]: [] }, node.content));
    node.children.forEach(item => {
        serializeTree(tree, item, target[index - 1][key_children], options);
    });
    return target;
}
exports.serializeTree = serializeTree;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLHFEQUFzRDtBQUd6QyxRQUFBLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsUUFBQSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTFDLFNBQWdCLFdBQVcsQ0FBQyxNQUFNO0lBRWpDLE9BQU8sQ0FBcUIsQ0FBSSxFQUFFLENBQUksRUFBRSxFQUFFO1FBRXpDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDL0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUMvQixJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQ2I7WUFDQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN0QjthQUNJLElBQUksR0FBRyxHQUFHLEdBQUcsRUFDbEI7WUFDQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN0QjthQUVEO1lBQ0MsT0FBTyxDQUFDLENBQUE7U0FDUjtJQUNGLENBQUMsQ0FBQTtBQUNGLENBQUM7QUFuQkQsa0NBbUJDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixtQkFBbUIsQ0FBQyxLQUF1QyxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUUsT0FBMkI7SUFFcEgsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQTtJQUNoQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN2QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxF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QkFBdUI7QUFDdkIsa0JBQWtCO0FBQ2xCLGdDQUFnQztBQUNoQyxLQUFLO0FBQ0wsb0JBQW9CO0FBQ3BCLEdBQUc7QUFFSDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixhQUFhLENBQUksSUFBYSxFQUFFLE9BQW9CLElBQUksRUFBRSxTQUFjLEVBQUUsRUFBRSxPQUEyQjtJQUV0SCxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBQ2hDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUM1QixJQUFJLENBQUMsSUFBSSxFQUNUO1FBQ0MsT0FBTyxJQUFJLENBQUE7S0FDWDtJQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDOUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFNUIsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNwRSxDQUFDLENBQUMsQ0FBQTtJQUNGLE9BQU8sTUFBTSxDQUFBO0FBQ2QsQ0FBQztBQWRELHNDQWNDO0FBRUQsU0FBZ0IsUUFBUSxDQUFJLElBQU87SUFFbEMsT0FBTyxlQUFlLENBQUMsSUFBSSxFQUFFO1FBQzNCLElBQUksRUFBRTtZQUNMLElBQUk7WUFDSixRQUFRO1lBQ1IsTUFBTTtZQUNOLE9BQU87WUFDUCxTQUFTO1lBQ1QsVUFBVTtTQUNWO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQ0Y7QUFDRixDQUFDO0FBZEQsNEJBY0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG5vZGUtY29tcGFyZS1ieS1pZFxuICogUmV0dXJuIGNhbGxiYWNrIHRvIGNvbXBhcmUgbm9kZXMgYnkgaWRcbiAqIEBwYXJhbSAgYm9vbGVhbiAgdmVjdG9yIElmIHZlY3RvciBpcyB0cnVlIHRoZW4gc29ydCBhc2MgZWxzZSBkZXNjXG4gKiBAcmV0dXJuIGZ1bmN0aW9uIENvbXBhcmUgZnVuY3Rpb25cbiAqL1xuaW1wb3J0IFRyZWUsIHsgSVRyZWVUb0pzb25PcHRpb25zIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCBfc29ydE9iamVjdEtleXMgPSByZXF1aXJlKCdzb3J0LW9iamVjdC1rZXlzMicpO1xuaW1wb3J0IFRyZWVOb2RlIGZyb20gJy4vbm9kZSc7XG5cbmV4cG9ydCBjb25zdCBTWU1CT0xfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuZXhwb3J0IGNvbnN0IFNZTUJPTF9OT0RFID0gU3ltYm9sKCdub2RlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlQnlJZCh2ZWN0b3IpXG57XG5cdHJldHVybiA8VCBleHRlbmRzIFRyZWVOb2RlPihhOiBULCBiOiBUKSA9PlxuXHR7XG5cdFx0Y29uc3QgYWlkID0gTnVtYmVyKGEuZ2V0KCdpZCcpKVxuXHRcdGNvbnN0IGJpZCA9IE51bWJlcihiLmdldCgnaWQnKSlcblx0XHRpZiAoYWlkID4gYmlkKVxuXHRcdHtcblx0XHRcdHJldHVybiB2ZWN0b3IgPyAxIDogLTFcblx0XHR9XG5cdFx0ZWxzZSBpZiAoYWlkIDwgYmlkKVxuXHRcdHtcblx0XHRcdHJldHVybiB2ZWN0b3IgPyAtMSA6IDFcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJldHVybiAwXG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogcmVtb3ZlLWVtcHR5LWNoaWxkcmVuIChmb3IganNvbiB0cmVlKVxuICogQHBhcmFtIHsqfSBqVHJlZVxuICogQHBhcmFtIHsqfSBub2RlXG4gKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVtcHR5Q2hpbGRyZW4oalRyZWU6IFJldHVyblR5cGU8dHlwZW9mIHNlcmlhbGl6ZVRyZWU+LCBub2RlID0gbnVsbCwgb3B0aW9uczogSVRyZWVUb0pzb25PcHRpb25zKVxue1xuXHRjb25zdCB7IGtleV9jaGlsZHJlbiB9ID0gb3B0aW9uc1xuXHRub2RlID0gbm9kZSB8fCBqVHJlZVswXVxuXHRpZiAobm9kZVtrZXlfY2hpbGRyZW5dLmxlbmd0aCA9PT0gMClcblx0e1xuXHRcdGRlbGV0ZSBub2RlW2tleV9jaGlsZHJlbl1cblx0fVxuXHRlbHNlXG5cdHtcblx0XHRub2RlW2tleV9jaGlsZHJlbl0uZm9yRWFjaChpdGVtID0+XG5cdFx0e1xuXHRcdFx0cmVtb3ZlRW1wdHlDaGlsZHJlbihqVHJlZSwgaXRlbSwgb3B0aW9ucylcblx0XHR9KVxuXHR9XG59XG5cbi8qKlxuICogc2VhcmNoLW5vZGVcbiAqIEBwYXJhbSB7Kn0gdHJlZVxuICogQHBhcmFtIHsqfSBub2RlXG4gKiBAcGFyYW0geyp9IGNyaXRlcmlhXG4gKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaE5vZGU8VD4odHJlZTogVHJlZTxUPiwgbm9kZTogVHJlZU5vZGU8VD4sIGNyaXRlcmlhOiAocGFyZW50Tm9kZTogVHJlZU5vZGU8VD4pID0+IGJvb2xlYW4sIG9wdGlvbnM/KVxue1xuXHRjb25zdCBjdXJyZW50Tm9kZSA9IG5vZGUgfHwgdHJlZS5yb290Tm9kZVxuXHRpZiAoY3JpdGVyaWEoY3VycmVudE5vZGUpKVxuXHR7XG5cdFx0cmV0dXJuIGN1cnJlbnROb2RlXG5cdH1cblx0Y29uc3QgY2hpbGRyZW4gPSBjdXJyZW50Tm9kZS5jaGlsZHJlblxuXHRsZXQgdGFyZ2V0OiBUcmVlTm9kZTxUPiA9IG51bGxcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKylcblx0e1xuXHRcdGNvbnN0IGl0ZW0gPSBjaGlsZHJlbltpXVxuXHRcdHRhcmdldCA9IHNlYXJjaE5vZGUodHJlZSwgaXRlbSwgY3JpdGVyaWEpXG5cdFx0aWYgKHRhcmdldClcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogc2hvd1RyZWVcbiAqIEBwYXJhbSB7Kn0gdHJlZVxuICogQHBhcmFtIHsqfSBub2RlXG4gKiBAcGFyYW0geyp9IGxldmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93VHJlZSh0cmVlLCBub2RlOiBUcmVlTm9kZSA9IG51bGwsIGxldmVsID0gMSlcbntcblx0bm9kZSA9IG5vZGUgfHwgdHJlZVswXVxuXHRpZiAobm9kZSAmJiBub2RlLmNvbnRlbnQpXG5cdHtcblx0XHRjb25zb2xlLmxvZyhuZXcgQXJyYXkobGV2ZWwpLmpvaW4oJ1xcdCcpLCBub2RlLmNvbnRlbnQpXG5cdH1cblx0aWYgKG5vZGUgJiYgbm9kZS5jaGlsZHJlbilcblx0e1xuXHRcdG5vZGUuY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+XG5cdFx0e1xuXHRcdFx0c2hvd1RyZWUodHJlZSwgaXRlbSwgbGV2ZWwgKyAxKVxuXHRcdH0pXG5cdH1cbn1cblxuLyoqXG4gKiB0cmF2ZXJzYWwtdHJlZVxuICogQHBhcmFtIHsqfSB0cmVlXG4gKiBAcGFyYW0geyp9IG5vZGVcbiAqIEBwYXJhbSB7Kn0gY3JpdGVyaWFcbiAqIEBwYXJhbSB7Kn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNhbFRyZWUodHJlZTogVHJlZSwgbm9kZSA9IG51bGwsIGNyaXRlcmlhLCBjYWxsYmFjazogKGN1cnJlbnROb2RlKSA9PiB2b2lkKVxue1xuXHRjb25zdCBjdXJyZW50Tm9kZSA9IG5vZGUgfHwgdHJlZS5yb290Tm9kZTtcblx0aWYgKCFub2RlKVxuXHR7XG5cdFx0aWYgKHR5cGVvZiBjcml0ZXJpYSA9PT0gJ2Z1bmN0aW9uJyAmJiBjcml0ZXJpYShjdXJyZW50Tm9kZSkpXG5cdFx0e1xuXHRcdFx0Y2FsbGJhY2soY3VycmVudE5vZGUpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKGNyaXRlcmlhID09PSBudWxsKVxuXHRcdHtcblx0XHRcdGNhbGxiYWNrKGN1cnJlbnROb2RlKVxuXHRcdH1cblx0fVxuXHRjdXJyZW50Tm9kZS50cmF2ZXJzYWwoY3JpdGVyaWEsIGNhbGxiYWNrKVxuXHRjb25zdCBjaGlsZHJlbiA9IGN1cnJlbnROb2RlLmNoaWxkcmVuXG5cblx0Y2hpbGRyZW4uZm9yRWFjaChpdGVtID0+XG5cdHtcblx0XHR0cmF2ZXJzYWxUcmVlKHRyZWUsIGl0ZW0sIGNyaXRlcmlhLCBjYWxsYmFjaylcblx0fSlcbn1cblxuLy9leHBvcnQgaW50ZXJmYWNlIElTZXJpYWxpemVUcmVlSXRlbTxUPlxuLy97XG4vL1x0W1NZTUJPTF9PUFRJT05TXT86IHtcbi8vXHRcdHRyZWU6IFRyZWU8VD4sXG4vL1x0XHRvcHRpb25zOiBUcmVlPFQ+W1wib3B0aW9uc1wiXSxcbi8vXHR9LFxuLy9cdFtrOiBzdHJpbmddOiBhbnksXG4vL31cblxuLyoqXG4gKiBzZXJpYWxpemVUcmVlXG4gKiBAcGFyYW0geyp9IHRyZWVcbiAqIEBwYXJhbSB7Kn0gbm9kZVxuICogQHBhcmFtIHsqfSB0YXJnZXRcbiAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplVHJlZTxUPih0cmVlOiBUcmVlPFQ+LCBub2RlOiBUcmVlTm9kZTxUPiA9IG51bGwsIHRhcmdldDogVFtdID0gW10sIG9wdGlvbnM6IElUcmVlVG9Kc29uT3B0aW9ucylcbntcblx0Y29uc3QgeyBrZXlfY2hpbGRyZW4gfSA9IG9wdGlvbnNcblx0bm9kZSA9IG5vZGUgfHwgdHJlZS5yb290Tm9kZVxuXHRpZiAoIW5vZGUpXG5cdHtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cdGNvbnN0IGluZGV4ID0gdGFyZ2V0LnB1c2goT2JqZWN0LmFzc2lnbih7IFtrZXlfY2hpbGRyZW5dOiBbXSB9LCBub2RlLmNvbnRlbnQpKVxuXHRub2RlLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PlxuXHR7XG5cdFx0c2VyaWFsaXplVHJlZSh0cmVlLCBpdGVtLCB0YXJnZXRbaW5kZXggLSAxXVtrZXlfY2hpbGRyZW5dLCBvcHRpb25zKVxuXHR9KVxuXHRyZXR1cm4gdGFyZ2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0S2V5czxUPihkYXRhOiBUKVxue1xuXHRyZXR1cm4gX3NvcnRPYmplY3RLZXlzKGRhdGEsIHtcblx0XHRcdGtleXM6IFtcblx0XHRcdFx0J2lkJyxcblx0XHRcdFx0J3BhcmVudCcsXG5cdFx0XHRcdCd1dWlkJyxcblx0XHRcdFx0J2xldmVsJyxcblx0XHRcdFx0J2NvbnRlbnQnLFxuXHRcdFx0XHQnY2hpbGRyZW4nLFxuXHRcdFx0XSxcblx0XHRcdHVzZVNvdXJjZTogdHJ1ZSxcblx0XHR9KVxuXHQ7XG59XG4iXX0=