export default class Node<T = any> {
    content: T;
    children: Node<T>[];
    length: number;
    parent: Node<T>;
    constructor(content: any);
    get(fieldKey: any): any;
    set(fieldKey: any, value: any): boolean;
    add(child: T | Node<T>): Node<T>;
    remove(callback: any): Node<T>[];
    sort(compare: any): Node<T>[];
    traversal(criteria: any, callback: any): void;
}
