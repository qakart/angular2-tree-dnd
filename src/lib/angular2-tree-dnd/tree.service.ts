import {OpaqueToken, Type} from 'angular2/core';
import {TreeNode} from './'

export interface TreeService{
  getTreeNodeContentRenderer (node: TreeNode): Type | any;
  getTreeNodeChildrenRenderer (node: TreeNode): Type | any;
  getChildren(node: TreeNode): any;
  register(node: TreeNode): string;
}

export const TREE_SERVICE = new OpaqueToken("TreeService");