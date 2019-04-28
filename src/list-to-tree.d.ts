import LTT from './tree';
export interface IListToTreeSourceObject {
    [key: string]: unknown;
}
export interface IListToTreeOptions<T extends IListToTreeSourceObject = IListToTreeSourceObject> {
    key_id?: string;
    key_parent?: string;
    key_child?: string;
    key_last?: string;
    uuid?: boolean;
    empty_children?: boolean;
}
export declare type IListToTreeOptions2<T extends IListToTreeSourceObject> = IListToTreeOptions<T> & {
    key_id?: string | keyof T;
    key_parent?: string | keyof T;
    key_child?: string | keyof T;
};
export declare class ListToTree<T extends IListToTreeSourceObject> {
    options: IListToTreeOptions<T>;
    tree: LTT;
    constructor(list: T[], options?: IListToTreeOptions2<T>);
    sort(criteria: (a: T, b: T) => number): void;
    last(val: any, key_id: any, key_last: any, key_child: any): void;
    GetTree(): any;
}
export default ListToTree;
