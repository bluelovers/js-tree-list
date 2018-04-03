/**
 * Created by user on 2018/4/3/003.
 */
import Tree from './tree';
import { sortKeys } from './utils';

export function TreeToList(tree: Tree)
{
	let list = [];

	let pnode = tree.root();

	_loop(pnode, 0);

	function _node(pnode, level: number)
	{
		let item = Object.assign({}, pnode, {
			parent: (pnode.parent ? pnode.parent.id : null),
		});

		delete item.children;

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
