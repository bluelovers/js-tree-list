/**
 * node-compare-by-id
 * Return callback to compare nodes by id
 * @param  boolean  vector If vector is true then sort asc else desc
 * @return function Compare function
 */
import Tree from './tree';
export declare let compareById: (vector: any) => (a: any, b: any) => 1 | 0 | -1;
/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
export declare let removeEmptyChildren: (jTree: any, node: any, options: any) => void;
/**
 * search-node
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} options
 */
export declare let searchNode: (tree: any, node: any, criteria: (parentNode: any) => boolean, options?: any) => any;
/**
 * showTree
 * @param {*} tree
 * @param {*} node
 * @param {*} level
 */
export declare let showTree: (tree: any, node?: any, level?: number) => void;
/**
 * traversal-tree
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} callback
 */
export declare function traversalTree(tree: Tree, node: any, criteria: any, callback: (currentNode) => void): void;
/**
 * serializeTree
 * @param {*} tree
 * @param {*} node
 * @param {*} target
 * @param {*} options
 */
export declare let serializeTree: (tree: any, node: any, target: any[], options: {
    key_children?: string;
    empty_children?: boolean;
}) => any[];
