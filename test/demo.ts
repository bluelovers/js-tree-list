/**
 * Created by user on 2019/4/28.
 */

import JsTreeList from ".."

let list = [
	{
		id: 1,
		parent: 0
	},
	{
		id: 2,
		parent: 1
	},
	{
		id: 3,
		parent: 1
	},
	{
		id: 4,
		parent: 2
	},
	{
		id: 5,
		parent: 2
	},
];

let listToTree = new JsTreeList.ListToTree(list, {
	key_id: "id",
	key_parent: "parent",
	key_child: "children",
	key_last: "last" // all is option
});
let tree = listToTree.GetTree();

console.log(tree);

const object = { id: 1, title: "Root" }
let tree2 = new JsTreeList.Tree(object);

console.log(tree2.root());

console.log(tree2.get<number>('id'));

console.log(tree2);

console.log(tree2.toJSON());

console.log(tree2.toJson());
