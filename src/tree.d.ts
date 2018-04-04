import TreeNode from './node';
export declare type ITreeOptions = {
    libTreeNode?: typeof TreeNode;
};
export declare class Tree<T = any> {
    rootNode: TreeNode<T>;
    options: ITreeOptions;
    constructor(object?: T, mode?: boolean, options?: ITreeOptions);
    createNode<T>(object: T, mode?: boolean): TreeNode<T>;
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
    toJSON(...argv: any[]): TreeNode<T> & {
        parent: string | number;
        children: any[];
    };
    toJson(options?: {
        key_children?: string;
        empty_children?: boolean;
    }): any;
}
export default Tree;
