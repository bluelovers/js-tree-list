import TreeNode from './node'
import {
	searchNode,
	traversalTree,
	serializeTree,
	removeEmptyChildren
} from './utils'

// @ts-ignore
import { inspect } from 'util';

export class Tree<T = any>
{
	rootNode: TreeNode<T>;

	constructor(object: T = undefined, mode?: boolean)
	{
		this.rootNode = null
		if (object)
		{
			this.rootNode = new TreeNode(object, mode)
		}
	}

	root()
	{
		return this.rootNode;
	}

	// only for rootNode
	get(path)
	{
		return this.rootNode.get(path)
	}

	// only for rootNode
	set(path, value)
	{
		this.rootNode.set(path, value)
	}

	add(callback: (parentNode) => boolean, object, mode?: boolean)
	add(callback: 'root', object, mode?: boolean)
	add(callback, object, mode?: boolean)
	{
		const type = typeof callback
		if (type === 'string' && callback === 'root')
		{
			this.rootNode = new TreeNode(object, mode)
			return this.rootNode
		}
		else if (type === 'function')
		{
			const target = searchNode(this, null, callback)

			if (target)
			{
				let node = target.add(object, mode);
				if (node)
				{
					return node;
				}
			}

			console.log('Warning', object)
			throw new Error('Warning ' + inspect(object));
		}
	}

	contains(criteria)
	{
		return searchNode(this, null, criteria)
	}

	remove(criteria)
	{
		const targetNode = this.contains(criteria)
		if (targetNode)
		{
			return !!targetNode.parent.remove(criteria)
		}
		return false
	}

	move(search, destination)
	{
		const targetNode = this.contains(search)
		if (targetNode && this.remove(search))
		{
			const destinationNode = this.contains(destination)
			return !!destinationNode.add(targetNode)
		}
		return false
	}

	traversal(criteria, callback: (currentNode) => void)
	{
		traversalTree(this, null, criteria, callback)
	}

	sort(compare: (a: T, b: T) => number)
	{
		this.traversal(null, currentNode =>
		{
			currentNode.sort(compare)
		})
	}

	toJson(options: {
		key_children?: string,
		empty_children?: boolean,
	} = {})
	{
		const optionsDefault = {
			key_children: 'children',
			empty_children: true
		}
		options = Object.assign(optionsDefault, options)
		const result = serializeTree(this, null, [], options)

		if (!options.empty_children)
		{
			removeEmptyChildren(result, null, options)
		}

		if (result && result.length > 0)
		{
			return result[0]
		}
		else
		{
			return []
		}
	}
}

export default Tree
