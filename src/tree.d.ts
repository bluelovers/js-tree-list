import Node from './node';
export declare class Tree<T = any> {
    rootNode: Node;
    constructor(object?: T);
    get(path: any): any;
    set(path: any, value: any): void;
    add(callback: any, object: any): this;
    contains(criteria: any): any;
    remove(criteria: any): boolean;
    move(search: any, destination: any): boolean;
    traversal(criteria: any, callback: any): void;
    sort(compare: any): void;
    toJson(options?: {}): any;
}
export default Tree;
