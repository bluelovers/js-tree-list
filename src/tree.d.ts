import TreeNode from './node';
export declare class Tree<T = any> {
    rootNode: TreeNode<T>;
    constructor(object?: T, mode?: boolean);
    root(): TreeNode<T>;
    get(path: any): {};
    set(path: any, value: any): void;
    add(callback: (parentNode) => boolean, object: any, mode?: boolean): any;
    add(callback: 'root', object: any, mode?: boolean): any;
    contains(criteria: any): any;
    remove(criteria: any): boolean;
    move(search: any, destination: any): boolean;
    traversal(criteria: any, callback: (currentNode) => void): void;
    sort(compare: (a: T, b: T) => number): void;
    toJson(options?: {
        key_children?: string;
        empty_children?: boolean;
    }): any;
}
export default Tree;
