import * as shortid from 'shortid';

export class Node<T = any>
{
	id?: string | number;

	content: T;
	children: Node<T>[] = [];
	//length: number;

	parent: Node<T>;

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
	}

	public valueOf<U extends T>(): U
	{
		return this.content as U;
	}

	parents(): Node<T>[]
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

	add<U extends T>(child: U | Node<U>, mode?: boolean): Node<U>
	{
		const node = child instanceof Node ? child : new Node(child, mode);
		node.parent = this;
		this.children.push(node);
		return node
	}

	remove<U extends T>(callback): Node<U>[]
	{
		const index = this.children.findIndex(callback)
		if (index > -1)
		{
			const removeItems = this.children.splice(index, 1) as Node<U>[];
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
}

export default Node
