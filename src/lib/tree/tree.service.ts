import {OpaqueToken, Type} from 'angular2/core';
import {TreeNode} from './../angular-tree-dnd'

export interface TreeService{
  getTreeNodeRenderer (node: TreeNode): Type | any;
  getChildren(node: TreeNode): any;
  register(node: TreeNode): string;
}

export const TREE_SERVICE = new OpaqueToken("TreeService");
