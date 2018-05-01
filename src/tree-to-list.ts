import TreeNode from './node';
/**
 * Created by user on 2018/4/3/003.
 */
import Tree from './tree';
import { sortKeys, SYMBOL_OPTIONS, SYMBOL_NODE } from './utils';

export type ITreeToList<T extends {}, U = any> = Array<{
	id?: string | number,
	parent?: string | number,
	uuid?: string,
	content: U,
} & T>;

export function TreeToList<T extends {}, U = any>(tree: Tree, linkNode?: boolean): Array<{
	id?: string | number,
	parent?: string | number,
	uuid?: string,
	content: U,
} & T>
{
	let list = [];

	let pnode = tree.root();

	_loop(pnode, 0);

	function _node<J extends TreeNode>(pnode: J, level: number)
	{
		let item = Object.assign({}, Object.keys(pnode)
			.reduce(function (item, key)
			{
				item[key] = pnode[key];
				return item;
			}, {}), {
			parent: (pnode.parent ? pnode.parent.id : null),
		}) as any as {
			[K in keyof J]: J[K];
			};

		if (linkNode)
		{
			item[SYMBOL_NODE] = pnode;
		}

		delete item.children;
		delete item[SYMBOL_OPTIONS];

		item = sortKeys(item);

		list.push(item);

		return pnode;
	}

	function _loop(pnode, level: number)
	{
		_node(pnode, level);

		if (pnode.children.length)
		{
			for (let i in pnode.children)
			{
				_loop(pnode.children[i], level + 1);
			}
		}
	}

	return list;
}

export default TreeToList
