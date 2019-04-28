/**
 * node-compare-by-id
 * Return callback to compare nodes by id
 * @param  boolean  vector If vector is true then sort asc else desc
 * @return function Compare function
 */
import Tree, { ITreeToJsonOptions } from './tree';
import TreeNode from './node';
export declare const SYMBOL_OPTIONS: unique symbol;
export declare const SYMBOL_NODE: unique symbol;
export declare function compareById(vector: any): <T extends TreeNode<any>>(a: T, b: T) => 0 | 1 | -1;
/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
export declare function removeEmptyChildren(jTree: ReturnType<typeof serializeTree>, node: any, options: ITreeToJsonOptions): void;
/**
 * search-node
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} options
 */
export declare function searchNode<T>(tree: Tree<T>, node: TreeNode<T>, criteria: (parentNode: TreeNode<T>) => boolean, options?: any): TreeNode<T>;
/**
 * showTree
 * @param {*} tree
 * @param {*} node
 * @param {*} level
 */
export declare function showTree(tree: any, node?: TreeNode, level?: number): void;
/**
 * traversal-tree
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} callback
 */
export declare function traversalTree(tree: Tree, node: any, criteria: any, callback: (currentNode: any) => void): void;
/**
 * serializeTree
 * @param {*} tree
 * @param {*} node
 * @param {*} target
 * @param {*} options
 */
export declare function serializeTree<T>(tree: Tree<T>, node: TreeNode<T>, target: T[], options: ITreeToJsonOptions): T[];
export declare function sortKeys<T>(data: T): T;
