import Node from './node';
import LTT from './tree'
import { inspect } from 'util';

const defaultOptions = {
	key_id: 'id',
	key_parent: 'parent',
	key_child: 'child',
	key_last: null,
	uuid: false,
	empty_children: false
}

function sortBy(collection, propertyA, propertyB)
{
	return collection.sort(function (a, b)
	{
		if (a[propertyB] < b[propertyB])
		{
			if (a[propertyA] > b[propertyA])
			{
				return 1
			}
			return -1
		}
		else
		{
			if (a[propertyA] < b[propertyA])
			{
				return -1
			}
			return 1
		}
	})
}

export class ListToTree<T = any>
{

	options: {
		key_id?: string;
		key_parent?: string;
		key_child?: string;
		key_last?: string;
		uuid?: boolean;
		empty_children?: boolean;
	};

	tree: LTT;

	constructor(list: T[], options: {
		key_id?: string;
		key_parent?: string;
		key_child?: string;
		key_last?: string;
		uuid?: boolean;
		empty_children?: boolean;
	} = {})
	{
		const _list = list.map(item => item)

		options = Object.assign({}, defaultOptions, options)
		this.options = options
		const { key_id, key_parent, uuid } = options

		if (uuid === false)
		{
			//sortBy(_list, key_parent, key_id)
		}

		const tree = new LTT()

		_list.forEach((item, index) =>
		{
			if (tree.rootNode === null)
			{
				if (item[key_parent])
				{
					throw new RangeError(`the first elem is root, should not have parent. ` +  + inspect(object));
				}

				//tree.rootNode = new Node(item, true);
				tree.add('root', item, true);
			}
			else
			{
				let node = tree.add(parentNode =>
				{
					//return parentNode.get(key_id) === item[key_parent]
					return parentNode[key_id] === item[key_parent]
				}, item, true);
			}
		})

		this.tree = tree
	}

	sort(criteria: (a: T, b: T) => number)
	{
		this.tree.sort(criteria)
	}

	last(val, key_id, key_last, key_child)
	{
		for (let n in val)
		{
			if (val[n][key_child] && val[n][key_child].length)
			{ // 如果有子元素，则先对子元素进行处理
				this.last(val[n][key_child], key_id, key_last, key_child)
			}
			if (val[n][key_last] !== 0)
			{
				// @ts-ignore
				if (((n - 1) >= 0 && val[n - 1][key_id] !== val[n][key_last]) || (n - 1) < 0)
				{
					const tmp = val.splice(n, 1) // 从该元素位置删除元素并将已删除的元素放置于新数组(tmp)
					val.splice(n + 1, 0, tmp[0]) // 在指定ID元素后面添加被删除的元素
				}
			}
		}
	}

	GetTree()
	{
		const { key_id, key_child, empty_children, key_last } = this.options

		let json = this.tree.toJson({
			key_children: key_child,
			empty_children: false
		})[key_child]

		if (key_last)
		{
			this.last(json, key_id, key_last, key_child)
		}
		return json
	}
}

export default ListToTree
