import Node from './node'
import {
	searchNode,
	traversalTree,
	serializeTree,
	removeEmptyChildren
} from './utils'

export class Tree<T = any>
{

	rootNode: Node<T>;

	constructor(object: T = undefined)
	{
		this.rootNode = null
		if (object)
		{
			this.rootNode = new Node(object)
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

	add(callback: (parentNode) => boolean, object)
	add(callback: 'root', object)
	add(callback, object)
	{
		const type = typeof callback
		if (type === 'string' && callback === 'root')
		{
			this.rootNode = new Node(object)
			return this
		}
		else if (type === 'function')
		{
			const target = searchNode(this, null, callback)
			if (target && target.add(object))
			{
				return this
			}
			else
			{
				console.log('Warning', object)
			}
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
