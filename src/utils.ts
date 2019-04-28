/**
 * node-compare-by-id
 * Return callback to compare nodes by id
 * @param  boolean  vector If vector is true then sort asc else desc
 * @return function Compare function
 */
import Tree, { ITreeToJsonOptions } from './tree';
import _sortObjectKeys = require('sort-object-keys2');
import TreeNode from './node';

export const SYMBOL_OPTIONS = Symbol('options');
export const SYMBOL_NODE = Symbol('node');

export function compareById(vector)
{
	return <T extends TreeNode>(a: T, b: T) =>
	{
		const aid = Number(a.get('id'))
		const bid = Number(b.get('id'))
		if (aid > bid)
		{
			return vector ? 1 : -1
		}
		else if (aid < bid)
		{
			return vector ? -1 : 1
		}
		else
		{
			return 0
		}
	}
}

/**
 * remove-empty-children (for json tree)
 * @param {*} jTree
 * @param {*} node
 * @param {*} options
 */
export function removeEmptyChildren(jTree: ReturnType<typeof serializeTree>, node = null, options: ITreeToJsonOptions)
{
	const { key_children } = options
	node = node || jTree[0]
	if (node[key_children].length === 0)
	{
		delete node[key_children]
	}
	else
	{
		node[key_children].forEach(item =>
		{
			removeEmptyChildren(jTree, item, options)
		})
	}
}

/**
 * search-node
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} options
 */
export function searchNode<T>(tree: Tree<T>, node: TreeNode<T>, criteria: (parentNode: TreeNode<T>) => boolean, options?)
{
	const currentNode = node || tree.rootNode
	if (criteria(currentNode))
	{
		return currentNode
	}
	const children = currentNode.children
	let target: TreeNode<T> = null
	for (let i = 0; i < children.length; i++)
	{
		const item = children[i]
		target = searchNode(tree, item, criteria)
		if (target)
		{
			return target
		}
	}
}

/**
 * showTree
 * @param {*} tree
 * @param {*} node
 * @param {*} level
 */
export function showTree(tree, node: TreeNode = null, level = 1)
{
	node = node || tree[0]
	if (node && node.content)
	{
		console.log(new Array(level).join('\t'), node.content)
	}
	if (node && node.children)
	{
		node.children.forEach(item =>
		{
			showTree(tree, item, level + 1)
		})
	}
}

/**
 * traversal-tree
 * @param {*} tree
 * @param {*} node
 * @param {*} criteria
 * @param {*} callback
 */
export function traversalTree(tree: Tree, node = null, criteria, callback: (currentNode) => void)
{
	const currentNode = node || tree.rootNode;
	if (!node)
	{
		if (typeof criteria === 'function' && criteria(currentNode))
		{
			callback(currentNode)
		}
		else if (criteria === null)
		{
			callback(currentNode)
		}
	}
	currentNode.traversal(criteria, callback)
	const children = currentNode.children

	children.forEach(item =>
	{
		traversalTree(tree, item, criteria, callback)
	})
}

//export interface ISerializeTreeItem<T>
//{
//	[SYMBOL_OPTIONS]?: {
//		tree: Tree<T>,
//		options: Tree<T>["options"],
//	},
//	[k: string]: any,
//}

/**
 * serializeTree
 * @param {*} tree
 * @param {*} node
 * @param {*} target
 * @param {*} options
 */
export function serializeTree<T>(tree: Tree<T>, node: TreeNode<T> = null, target: T[] = [], options: ITreeToJsonOptions)
{
	const { key_children } = options
	node = node || tree.rootNode
	if (!node)
	{
		return null
	}
	const index = target.push(Object.assign({ [key_children]: [] }, node.content))
	node.children.forEach(item =>
	{
		serializeTree(tree, item, target[index - 1][key_children], options)
	})
	return target
}

export function sortKeys<T>(data: T)
{
	return _sortObjectKeys(data, {
			keys: [
				'id',
				'parent',
				'uuid',
				'level',
				'content',
				'children',
			],
			useSource: true,
		})
	;
}
