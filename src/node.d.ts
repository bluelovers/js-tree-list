export declare class Node<T = any> {
    content: T;
    children: Node<T>[];
    parent: Node<T>;
    constructor(content: any);
    valueOf<U extends T>(): U;
    parents(): Node<T>[];
    size(): number;
    get<U>(fieldKey: string | number | symbol): U;
    set(fieldKey: string | number | symbol, value: any): boolean;
    readonly length: number;
    add<U extends T>(child: U | Node<U>): Node<U>;
    remove<U extends T>(callback: any): Node<U>[];
    sort(compare: any): Node<T>[];
    traversal(criteria: any, callback: any): void;
}
export default Node;
