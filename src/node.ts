import * as shortid from 'shortid';
import sortObjectKeys from 'sort-object-keys2';
import { sortKeys } from './utils';

export class TreeNode<T = any>
{
	id?: string | number;

	content: T;
	children: TreeNode<T>[] = [];
	//length: number;

	parent: TreeNode<T>;

	constructor(content, mode?: boolean)
	{
		this.id = shortid();

		if (mode)
		{
			Object.assign(this, content);
		}
		else
		{
			this.content = content;
		}

		this.parent = null;
		this.children = [];
		//this.length = 0;

		sortKeys(this)
	}

	public valueOf<U extends T>(): U
	{
		return this.content as U;
	}

	parents(): TreeNode<T>[]
	{
		let ps = [];
		let c = this;
		while (c.parent)
		{
			// @ts-ignore
			c = c.parent;
			ps.push(c);
		}
		return ps;
	}

	size()
	{
		return this.length;
	}

	get<U>(fieldKey: string | number | symbol): U
	{
		if (typeof this.content[fieldKey] !== 'undefined')
		{
			return this.content[fieldKey] as U
		}
	}

	set(fieldKey: string | number | symbol, value)
	{
		return !!(this.content[fieldKey] = value)
	}

	get length()
	{
		return this.children.length;
	}

	add<U extends T>(child: U | TreeNode<U>, mode?: boolean): TreeNode<U>
	{
		const node = child instanceof TreeNode ? child : new TreeNode(child, mode);
		node.parent = this;
		this.children.push(node);
		return node
	}

	remove<U extends T>(callback): TreeNode<U>[]
	{
		const index = this.children.findIndex(callback)
		if (index > -1)
		{
			const removeItems = this.children.splice(index, 1) as TreeNode<U>[];
			return removeItems
		}
		return []
	}

	sort(compare)
	{
		return this.children.sort(compare)
	}

	traversal(criteria, callback)
	{
		criteria = criteria || (() => true)
		this.children.filter(criteria).forEach(callback)
	}

	toData()
	{
		let pnode = this;

		let data = Object.assign({}, pnode, {
			parent: (pnode.parent ? pnode.parent.id : null),
			children: [],
		});

		data.children = pnode.children.reduce(function (a, node)
		{
			a.push(node.toJSON());
			return a;
		}, []);

		return sortKeys(data);
	}

	toJSON()
	{
		return this.toData();
	}
}

export default TreeNode
