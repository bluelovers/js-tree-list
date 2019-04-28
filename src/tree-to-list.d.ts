import Tree from './tree';
export declare type ITreeToList<T extends {}, U = any> = Array<{
    id?: string | number;
    parent?: string | number;
    uuid?: string;
    content: U;
} & T>;
export declare function TreeToList<T extends {}, U = any>(tree: Tree, linkNode?: boolean): Array<{
    id?: string | number;
    parent?: string | number;
    uuid?: string;
    content: U;
} & T>;
export default TreeToList;
