import TreeNode from './node';
/**
 * Created by user on 2018/4/3/003.
 */
import Tree from './tree';
import { sortKeys, SYMBOL_OPTIONS } from './utils';

export function TreeToList(tree: Tree)
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
