export declare class TreeNode<T = any> {
    id?: string | number;
    content: T;
    children: TreeNode<T>[];
    parent: TreeNode<T>;
    constructor(content: any, mode?: boolean);
    valueOf<U extends T>(): U;
    parents(): TreeNode<T>[];
    size(): number;
    get<U>(fieldKey: string | number | symbol): U;
    set(fieldKey: string | number | symbol, value: any): boolean;
    readonly length: number;
    add<U extends T>(child: U | TreeNode<U>, mode?: boolean): TreeNode<U>;
    remove<U extends T>(callback: any): TreeNode<U>[];
    sort(compare: any): TreeNode<T>[];
    traversal(criteria: any, callback: any): void;
    toData(): this & {
        parent: string | number;
        children: any[];
    };
    toJSON(): this & {
        parent: string | number;
        children: any[];
    };
}
export default TreeNode;
