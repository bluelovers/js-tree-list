import Node from './node';
export declare class Tree<T = any> {
    rootNode: Node<T>;
    constructor(object?: T);
    root(): Node<T>;
    get(path: any): any;
    set(path: any, value: any): void;
    add(callback: (parentNode) => boolean, object: any): any;
    add(callback: 'root', object: any): any;
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
