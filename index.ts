/**
 * Created by user on 2018/4/3/003.
 */

export * from './src';
import TreeToList, { ITreeToList } from './src/tree-to-list'

export { TreeToList, ITreeToList }

import {
	ListToTree,
	//TreeToList,
	Tree,
	Node,
} from './src';

export {
	ListToTree,
	Tree,
	Node,
}

export default exports as typeof import('./index');
