import TreeNode, { IFieldKey } from './node';
export declare type ITreeOptions = {
    libTreeNode?: typeof TreeNode;
};
export interface ITreeToJsonOptions {
    key_children: string;
    empty_children?: boolean;
}
export declare class Tree<T extends any = any> {
    rootNode: TreeNode<T>;
    options: ITreeOptions;
    constructor(object?: T, mode?: boolean, options?: ITreeOptions);
    createNode<T>(object: T, mode?: boolean): TreeNode<T>;
    root(): TreeNode<T>;
    get<TT extends unknown>(path: IFieldKey): TT;
    set(path: IFieldKey, value: any): boolean;
    add(callback: (parentNode: any) => boolean, object: any, mode?: boolean): any;
    add(callback: 'root', object: any, mode?: boolean): any;
    contains(criteria: any): any;
    remove(criteria: any): boolean;
    move(search: any, destination: any): boolean;
    traversal(criteria: any, callback: (currentNode: any) => void): void;
    sort(compare: (a: T, b: T) => number): this;
    toJSON(...argv: any[]): TreeNode<T> & {
        parent: string | number;
        children: any[];
    };
    toJson(options?: Partial<ITreeToJsonOptions>): any;
}
export default Tree;
