import LTT from './tree';
export default class ListToTree<T = any> {
    options: {
        key_id?: string;
        key_parent?: string;
        key_child?: string;
        key_last?: string;
        uuid?: boolean;
        empty_children?: boolean;
    };
    tree: LTT;
    constructor(list: T[], options?: {
        key_id?: string;
        key_parent?: string;
        key_child?: string;
        key_last?: string;
        uuid?: boolean;
        empty_children?: boolean;
    });
    sort(criteria: (a: T, b: T) => number): void;
    last(val: any, key_id: any, key_last: any, key_child: any): void;
    GetTree(): any;
}
