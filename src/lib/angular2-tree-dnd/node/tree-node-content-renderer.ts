import {TreeNode} from '../'

export interface TreeNodeContentRenderer{
  node: TreeNode;
  onExpandedChanged(expanded:boolean):void;
  onSelectedChanged(expanded:boolean):void;
}
