/**
 * Created by user on 2018/4/3/003.
 */
import Tree from './tree';
export declare function TreeToList<T extends {}, U = any>(tree: Tree, linkNode?: boolean): Array<{
    id?: string | number;
    parent?: string | number;
    uuid?: string;
    content: U;
} & T>;
export default TreeToList;
