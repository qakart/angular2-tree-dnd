import {TreeNode} from '../index'

export interface TreeNodeChildrenRenderer{
  node: TreeNode;
  onExpandedChanged(expanded:boolean):void
}
