import { SYMBOL_OPTIONS } from './utils';
export declare type IFieldKey = string | number | symbol;
export declare class TreeNode<T extends any = any> {
    id?: string | number;
    content: T;
    children: TreeNode<T>[];
    parent: TreeNode<T>;
    [SYMBOL_OPTIONS]?: any;
    constructor(content: any, mode?: boolean);
    createNode<U extends TreeNode<T>>(object: any, mode?: boolean): U;
    key(): string | number;
    value<U extends T>(): U;
    parents(): TreeNode<T>[];
    size(): number;
    get<U extends unknown>(fieldKey: IFieldKey): U;
    set(fieldKey: IFieldKey, value: any): boolean;
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
